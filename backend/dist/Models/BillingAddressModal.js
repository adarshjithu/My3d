"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingAddress = void 0;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const billingAddressSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming you store user IDs as ObjectIds
        ref: 'User', // Reference to the User model
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    streetaddress: {
        type: String,
        required: true
    },
    apartment: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // to keep track of createdAt and updatedAt fields
});
exports.BillingAddress = mongoose.model('BillingAddress', billingAddressSchema);
