import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema(
  {
    pipeline_segment: {
      type: String,
      required: [true, 'Pipeline segment is required'],
      trim: true,
    },
    detection_method: {
      type: String,
      required: [true, 'Detection method is required'],
      enum: {
        values: ['Method 1', 'Method 2', 'Method 3'],
        message: 'Detection method must be Method 1, Method 2, or Method 3',
      },
    },
    alert_type: {
      type: String,
      required: [true, 'Alert type is required'],
      enum: {
        values: ['leak', 'theft'],
        message: 'Alert type must be leak or theft',
      },
    },
    severity: {
      type: String,
      required: [true, 'Severity is required'],
      enum: {
        values: ['low', 'medium', 'high'],
        message: 'Severity must be low, medium, or high',
      },
    },
    location_km: {
      type: Number,
      required: [true, 'Location (km) is required'],
      min: [0, 'Location must be a positive number'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'investigating', 'resolved'],
        message: 'Status must be active, investigating, or resolved',
      },
      default: 'active',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
