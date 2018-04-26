'use strict';

import * as Account from './models/Account';

const _ = require('lodash');
const ynabApi = require('ynab');
const mongoose = require("mongoose");
const conf = require("./config/settings");
const accessToken = conf.get('ynab.accessToken');
const ynab = new ynabApi(accessToken);
const budgetId = conf.get('ynab.budgetId');


async function getAccounts(budgetId){
    const accountsResponse = await ynab.accounts.getAccounts(budgetId);
    let accounts = _.filter(accountsResponse.data.accounts, (acct) => {
        if (acct.closed === false) {
            if (acct.type === 'creditCard' || acct.type === 'otherLiability') {
                return acct;
            }
        }
    });
    return accounts;
}

async function createAccounts(budgetId) {
    try {
        const accounts = await getAccounts(budgetId);
        for (let acct of accounts) {
            let params = {
                name: acct.name,
                type: acct.type,
                ynabAccountId: acct.id,
                startingBalance: acct.balance,
                startingBalanceDate: Date.now()
            };
            let account = new Account.Model(params);
            console.log('preparing to create new account ', account);
            try {
                await account.save();
            } catch (err) {
                console.error(err);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

export function start() {
    mongoose.set("debug", conf.get('mongo.debug'));
    mongoose.connect(conf.get('mongo.url') + conf.get('mongo.name'));
    createAccounts(budgetId);
}

start();