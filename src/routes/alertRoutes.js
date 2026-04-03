import express from 'express';
import {
  // createAlert,
  getAllAlerts,
  getAlertById,
  // updateAlert,
  // deleteAlert,
  // getAlertsSummary,
  // getAlertsStatistics,
} from '../controllers/alertController.js';
import { createAlertRules, updateAlertRules, validate } from '../middleware/validate.js';

const router = express.Router();


router.route('/')

  .get(getAllAlerts);

router.route('/:id')
  .get(getAlertById)
  

export default router;
