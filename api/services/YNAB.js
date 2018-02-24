const ynabApi = require('ynab');
const accessToken = '46ae5cadf8d341e8f73cfd40397882c2c01ef24874d6be80d9abefa56dc4f2b7';
const ynab = new ynabApi(accessToken);

export async function listBudgets(){
    const budgetsResponse = await ynab.budgets.getBudgets();
    const budgets = budgetsResponse.data.budgets;
    for(let budget of budgets) {
        console.log(`Budget Name: ${budget.name}`);
    }
}