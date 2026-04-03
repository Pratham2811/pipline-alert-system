import express from 'express';
import {
  createAlert,
  getAllAlerts,
  getAlertById,
  updateAlert,
  deleteAlert,
  getAlertsSummary,
  getAlertsStatistics,
} from '../controllers/alertController.js';
import { createAlertRules, updateAlertRules, validate } from '../middleware/validate.js';

const router = express.Router();


router.route('/')
  .get(getAllAlerts)
  .post(createAlertRules, validate, createAlert);

router.route('/:id')
  .get(getAlertById)
  .put(updateAlertRules, validate, updateAlert)
  .delete(deleteAlert);
// Summary and statistics routes MUST come before /:id to avoid conflict
router.get('/summary', getAlertsSummary);
router.get('/statistics', getAlertsStatistics);

  

export default router;
