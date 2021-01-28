const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    country: String,
    city: String,
    picture: String,
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

OrganizationSchema.pre("save", async function (next) {
  const user = this;
  user.password =
    user.password && (await bcrypt.hash(user.password.trim(), 12));
  next();
});

OrganizationSchema.pre("findOneAndUpdate", async function (next) {
  this.update({}, { $set: { updatedAt: new Date() } });
});

const Organization = mongoose.model(
  "organization",
  OrganizationSchema,
  "organization"
);

module.exports = Organization;
