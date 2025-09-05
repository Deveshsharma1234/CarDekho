// Get all active listings with images
const getAllListingsQuery = `
    SELECT l.ListingId, l.SellerId, l.BrandId, b.Brand AS BrandName, 
           l.ModelId, m.Model AS ModelName, l.Year, l.Mileage, 
           l.FuelType, l.Transmission, l.Price, l.CityID, c.City AS CityName, 
           l.Description, l.CreatedDate, l.ModifiedDate, l.ActiveState,
           GROUP_CONCAT(ci.ImageUrl) AS Images
    FROM carlistings l
    JOIN carbrands b ON l.BrandId = b.BrandId
    JOIN carmodels m ON l.ModelId = m.ModelId
    JOIN cities c ON l.CityID = c.CityID
    LEFT JOIN carimages ci ON l.ListingId = ci.ListingId
    WHERE l.ActiveState = 1
    GROUP BY l.ListingId
`;

// Get listing by ID with images
const getListingByIdQuery = `
    SELECT l.ListingId, l.SellerId, l.BrandId, b.Brand AS BrandName, 
           l.ModelId, m.Model AS ModelName, l.Year, l.Mileage, 
           l.FuelType, l.Transmission, l.Price, l.CityID, c.City AS CityName, 
           l.Description, l.CreatedDate, l.ModifiedDate, l.ActiveState,
           GROUP_CONCAT(ci.ImageUrl) AS Images
    FROM carlistings l
    JOIN carbrands b ON l.BrandId = b.BrandId
    JOIN carmodels m ON l.ModelId = m.ModelId
    JOIN cities c ON l.CityID = c.CityID
    LEFT JOIN carimages ci ON l.ListingId = ci.ListingId
    WHERE l.ListingId = ? AND l.ActiveState = 1
    GROUP BY l.ListingId
`;

// Create new listing 
const createListingQuery = `
    INSERT INTO carlistings 
    (SellerId, BrandId, ModelId, Year, Mileage, FuelType, Transmission, Price, CityID, Description, CreatedDate, CreatedBy, ActiveState) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

// Add car images for a listing
const addCarImagesQuery = `
    INSERT INTO carimages (ListingId, ImageUrl, CreatedDate) VALUES ?
`;

// Update listing 
const updateListingQuery = `
    UPDATE carlistings
    SET BrandId = ?, ModelId = ?, Year = ?, Mileage = ?, FuelType = ?, Transmission = ?, Price = ?, CityID = ?, Description = ?, 
        ModifiedDate = ?, ModifiedBy = ?
    WHERE ListingId = ? AND SellerId = ?
`;

// Soft delete listing
const deleteListingQuery = `
    UPDATE carlistings
    SET ActiveState = 0, ModifiedDate = NOW()
    WHERE ListingId = ? AND SellerId = ?
`;

// Get all listings of a specific dealer/seller with images
const getListingsByDealerQuery = `
    SELECT l.ListingId, l.SellerId, l.BrandId, b.Brand AS BrandName, 
           l.ModelId, m.Model AS ModelName, l.Year, l.Mileage, 
           l.FuelType, l.Transmission, l.Price, l.CityID, c.City AS CityName, 
           l.Description, l.CreatedDate, l.ModifiedDate, l.ActiveState,
           GROUP_CONCAT(ci.ImageUrl) AS Images
    FROM carlistings l
    JOIN carbrands b ON l.BrandId = b.BrandId
    JOIN carmodels m ON l.ModelId = m.ModelId
    JOIN cities c ON l.CityID = c.CityID
    LEFT JOIN carimages ci ON l.ListingId = ci.ListingId
    WHERE l.SellerId = ? AND l.ActiveState = 1
    GROUP BY l.ListingId
`;

module.exports = {
    getAllListingsQuery,
    getListingByIdQuery,
    createListingQuery,
    addCarImagesQuery,
    updateListingQuery,
    deleteListingQuery,
    getListingsByDealerQuery
};
