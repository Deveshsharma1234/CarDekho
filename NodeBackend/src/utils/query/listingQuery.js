// Get all active listings with images
const getAllListingsQuery = `
    SELECT l.ListingId, l.UserId, m.BrandId, b.BrandName AS BrandName, 
           l.ModelId, m.ModelName, m.FuelType, m.Transmission, 
           l.RegistrationYear AS Year, l.Mileage, l.Price, l.CityId AS CityID, 
           c.City AS CityName, l.Description, l.CreatedDate, l.ModifiedDate, 
           l.ActiveStatus AS ActiveState, GROUP_CONCAT(ci.ImageURL) AS Images
    FROM carlistings l
    JOIN carmodels m ON l.ModelId = m.ModelId
    JOIN carbrands b ON m.BrandId = b.BrandId
    JOIN cities c ON l.CityId = c.CityId
    LEFT JOIN carimages ci ON l.ListingId = ci.ListingId
    WHERE l.ActiveStatus = 1
    GROUP BY l.ListingId
`;

// Get listing by ID with images
const getListingByIdQuery = `
    SELECT l.ListingId, l.UserId, m.BrandId, b.BrandName AS BrandName, 
           l.ModelId, m.ModelName, m.FuelType, m.Transmission, 
           l.RegistrationYear AS Year, l.Mileage, l.Price, l.CityId AS CityID, 
           c.City AS CityName, l.Description, l.CreatedDate, l.ModifiedDate, 
           l.ActiveStatus AS ActiveState, GROUP_CONCAT(ci.ImageURL) AS Images
    FROM carlistings l
    JOIN carmodels m ON l.ModelId = m.ModelId
    JOIN carbrands b ON m.BrandId = b.BrandId
    JOIN cities c ON l.CityId = c.CityId
    LEFT JOIN carimages ci ON l.ListingId = ci.ListingId
    WHERE l.ListingId = ? AND l.ActiveStatus = 1
    GROUP BY l.ListingId
`;

const createListingQuery = `
    INSERT INTO carlistings 
    (UserId, ModelId, RegistrationYear, Mileage, Price, CityId, Description, CreatedDate, CreatedBy, ActiveStatus) 
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, 1)
`;

// Add car images for a listing
const addCarImagesQuery = `
    INSERT INTO carimages (ListingId, ImageURL, UploadedDate) VALUES ?
`;

// Update listing 
const updateListingQuery = `
    UPDATE carlistings
    SET ModelId = ?, RegistrationYear = ?, Mileage = ?, Price = ?, CityId = ?, 
        Description = ?, ModifiedDate = NOW(), ModifiedBy = ?
    WHERE ListingId = ? AND UserId = ?
`;

// Soft delete listing
const deleteListingQuery = `
    UPDATE carlistings
    SET ActiveStatus = 0, ModifiedDate = NOW()
    WHERE ListingId = ? AND UserId = ?
`;

// Get all listings of a specific dealer/seller with images
const getListingsByDealerQuery = `
    SELECT l.ListingId, l.UserId, m.BrandId, b.BrandName AS BrandName, 
           l.ModelId, m.ModelName, m.FuelType, m.Transmission, 
           l.RegistrationYear AS Year, l.Mileage, l.Price, l.CityId AS CityID, 
           c.City AS CityName, l.Description, l.CreatedDate, l.ModifiedDate, 
           l.ActiveStatus AS ActiveState, GROUP_CONCAT(ci.ImageURL) AS Images
    FROM carlistings l
    JOIN carmodels m ON l.ModelId = m.ModelId
    JOIN carbrands b ON m.BrandId = b.BrandId
    JOIN cities c ON l.CityId = c.CityId
    LEFT JOIN carimages ci ON l.ListingId = ci.ListingId
    WHERE l.UserId = ? AND l.ActiveStatus = 1
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