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
            .sort({currentBalance: 'asc'});
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

async function getSnowball(type, startDate) {

}