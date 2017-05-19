const bookshelf = require('./../bookshelf');
var Report = bookshelf.Model.extend({
    tableName: 'reports',
    hasTimestamps: false
});
module.exports = Report;
