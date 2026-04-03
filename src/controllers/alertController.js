import Alert from '../models/Alert.js';
import mongoose from 'mongoose';



// GET /alerts — Get all alerts with optional filters and pagination
export const getAllAlerts = async (req, res, next) => {
  try {
    const { status, alert_type, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (alert_type) filter.alert_type = alert_type;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const [alerts, total] = await Promise.all([
      Alert.find(filter).sort({ created_at: -1 }).skip(skip).limit(limitNum),
      Alert.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: alerts.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      data: alerts,
    });
  } catch (error) {
    next(error);
  }
};




// GET /alerts/:id — Get a specific alert by ID
export const getAlertById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid alert ID format' });
    }

    const alert = await Alert.findById(id);
    console.log(alert);
    
    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert not found' });
    }

    res.status(200).json({ success: true, data: alert });
  } catch (error) {
    next(error);
  }
};



