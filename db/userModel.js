const mongoose = require("mongoose");

// user model => field and attributes like email, password

// user schema => defines rules and sturucture for validating the data stored in the user model

// Whatecver will be inside Schema will be in object form
const UserSchema = new mongoose.Schema({
  // email field
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    unique: [true, "Email exists"],
  },

  //   Password field
  password: {
    type: String,
    required: [true, "Please valid password"],
    unique: [false],
  },
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
