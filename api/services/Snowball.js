const _ = require('lodash');

export function createSnowball(accounts, snowballAmt) {
    let snowball = [];
    for (acct of accounts) {
        let balance = -1 * acct.currentBalance / 1000;
        let monthlyInterestRate = acct.percentageRate / 12;
        snowball.push({
            account: {
                name: acct.name,
                balance: balance,
                interestRate: acct.percentageRate,

            }
        });
        // calculatePayoff(monthlyInterestRate, balance, )
    }
}

export function calculatePayoff(monthlyInterestRate, balance, paymentAmt, months) {
    let monthlyInterestDue = _.round(monthlyInterestRate/100 * balance, 2);
    let balanceCarryover = balance + monthlyInterestDue - paymentAmt;
    let snowballAmt = 0;
    if (balanceCarryover < 0) {
        snowballAmt = -1 * balanceCarryover;
    }
    //Need to turn this into a recursive call so that we populate each month
    months.push({
        interestPaid: monthlyInterestDue,
        balanceCarryover: balanceCarryover,
        snowballAmt: snowballAmt
    });
    if (balanceCarryover <= 0) {
        return months;
    } else {
        return calculatePayoff(monthlyInterestRate, balanceCarryover, paymentAmt, months);
    }
}