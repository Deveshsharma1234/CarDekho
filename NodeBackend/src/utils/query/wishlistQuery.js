// All SQL queries for wishlist

// Add listing to wishlist
const addToWishlistQuery = `
  INSERT INTO wishlist (UserId, ListingId, AddedDate)
  VALUES (?, ?, ?)
`;

// Remove listing from wishlist
const removeFromWishlistQuery = `
  DELETE FROM wishlist WHERE UserId = ? AND ListingId = ?
`;

// Get wishlist of a user
const getWishlistByUserQuery = `
  SELECT 
    w.WishlistId, 
    w.ListingId, 
    l.Price, 
    l.Description, 
    b.BrandName, 
    m.ModelName, 
    ci.City
  FROM wishlist w
  JOIN carlistings l ON w.ListingId = l.ListingId
  JOIN carmodels m ON l.ModelId = m.ModelId
  JOIN carbrands b ON m.BrandId = b.BrandId
  JOIN cities ci ON l.CityId = ci.CityId
  WHERE w.UserId = ?
`;


module.exports = {
  addToWishlistQuery,
  removeFromWishlistQuery,
  getWishlistByUserQuery
};
