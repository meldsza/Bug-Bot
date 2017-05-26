
const config = require('./../../config');
const Report = require('./../../orm/Report');
const Repro = require('./../../orm/Repro');
const rp = require('./../../data/reportparts.json');
const reportUpdate = require('./../lib/reportUpdate');
const bot = require('./../bot');
const approve = require('./../lib/approve');
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
        return (await message.reply("You need to be a bug hunter to approve reports")).delete(config.delayInMS);
    params = params.join(' ');
    if (!params.includes('|'))
        return (await message.reply("The message should contain a |")).delete(config.delayInMS);
    params = params.split(' | ');
    let repro = {
        id: params[0] + "",
        canRepro: true,
        author: message.author.id,
        message: params[1]
    };
    let user = User.where('id', message.author.id).fetch();
    if (user || user !== null) {
        user = user.attributes;
        repro.message = repro.message
            .replace('-a ', user.android + " ")
            .replace(' -m ', user.macOS + " ")
            .replace(' -l ', user.linux + " ")
            .replace(' -i ', user.iOS + " ")
            .replace(' -w ', user.windows + " ")
    }
    //get the report in question
    let report = await Report.where('id', repro.id).fetch();
    if (!report || report == null)
        return (await message.reply("This is an invalid report")).delete(delayInMS);
    report = report.attributes;
    if (report.is_Trello)
        return (await message.reply("This report is already approved")).delete(delayInMS);
    //find the repro in question
    let reprotest = await Repro.where('id', repro.id).where('author', repro.author).fetch();
    if (reprotest || reprotest != null) {
        await reprotest.save(repro, { patch: true });
        (await message.channel.reply("You have changed your stance on " + repro.id)).delete(delayInMS);
    }
    else {
        await new Repro(repro).save();
        (await message.channel.reply("You have approved " + repro.id)).delete(delayInMS);
    }
    reprotest = await Repro.where('id', repro.id).where('canRepro', true).count();
    if (reprotest >= config.minApprovals) {
        (await message.channel.send("Report " + repro.id + " has been approved")).delete(delayInMS);
        return await approve(report);
    }
    reportUpdate(report);
}
/**
 * description of the command
 */
const description = "approve a bug in approval queue";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
