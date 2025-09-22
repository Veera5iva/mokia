import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  requests: [{
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consumer',
    },
    status: {
      type: String,
      enum: ['Requested', 'Accepted', "On My Way", 'In Progress', 'Completed', 'Canceled', 'Rejected'],
      default: 'Requested',
    }
  }]
}, { timestamps: true });


const Service = mongoose.models.services || mongoose.model('Service', serviceSchema);
export default Service;