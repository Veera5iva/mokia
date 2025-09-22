import mongoose from "mongoose";

const consumerSchema = new mongoose.Schema({
   username: {
      type: String,
      required: [true, "Please provide a username"],
      trim: true,
   },
   phone: {
      type: String,
      required: false,
      match: [/^\d{10}$/, "Please provide a valid phone number"]
   },
   email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"]
   },
   password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters long"]
   },
   role: {
      type: String,
      required: true,
      enum: ["consumer"],
      default: "consumer",
   },
   requestedServices: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
   }],
   location: {
      type: {
         type: String,
         enum: ["Point"],
         default: "Point"
      },
      coordinates: {
         type: [Number],
         required: false
      }
   },
   isVerified: {
      type: Boolean,
      default: false
   },
   forgotPasswordToken: String,
   forgotPasswordTokenExpiry: Date,
   verifyToken: String,
   verifyTokenExpiry: Date,
}, { timestamps: true });

const Consumer = mongoose.models.consumers || mongoose.model("Consumer", consumerSchema);

export default Consumer;