// Get all fraud alerts
 const getAllFraudAlertsQuery = `
  SELECT f.AlertId, f.UserId, u.FirstName, u.Email, f.Reason, f.Status, f.CreatedDate
  FROM fraudalerts f
  JOIN users u ON f.UserId = u.UserId
  ORDER BY f.CreatedDate DESC
`;

// Resolve fraud alert
const resolveFraudAlertQuery = `
  UPDATE fraudalerts
  SET Status = 'Verified', ReviewedBy = ?
  WHERE AlertId = ?
`;


module.exports = {
  getAllFraudAlertsQuery,
  resolveFraudAlertQuery,
};