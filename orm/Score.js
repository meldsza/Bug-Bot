const Transaction = require('./Transaction');
async function Score(id) {
    let transactions = await Transaction.where('id', id).fetchAll();
    let score = 0;
    transactions.map(function (t) {
        score = score + t.attributes.amount;
    })
    return score;
};
module.exports = Score;
