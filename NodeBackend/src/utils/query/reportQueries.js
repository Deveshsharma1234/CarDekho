// Create a new report
 const createReportQuery = `
  INSERT INTO reports (Title, Description, CreatedBy, CreatedAt)
  VALUES (?, ?, ?, ?)
`;

// Get all reports
 const getAllReportsQuery = `
  SELECT r.ReportId, r.Title, r.Description, r.CreatedAt, u.FirstName AS CreatedBy
  FROM reports r
  JOIN users u ON r.CreatedBy = u.UserId
  ORDER BY r.CreatedAt DESC
`;

module.exports = {
  createReportQuery,
  getAllReportsQuery,
};