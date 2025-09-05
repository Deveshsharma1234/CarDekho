const authAndAuthorizeQuery = `
  SELECT 
    UserId,
    FirstName,
    LastName,
    Email,
    Phone,
    Address,
    Pincode,
    State,
    District,
    City,
    RoleId,
    ProfileImage
  FROM users
  WHERE UserId = ? AND RoleId = ?
`;


module.exports = {
    authAndAuthorizeQuery
}