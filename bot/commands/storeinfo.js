
const config = require('./../../config');
const Report = require('./../../orm/Report');
const Repro = require('./../../orm/Repro');
const rp = require('./../../data/reportparts.json');
const bot = require('./../bot');
const reportUpdate = require('./../lib/reportUpdate');
const reportToText = require('./../lib/reportToText');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!Object.values(config).includes(message.channel.id)) return;
    let user = User.where('id', message.author.id).fetch();
    params = params.join(' ').split(" | ");
    if (params.length < 2) {
        await message.author.send(
            "**Your Client Information**\n-----------------------------------------------\n"
            + "**Windows**\n"
            + user.get('windows')
            + "\n**Android**\n"
            + user.get('android')
            + "\n**iOS**\n"
            + user.get('iOS')
            + "\n**macOS**\n"
            + user.get('macOS')
            + "\n**linux**\n"
            + user.get('linux')
        )
        return (await message.reply("Your Client information has been sent to you")).delete(config.delayInMS);
    }
    params[0] = params[0].trim().toLowerCase();
    if (params[0] === '-a')
        user.set('android', params[1].trim())
    else if (params[0] === '-m')
        user.set('macOS', params[1].trim())
    else if (params[0] === '-i')
        user.set('iOS', params[1].trim())
    else if (params[0] === '-w')
        user.set('windows', params[1].trim())
    else if (params[0] === '-l')
        user.set('linux', params[1].trim())
    else {
        return (await message.reply("Invalid system tag")).delete(config.delayInMS);
    }
}
/**
 * description of the command
 */
const description = "add client info";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
