const bookshelf = require('./../bookshelf');
const Message = require('./Message')
var User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: false
});
module.exports = User;
