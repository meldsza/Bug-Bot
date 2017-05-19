const refresh = require('./lib/refresh');
const bot = require('./bot.js');
const settings = require('./../config.js');
const modules = require('./modules.js');
const Message = require('./../orm/Message')
const commands = require('./commands');
const request = require('request-promise-native');
let lock = false;
bot.on('error', (err) => {
    /**
     * Catch errors here
     */
    console.log("Stack Trace: " + err.stack);
})
process.on('unhandledRejection', (err) => {
    console.log("UNHANDLED REJECTION AT " + err.stack);
    if (err.toString().includes('Request to use token, but token was unavailable to the client'))
        process.exit();//restart
});
process.on('uncaughtException', (err) => console.log("UNHANDLED EXCEPTION AT " + err.stack));
bot.on('message', (message) => {
    /**
     * if locked, reject everything except dm
     */

    new Message({
        messageID: message.id,
        channel: message.channel.id
    }).save();
    if (message.author.bot) return;
    /**
     * Listen to messages and convert into params
     */
    if (message.content.startsWith(settings.identifier)) {
        /**Extracting params */
        let params = message.content.substring(settings.identifier.length).trim();
        params = params.split(settings.delimiter || ' ');
        let cmd = params.shift().trim();
        commands.execute(cmd.toLowerCase(), params, message)
    }
    else {
        //ignore because normal message
    }
});

bot.on('ready', () => {
    console.log("Bug Bot 3 Ready");
});
