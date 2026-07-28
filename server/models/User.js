const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["Member", "Administrator"],
      default: "Member",
    },

    avatarUrl: {
      type: String,
      default: "",
    },

    joinedDate: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.method("toJSON", function () {
  const obj = this.toObject();

  delete obj.password;
  delete obj.__v;

  obj.id = obj._id.toString();
  delete obj._id;

  return obj;
});

const User = mongoose.model("User", userSchema);

module.exports = User;