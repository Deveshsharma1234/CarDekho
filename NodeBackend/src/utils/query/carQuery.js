// Car Brand & Model Queries
const getAllBrandsQuery = `SELECT * FROM carbrands ORDER BY BrandName ASC`;
const getModelsByBrandIdQuery = `SELECT * FROM carmodels WHERE brandId = ? ORDER BY ModelName ASC`;
const createBrandQuery = `INSERT INTO carbrands (BrandName) VALUES (?)`;
// Insert Model Query
const createModelQuery = `
  INSERT INTO carmodels 
  (BrandId, ModelName, FuelType, Transmission, BodyType, CreatedDate) 
  VALUES (?, ?, ?, ?, ?, NOW())
`;

module.exports = {
  getAllBrandsQuery,
  getModelsByBrandIdQuery,
  createBrandQuery,
  createModelQuery,
};
