import mongoose from 'mongoose'

export const jsonSchema = {
    createdBy: {type: String, ref: 'User'},
    name: String,
    type: String,
    website: String,
    lastFour: Number,
    expiration: Date,
    creditLimit: Number,
    availableCredit: Number,
    percentageRate: Number,
    ynabAccountId: String,
    budgetCategoryId: String,
    paymentDueDate: Number,
    nextPaymentDueDate: Date,
    currentSnowballAmount: Number,
    startingBalance: Number,
    startingBalanceDate: Date,
    includeInSnowball: {type: Boolean, "default": true},
    created: {type: Date, "default": Date.now},
    lastUpdated: {type: Date, "default": Date.now},
    lastSynced: {type: Date, "default": Date.now},
    lastUpdatedBy: {type: String, ref: 'User'}
};

export const Schema = mongoose.Schema(jsonSchema);
export const Model = mongoose.model("Account", Schema);
