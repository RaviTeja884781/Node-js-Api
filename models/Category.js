const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      requied: true,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("categoryModel", CategorySchema);
module.exports = categoryModel;
