var mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    weight: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }
)

module.exports = Item = mongoose.model("items", ItemSchema)
