// All SQL queries for wishlist

// Add listing to wishlist
const addToWishlistQuery = `
  INSERT INTO wishlist (UserId, ListingId, CreatedDate, CreatedBy)
  VALUES (?, ?, ?, ?)
`;

// Remove listing from wishlist
const removeFromWishlistQuery = `
  DELETE FROM wishlist WHERE UserId = ? AND ListingId = ?
`;

// Get wishlist of a user
const getWishlistByUserQuery = `
  SELECT w.WishlistId, w.ListingId, l.Price, l.Description, b.BrandName, m.ModelName, ci.CityName
  FROM wishlist w
  JOIN carlistings l ON w.ListingId = l.ListingId
  JOIN carbrands b ON l.BrandId = b.BrandId
  JOIN carmodels m ON l.ModelId = m.ModelId
  JOIN cities ci ON l.CityID = ci.CityID
  WHERE w.UserId = ?
`;

module.exports = {
  addToWishlistQuery,
  removeFromWishlistQuery,
  getWishlistByUserQuery
};
