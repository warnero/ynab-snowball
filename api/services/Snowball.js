const _ = require('lodash');
const moment = require('moment');

export function createSnowball(accounts, snowballAmt) {
    let snowball = [];
    let snowballHistory = [
        {
            snowballPayment : {
                yearMonth: moment().format('YYYY-MM'),
                paymentOrRollover: 0.00,
                initialSnowball: snowballAmt,
                currentSnowball: snowballAmt
            }
        }
    ];
    for (const acct of accounts) {
        let balance = -1 * acct.currentBalance / 1000;
        let monthlyInterestRate = acct.percentageRate / 12;
        let paymentAmt = acct.minimumPayment;
        let months = [];
        let paymentDate = moment().date(acct.paymentDate);

        months = calculatePayoff(monthlyInterestRate, balance, paymentAmt, months, paymentDate, snowballHistory);
        let payoffMonth = months[months.length - 1].yearMonth;
        let totalInterestPaid = months[months.length - 1].interestToDate;

        snowball.push({
            account: {
                name: acct.name,
                balance: balance,
                interestRate: acct.percentageRate,
                months: months,
                totalMonthsUntilPaidOff: months.length,
                totalInterestPaid: totalInterestPaid,
                payoffMonth: payoffMonth,
                currentSnowball: snowballHistory[snowballHistory.length -1].snowballPayment.currentSnowball
            }
        });
    }
    return snowball;
}

export function calculatePayoff(monthlyInterestRate, balance, paymentAmt, months, paymentDate, snowballHistory) {
    paymentDate = moment(paymentDate);
    let monthlyInterestDue = _.round(monthlyInterestRate/100 * balance, 2);
    let newPayment = paymentAmt;
    //We are going to have to loop through this to find stuff
    for(let i = snowballHistory.length; i--;) {
        let currSnowObj = snowballHistory[i];
        let snowballPaymentDate = new moment(currSnowObj.snowballPayment.paymentDate);
        if(paymentDate.isAfter(snowballPaymentDate)) {
            if (currSnowObj.paymentOrRollover > 0) {
                newPayment += currSnowObj.snowballPayment.paymentOrRollover;
            } else {
                newPayment += currSnowObj.snowballPayment.currentSnowball;
            }
            break;
        }
    }
    let balanceCarryover = _.round(balance + monthlyInterestDue - newPayment, 2);

    let paidOff = false;
    let currentSnowball = snowballHistory[snowballHistory.length - 1].snowballPayment.currentSnowball;
    let initialSnowball = snowballHistory[0].snowballPayment.initialSnowball;

    let interestToDate = monthlyInterestDue;
    if (months.length > 0) {
        interestToDate = _.round(monthlyInterestDue + months[months.length - 1].interestToDate, 2);
    }

    let nextPaymentDate = moment(paymentDate).add(1, 'M');
    if (balanceCarryover <= 0) {
        let partialAmount = -1 * balanceCarryover;
        paidOff = true;
        //First push in partial payment to snowball
        snowballHistory.push({
            snowballPayment : {
                yearMonth: paymentDate.format('YYYY-MM'),
                paymentOrRollover: partialAmount,
                initialSnowball: initialSnowball,
                currentSnowball: currentSnowball
            }
        });

        //following month has the new snowball amount
        snowballHistory.push({
            snowballPayment : {
                yearMonth: nextPaymentDate.format('YYYY-MM'),
                paymentOrRollover: 0.00,
                initialSnowball: initialSnowball,
                currentSnowball: currentSnowball + paymentAmt
            }
        });
    }
    //Need to turn this into a recursive call so that we populate each month
    months.push({
        yearMonth: paymentDate.format('YYYY-MM'),
        paymentAmt: paymentAmt,
        interestPaid: monthlyInterestDue,
        interestToDate: interestToDate,
        balanceCarryover: balanceCarryover,
        paymentDate: paymentDate.format('MM/DD/YYYY'),
        paidOff: paidOff
    });
    if (balanceCarryover <= 0) {
        return months;
    } else {
        return calculatePayoff(monthlyInterestRate, balanceCarryover, paymentAmt, months, nextPaymentDate, snowballHistory);
    }
}