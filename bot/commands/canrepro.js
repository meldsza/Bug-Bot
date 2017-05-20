
const config = require('./../../config');
const Report = require('./../../orm/Report');
const Repro = require('./../../orm/Repro');
const rp = require('./../../data/reportparts.json');
const bot = require('./../bot');
const trelloUpdate = require('./../lib/trelloUpdate');
const reportToText = require('./../lib/reportToText');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!Object.values(config).includes(message.channel.id)) return;
    if (Object.values(config).includes(config.bugHunterChannel) || Object.values(config).includes(config.bugApprovalChannel) || Object.values(config).includes(config.modLogChannel)) return;
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
            .replace(' -a ', user.android)
            .replace(' -m ', user.macOS)
            .replace(' -l ', user.linux)
            .replace(' -i ', user.iOS)
            .replace(' -w ', user.windows)
    }
    //get the report in question
    let report = await Report.where('id', repro.id).fetch();
    if (!report || report == null)
        return (await message.reply("This is an invalid report")).delete(delayInMS);
    report = report.attributes;
    if (!report.is_Trello)
        return (await message.reply("This report is not yet approved")).delete(delayInMS);
    //find the repro in question
    let reprotest = await Repro.where('id', repro.id).where('author', repro.author).fetch();
    if (reprotest || reprotest != null) {
        await reprotest.save(repro, { patch: true });
        (await message.channel.reply("You have changed your stance on " + repro.id)).delete(delayInMS);
    }
    else {
        await new Repro(repro).save();
        (await message.channel.reply("Your reproduction has been added to " + repro.id)).delete(delayInMS);
    }
    return await trelloUpdate(report);
}
/**
 * description of the command
 */
const description = "set cantRepro to a bug";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
