const bookshelf = require('./../bookshelf');
var Repro = bookshelf.Model.extend({
    tableName: 'repros',
    hasTimestamps: false
});
module.exports = Repro;
