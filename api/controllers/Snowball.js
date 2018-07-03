'use strict';

import * as Account from '../models/Account';
import express from 'express';
import moment from 'moment';
import _ from 'lodash';

export const router = express.Router();

router.route('/')
    .get(defaultSnowball);
//
// router.route('/:id')
//     .get(getAccount)
//     .put(updateAccount)
//     .delete(deleteAccount);

async function defaultSnowball(req, res, next) {
    // return getSnowball('default', new Date());
    const now = new moment();
    try {
        const accounts = await Account.Model
            .find({
                includeInSnowball: true,
                currentBalance: {'$lt': 0}
            })
            .sort({currentBalance: 'asc'})
            .lean();

        let message = 'No accounts found matching criteria';
        if (accounts.length > 0) {
            message = `Successfully retrieved ${accounts.length} accounts`;
        }

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
            calculatePayoff(monthlyInterestRate, balance, )
        }
        const data = {
            accounts: accounts,
            message: message
        };
        return res.json(data);
    } catch (e) {
        console.log('error calling Mongo ', e);
        return res.json({message: 'Error calling database'});
    }

}

function calculatePayoff(monthlyInterestRate, balance, paymentAmt, months) {
    let monthlyInterestDue = monthlyInterestRate * balance;
    let currPrincipal = paymentAmt - monthlyInterestDue;
    let newBalance = balance - paymentAmt;
    //Need to turn this into a recursive call so that we populate each month
    if ()
    months.push(calculatePayoff(monthlyInterestRate, newBalance, paymentAmt));
}

async function getSnowball(type, startDate) {

}