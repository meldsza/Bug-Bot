
const config = require('./../../config');
const Report = require('./../../orm/Report');
const Repro = require('./../../orm/Repro');
const rp = require('./../../data/reportparts.json');
const bot = require('./../bot');
const deny = require('./../lib/deny');
const reportToText = require('./../lib/reportToText');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!Object.values(config).includes(config.bugApprovalChannel)) return;
    //check permissions of the user
    let roles = message.member.roles;
    if (!(roles.get(config.hunterRole) || roles.get(config.adminRole) || roles.get(config.devRole) || roles.get(config.trelloModRole)))
        return (await message.reply("You need to be a bug hunter to deny reports")).delete(config.delayInMS);
    params = params.join(' ');
    if (!params.includes('|'))
        return (await message.reply("The message should contain a |")).delete(config.delayInMS);
    params = params.split(' | ');
    let repro = {
        id: params[0] + "",
        canRepro: false,
        author: message.author.id,
        message: params[1]
    };
    //get the report in question
    let report = await Report.where('id', repro.id).fetch();
    if (!report || report == null)
        return (await message.reply("This is an invalid report")).delete(delayInMS);
    report = report.attributes;
    if (report.is_Trello)
        return (await message.reply("This report is already denied")).delete(delayInMS);
    //find the repro in question
    let reprotest = await Repro.where('id', repro.id).where('author', repro.author).fetch();
    if (reprotest || reprotest != null) {
        await reprotest.save(repro, { patch: true });
        (await message.channel.reply("You have changed your stance on " + repro.id)).delete(delayInMS);
    }
    else {
        await new Repro(repro).save();
        (await message.channel.reply("You have denied " + repro.id)).delete(delayInMS);
    }
    reprotest = await Repro.where('id', repro.id).where('canRepro', false).count();
    if (reprotest >= config.minApprovals) {
        const denies = await Repro.where('id', repro.id).where('canRepro', false).fetchAll();
        let reply = "Report " + repro.id + " has been denied\nbecause:\n";
        denies.map((d) => {
            reply = reply + bot.users.get(d.attributes.author).tag + " - " + d.attributes.message + "\n";
        });
        (await message.channel.send(reply)).delete(delayInMS);
    }

    return await deny(report);
}
/**
 * description of the command
 */
const description = "deny a bug in approval queue";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
