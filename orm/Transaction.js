const bookshelf = require('./../bookshelf');
const bot = require('./../bot/bot');
const Message = require('./Message')
var Transaction = bookshelf.Model.extend({
    tableName: 'Transactions',
    hasTimestamps: true
});
module.exports = Transaction;
