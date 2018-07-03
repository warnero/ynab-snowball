import mongoose from 'mongoose'

const _accountSnowballSchema = {
    account: {type: String, ref: 'Account'},
    budgetAmount: Number,
    order: Number
};

export const jsonSchema = {
    created: {type: Date, "default": Date.now},
    lastUpdated: {type: Date, "default": Date.now},
    createdBy: {type: String, ref: 'User'},
    lastUpdatedBy: {type: String, ref: 'User'},
    name: String,
    type: String,
    budgetAmount: Number,
    includeInterestCalculation: {type: Boolean, "default": true},
    currentSnowball: {type: Boolean, "default": true},
    accounts:[_accountSnowballSchema]
};

export const Schema = mongoose.Schema(jsonSchema);
export const Model = mongoose.model("SnowballPayoff", Schema);
