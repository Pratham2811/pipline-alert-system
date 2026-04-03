import Alert from '../models/Alert.js';
import mongoose from 'mongoose';




export const getAllAlerts = async (req, res, next) => {
  try {
    const { status, alert_type, page = 1, limit = 10 } = req.query;

   
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



export const createAlert = async (req, res, next) => {
  try {
    const alert = await Alert.create(req.body);
    res.status(201).json({ success: true, data: alert });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    next(error);
  }
};

export const deleteAlert = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid alert ID format' });
    }

    const alert = await Alert.findByIdAndDelete(id);
    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert not found' });
    }

    res.status(200).json({ success: true, message: 'Alert deleted successfully', data: alert });
  } catch (error) {
    next(error);
  }
};

export const updateAlert = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid alert ID format' });
    }

    const alert = await Alert.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert not found' });
    }

    res.status(200).json({ success: true, data: alert });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    next(error);
  }
};


export const getAlertsSummary = async (req, res, next) => {
  try {
    const summary = await Alert.aggregate([
      {
        $group: {
          _id: { status: '$status', severity: '$severity' },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.status',
          severities: {
            $push: {
              severity: '$_id.severity',
              count: '$count',
            },
          },
          total: { $sum: '$count' },
        },
      },
      {
        $project: {
          _id: 0,
          status: '$_id',
          total: 1,
          severities: 1,
        },
      },
      { $sort: { status: 1 } },
    ]);

    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
};


export const getAlertsStatistics = async (req, res, next) => {
  try {
    const [totalResult, byMethod, avgLocation] = await Promise.all([
      Alert.countDocuments(),
      Alert.aggregate([
        { $group: { _id: '$detection_method', count: { $sum: 1 } } },
        { $project: { _id: 0, detection_method: '$_id', count: 1 } },
        { $sort: { detection_method: 1 } },
      ]),
      Alert.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: null, average_location_km: { $avg: '$location_km' } } },
      ]),
    ]);

    res.status(200).json({
      success: true,
      data: {
        total_alerts: totalResult,
        alerts_by_detection_method: byMethod,
        average_location_km_active:
          avgLocation.length > 0
            ? parseFloat(avgLocation[0].average_location_km.toFixed(2))
            : 0,
      },
    });
  } catch (error) {
    next(error);
  }
};