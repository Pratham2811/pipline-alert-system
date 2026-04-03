
//this is seed data injected into database once only 

import Alert from '../models/Alert.js';

const sampleAlerts = [
  {
    pipeline_segment: 'Assam-North-12',
    detection_method: 'Method 1',
    alert_type: 'leak',
    severity: 'high',
    location_km: 45.2,
    status: 'active',
  },
  {
    pipeline_segment: 'Gujarat-West-07',
    detection_method: 'Method 2',
    alert_type: 'theft',
    severity: 'medium',
    location_km: 120.8,
    status: 'investigating',
  },
  {
    pipeline_segment: 'Rajasthan-East-03',
    detection_method: 'Method 3',
    alert_type: 'leak',
    severity: 'low',
    location_km: 78.5,
    status: 'resolved',
  },
  {
    pipeline_segment: 'Maharashtra-South-15',
    detection_method: 'Method 1',
    alert_type: 'theft',
    severity: 'high',
    location_km: 200.3,
    status: 'active',
  },
  {
    pipeline_segment: 'Tamil-Nadu-Central-09',
    detection_method: 'Method 2',
    alert_type: 'leak',
    severity: 'medium',
    location_km: 55.0,
    status: 'active',
  },
];

const seedDatabase = async () => {
  try {
    const existing = await Alert.findOne();
    if (!existing) {
      await Alert.insertMany(sampleAlerts);
      console.log('Database seeded with 5 sample alerts');
    } else {
      console.log('Database already has alerts — skipping seed');
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

export default seedDatabase;
