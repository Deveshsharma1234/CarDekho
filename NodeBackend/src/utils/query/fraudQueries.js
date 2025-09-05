// Get all fraud alerts
 const getAllFraudAlertsQuery = `
  SELECT f.FraudId, f.UserId, u.FirstName, u.Email, f.Description, f.Status, f.CreatedAt
  FROM fraudalerts f
  JOIN users u ON f.UserId = u.UserId
  ORDER BY f.CreatedAt DESC
`;

// Resolve fraud alert
 const resolveFraudAlertQuery = `
  UPDATE fraudalerts
  SET Status = 'Resolved', ResolvedBy = ?, ResolvedAt = ?
  WHERE FraudId = ?
`;

module.exports = {
  getAllFraudAlertsQuery,
  resolveFraudAlertQuery,
};