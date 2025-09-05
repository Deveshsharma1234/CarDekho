// All SQL queries related to transactions

// Insert new transaction
const createTransactionQuery = `
  INSERT INTO transactions 
  (UserId, ListingId, Amount, PaymentMethod, TransactionDate, CreatedBy) 
  VALUES (?, ?, ?, ?, ?, ?)
`;

// Get transactions of the logged-in user
const getOwnTransactionsQuery = `
  SELECT t.*, l.Price, l.Description, b.BrandName, m.ModelName
  FROM transactions t
  JOIN carlistings l ON t.ListingId = l.ListingId
  JOIN carbrands b ON l.BrandId = b.BrandId
  JOIN carmodels m ON l.ModelId = m.ModelId
  WHERE t.UserId = ?
`;

// Get all transactions (Admin)
const getAllTransactionsQuery = `
  SELECT t.*, u.FirstName, u.LastName, l.Price, b.BrandName, m.ModelName
  FROM transactions t
  JOIN users u ON t.UserId = u.UserId
  JOIN carlistings l ON t.ListingId = l.ListingId
  JOIN carbrands b ON l.BrandId = b.BrandId
  JOIN carmodels m ON l.ModelId = m.ModelId
`;

// Get transactions by a specific user (Admin)
const getTransactionsByUserQuery = `
  SELECT t.*, u.FirstName, u.LastName, l.Price, b.BrandName, m.ModelName
  FROM transactions t
  JOIN users u ON t.UserId = u.UserId
  JOIN carlistings l ON t.ListingId = l.ListingId
  JOIN carbrands b ON l.BrandId = b.BrandId
  JOIN carmodels m ON l.ModelId = m.ModelId
  WHERE t.UserId = ?
`;

module.exports = {
  createTransactionQuery,
  getOwnTransactionsQuery,
  getAllTransactionsQuery,
  getTransactionsByUserQuery
};
