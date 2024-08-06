const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const orderTabelModel = new Schema({
    "orderId": {
        type: String || Number,
    },
    "Orderinfo": {
        type: Object,
      },
    "totalOrderPrice":  {
        type: String || Number,
    },
    "numberOfItems": {
        type: String || Number,
    },
    "orderNameQuantity": {
        type: String ,
    },
});

const ordertabelists = model('ordertabelists', orderTabelModel);
module.exports = ordertabelists;

