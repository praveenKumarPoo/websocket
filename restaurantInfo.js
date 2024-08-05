const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const restaurantListModel = new Schema({
    "type": {
        type: String,
    },
    "restaurant-info": {
        type: Object,
      },
      "today": {
        type: String,
      },
      "categorys": {
        type: Array,
      },
      "deals": {
        type: String,
      },
      "working-hours-start": {
        type: String,
      },
      "working-hours-end": {
        type: String,
      }
});

const restaurantLists = model('restaurantLists', restaurantListModel);
module.exports = restaurantLists;

