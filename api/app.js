'use strict';
import express      from 'express';
import logger       from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
const _ = require('lodash');
const ynabApi = require('ynab');
const conf = require("./config/settings");


const accessToken = conf.get('ynab.accessToken');
const ynab = new ynabApi(accessToken);


//using let
export let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/budgets', async (req, res, next) => {
    try {
        const budgets = await listBudgets();
        res.json(budgets);
    } catch (e) {
        next(e);
    }
});

async function listBudgets(){
    const budgetsResponse = await ynab.budgets.getBudgets();
    return budgetsResponse.data.budgets;
}

const budgetId = conf.get('ynab.budgetId');

app.use('/mybudget', async (req, res, next) => {
    try {
        const budget = await getBudget(budgetId);
        console.log('my budget %j', budget.accounts);
        res.json(budget);
    } catch (e) {
        next(e);
    }
});

async function getBudget(budgetId){
    const budgetResponse = await ynab.budgets.getBudgetById(budgetId);
    return budgetResponse.data.budget;
}

app.use('/myaccounts', async (req, res, next) => {
    try {
        const accounts = await getAccounts(budgetId);
        console.log('my accounts %j', accounts);
        res.json(accounts);
    } catch (e) {
        next(e);
    }
});

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
// using arrow syntax
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const server = app.listen(conf.get('port'), function () {
    const address = server.address(),
        host = address.address,
        port = address.port;
    console.log('listening on port ', port)
});