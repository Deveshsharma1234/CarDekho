// queries/verificationQueries.js

// 1️ Get all pending verifications
 const getPendingVerificationsQuery = `
  SELECT v.VerificationId, v.UserId, u.Name, u.Email, v.Status, v.RequestedAt
  FROM sellerverification v
  JOIN users u ON v.UserId = u.UserId
  WHERE v.Status = 'Pending'
`;

// 2️ Update verification status
 const updateVerificationStatusQuery = `
  UPDATE sellerverification
  SET Status = ?, VerifiedBy = ?, VerifiedAt = ?
  WHERE VerificationId = ?
`;

// 3️ Get verification status for a user
 const getVerificationStatusQuery = `
  SELECT v.VerificationId, v.UserId, v.Status, v.VerifiedAt, u.Name, u.Email
  FROM sellerverification v
  JOIN users u ON v.UserId = u.UserId
  WHERE v.UserId = ?
`;
module.exports = {
  getPendingVerificationsQuery,
  updateVerificationStatusQuery,
  getVerificationStatusQuery,
};