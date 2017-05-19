const bookshelf = require('./../bookshelf');
var Message = bookshelf.Model.extend({
    tableName: 'discord_messages',
    hasTimestamps: false
});
module.exports = Message;
