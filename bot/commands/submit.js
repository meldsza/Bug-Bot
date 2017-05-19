
const config = require('./../../config');
const Report = require('./../../orm/Report');
const rp = require('./../../data/reportparts.json');
const bot = require('./../bot');
const reportToText = require('./../lib/reportToText');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!Object.values(config).includes(message.channel.id)) return;
    params = params.join(' ');
    if (!params.includes('|'))
        return await message.reply("The Report should contain a |");
    params = params.split(' | ');
    let report = {
        header: params[0],
        steps: null,
        expected: null,
        actual: null,
        client: null,
        system: null,
        channelID: message.channel.id
    };
    params = params[1].split(' ');
    for (let i = 0; i < params.length; i++) {
        if (params[i].toLowerCase().startsWith("steps to reproduce:"))
            report.steps = params[i].substring("steps to reproduce:".length);
        else if (params[i].toLowerCase().startsWith("expected result:"))
            report.expected = params[i].substring("expected result:".length);
        else if (params[i].toLowerCase().startsWith("actual result:"))
            report.actual = params[i].substring("actual result:".length);
        else if (params[i].toLowerCase().startsWith("client settings:"))
            report.client = params[i].substring("client settings:".length);
        else if (params[i].toLowerCase().startsWith("system settings:"))
            report.system = params[i].substring("system settings:".length);
    }
    let reply = "";
    Object.keys(report).forEach(function (key) {
        if (report[key] == null) {
            reply = reply + "**" + rp[key] + "** is missing";
        }
    });
    if (reply != "")
        return await message.reply(reply);
    else {
        report.messageID = await bot.channels.get(config.bugApprovalChannel).send({ attributes: report });
        new Report(report).save();
    }
}
/**
 * description of the command
 */
const description = "submit a bug to approval queue";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
