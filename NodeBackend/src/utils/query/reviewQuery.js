// queries/reviewQueries.js

// Insert queries
 const createCarReviewQuery = `
  INSERT INTO carreviews (ListingId, UserId, Rating, Comment, CreatedAt)
  VALUES (?, ?, ?, ?, ?)
`;

 const createSellerReviewQuery = `
  INSERT INTO sellerreviews (SellerId, UserId, Rating, Comment, CreatedAt)
  VALUES (?, ?, ?, ?, ?)
`;

// Select queries
 const getCarReviewsQuery = `
  SELECT r.ReviewId, r.Rating, r.Comment, r.CreatedAt, u.Name AS ReviewerName
  FROM carreviews r
  JOIN users u ON r.UserId = u.UserId
  WHERE r.ListingId = ?
  ORDER BY r.CreatedAt DESC
`;

 const getSellerReviewsQuery = `
  SELECT r.ReviewId, r.Rating, r.Comment, r.CreatedAt, u.Name AS ReviewerName
  FROM sellerreviews r
  JOIN users u ON r.UserId = u.UserId
  WHERE r.SellerId = ?
  ORDER BY r.CreatedAt DESC
`;

module.exports = {
  createCarReviewQuery,
  createSellerReviewQuery,
  getCarReviewsQuery,
  getSellerReviewsQuery,
};