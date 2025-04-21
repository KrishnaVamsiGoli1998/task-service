const axios = require('axios');

const AUDIT_SERVICE_URL = 'http://localhost:4004/logs';

const logAction = async (action_type, description) => {
 try {
  await axios.post(AUDIT_SERVICE_URL, {
   action_type,
   description,
  });
  console.log('Audit log sent:', action_type);
 } catch (error) {
  console.error('Failed to send audit log:', error.message);
 }
};

module.exports = { logAction };
