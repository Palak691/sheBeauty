import mongoose from "mongoose";

const giftSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: String,

    image: {
     type : String,
      trim : true,
      required : true
    },

    stock: {
      type: Number,
      default: 100,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    minOrderValue: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

const Gift = mongoose.model("Gift", giftSchema);
export default Gift;