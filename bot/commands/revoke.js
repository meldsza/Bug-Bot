
const config = require('./../../config');
const Report = require('./../../orm/Report');
const Repro = require('./../../orm/Repro');
const rp = require('./../../data/reportparts.json');
const bot = require('./../bot');
const reportUpdate = require('./../lib/reportUpdate');
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
        return (await message.reply("You need to be a bug hunter to use this command")).delete(config.delayInMS);
    let report = await Report.where('id', repro.id).fetch();
    if (!report || report == null)
        return (await message.reply("This is an invalid report")).delete(delayInMS);
    report = report.attributes;
    //find the repro in question
    let reprotest = await Repro.where('id', repro.id).where('author', repro.author).fetch();
    if (reprotest || reprotest != null) {
        await reprotest.delete();
        (await message.channel.reply("You have revoked your stand on " + repro.id)).delete(delayInMS);
    }
    else {
        (await message.channel.reply("You have not approved/denied bug no. " + repro.id)).delete(delayInMS);
    }
    reportUpdate(report)
}
/**
 * description of the command
 */
const description = "revoke a bug approval/denial in approval queue";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
