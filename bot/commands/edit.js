
const config = require('./../../config');
const Report = require('./../../orm/Report');
const Repro = require('./../../orm/Repro');
const rp = require('./../../data/reportparts.json');
const bot = require('./../bot');
const reportUpdate = require('./../lib/reportUpdate');
const reportToText = require('./../lib/reportToText');
const getTrelloReport = require('./../lib/getTrelloReport');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!Object.values(config).includes(message.channel.id)) return;
    params = params.join(' ').split(" | ");
    if (params.length !== 3)
        return (await message.reply("The message should contain two |")).delete(config.delayInMS);
    let user = User.where('id', message.author.id).fetch();
    if (user || user !== null) {
        user = user.attributes;
        params[3] = params[3]
            .replace('-a ', user.android + " ")
            .replace(' -m ', user.macOS + " ")
            .replace(' -l ', user.linux + " ")
            .replace(' -i ', user.iOS + " ")
            .replace(' -w ', user.windows + " ")
    }
    //get the report in question
    let report = await Report.where('id', params[0]).fetch();

    if (!message.member.roles.exists(config.trelloModRole) && !message.member.roles.exists(config.adminRole) && !message.member.roles.exists(config.devRole)) {
        if (!report || report == null)
            return (await message.reply("This is an invalid report")).delete(delayInMS);
        if (report.get("author") != message.author.id)
            return (await message.reply("You can only edit your own report")).delete(delayInMS);

        else if (!report.attributes.is_Trello)
            return (await message.reply("Only Trello mods or " + bot.users.get(report.get("author")).tag + " can edit this")).delete(delayInMS);
    }
    else if (!report || report == null) {
        report = await getTrelloReport(params[0]);
        if (!report || report == null)
            return (await message.reply("This is an invalid report")).delete(delayInMS);
    }
    if ((/(title|header|short description)/i).test(params[1])) {
        report.set("header", params[3])
    }
    else if ((/(steps to reproduce|str|body)/i).test(params[1])) {
        report.set("steps", params[3])
    }
    else if ((/(expected|expected result)/i).test(params[1])) {
        report.set("expected", params[3])
    }
    else if ((/(actual|actual result)/i).test(params[1])) {
        report.set("actual", params[3])
    }
    else if ((/(client|client settings|cs)/i).test(params[1])) {
        report.set("client", params[3])
    }
    else if ((/(system|system settings|ss)/i).test(params[1])) {
        report.set("system", params[3])
    }
    else {
        return (await message.reply("I dont know what you're refering to. Please refer to " + bot.channels.find("name", "bot-help").toString())).delete(delayInMS);
    }
    (await message.reply("Report Updated")).delete(delayInMS);
    await report.save({ patch: true });
    return await reportUpdate(report);
}
/**
 * description of the command
 */
const description = "edit a bug report";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
