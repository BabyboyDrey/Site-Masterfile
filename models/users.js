const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

usersSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

usersSchema.pre("save", function (next) {
  this.updatedAt = Date();
  next();
});

module.exports = Users = mongoose.model("Users", usersSchema);
