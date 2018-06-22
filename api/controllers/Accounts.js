'use strict';

import * as Account from '../models/Account';
import express from 'express';
import _ from 'lodash';

export const router = express.Router();

router.route('/')
    .get(findAccounts)
    .post(createAccount);

router.route('/:id')
    .get(getAccount)
    .put(updateAccount)
    .delete(deleteAccount);

async function findAccounts(req, res, next) {
    console.log('called getAll from Accounts');
    try {
        const accounts = await Account.Model.find().lean();
        let message = 'No accounts found matching criteria';
        if (accounts.length > 0) {
            message = `Successfully retrieved ${accounts.length} accounts`;
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

async function createAccount(req, res, next) {

}

async function getAccount(req, res, next) {
    try {
        const account = await Account.Model.findById(req.params.id).lean();
        console.log('my account data from db ', account);
        let message = 'No account found matching criteria';
        if (account !== null) {
            message = `Successfully retrieved account`;
        }
        const data = {
            account: account,
            message: message
        };
        return res.json(data);
    } catch (e) {
        console.log('error calling Mongo ', e);
        return res.json({message: 'Error calling database'});
    }
}

async function updateAccount(req, res, next) {
    try {
        let account = await Account.Model.findById(req.params.id);
        _.assign(account, req.body);
        account = await account.save();
        let message = 'No account found matching criteria';
        if (account !== null) {
            message = `Successfully updated account`;
        }

        const data = {
            account: account,
            message: message
        };
        return res.json(data);
    } catch (e) {
        console.log('failed to update account');
        console.log('error calling Mongo ', e);
        return res.json({message: 'Error calling database'});
    }
}

async function deleteAccount(req, res, next) {

}