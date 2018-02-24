import mongoose from 'mongoose'

export const jsonSchema = {
    firstName: {type:String, required: true},
    lastName: {type:String},
    hashedPassword: String,
    email: { type: String, lowercase: true, required: true, validate: Validations.email, unique: true },
    created: {type: Date, "default": Date.now}
};

export const Schema = mongoose.Schema(jsonSchema);
export const Model = mongoose.model("User", Schema);