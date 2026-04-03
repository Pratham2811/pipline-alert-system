import express from "express";
import {
  createAlert,
  getAllAlerts,
  getAlertById,
  updateAlert,
  deleteAlert,
  getAlertsSummary,
  getAlertsStatistics,
} from "../controllers/alertController.js";
import {
  createAlertRules,
  updateAlertRules,
  validate,
} from "../middleware/validate.js";

const router = express.Router();

router
  .route("/")
  .get(getAllAlerts)
  .post(createAlertRules, validate, createAlert);
router.get("/summary", getAlertsSummary);
router.get("/statistics", getAlertsStatistics);
router
  .route("/:id")
  .get(getAlertById)
  .put(updateAlertRules, validate, updateAlert)
  .delete(deleteAlert);

export default router;
