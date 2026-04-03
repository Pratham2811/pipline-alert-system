import { body, validationResult } from 'express-validator';


export const createAlertRules = [
  body('pipeline_segment')
    .notEmpty()
    .withMessage('Pipeline segment is required')
    .isString()
    .withMessage('Pipeline segment must be a string')
    .trim(),

  body('detection_method')
    .notEmpty()
    .withMessage('Detection method is required')
    .isIn(['Method 1', 'Method 2', 'Method 3'])
    .withMessage('Detection method must be Method 1, Method 2, or Method 3'),

  body('alert_type')
    .notEmpty()
    .withMessage('Alert type is required')
    .isIn(['leak', 'theft'])
    .withMessage('Alert type must be leak or theft'),

  body('severity')
    .notEmpty()
    .withMessage('Severity is required')
    .isIn(['low', 'medium', 'high'])
    .withMessage('Severity must be low, medium, or high'),

  body('location_km')
    .notEmpty()
    .withMessage('Location (km) is required')
    .isFloat({ min: 0 })
    .withMessage('Location must be a positive number'),

  body('status')
    .optional()
    .isIn(['active', 'investigating', 'resolved'])
    .withMessage('Status must be active, investigating, or resolved'),
];

export const updateAlertRules = [
  body('pipeline_segment')
    .optional()
    .isString()
    .withMessage('Pipeline segment must be a string')
    .trim(),

  body('detection_method')
    .optional()
    .isIn(['Method 1', 'Method 2', 'Method 3'])
    .withMessage('Detection method must be Method 1, Method 2, or Method 3'),

  body('alert_type')
    .optional()
    .isIn(['leak', 'theft'])
    .withMessage('Alert type must be leak or theft'),

  body('severity')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Severity must be low, medium, or high'),

  body('location_km')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Location must be a positive number'),

  body('status')
    .optional()
    .isIn(['active', 'investigating', 'resolved'])
    .withMessage('Status must be active, investigating, or resolved'),
];

// Middleware to check validation results
export const validate = (req, res, next) => {

  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};
