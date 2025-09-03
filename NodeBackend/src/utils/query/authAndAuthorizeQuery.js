const authAndAuthorizeQuery = `select UserId,FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId from users where UserId = ? and RoleId = ?`;

module.exports = {
    authAndAuthorizeQuery
}