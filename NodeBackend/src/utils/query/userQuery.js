const getAllUsersQuery = `select UserId,FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId from users where ActiveState = true order by RoleId`;
const getUserByIdQuery = `select UserId,FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId from users where UserId = ? and activeState = true`;
const updateUserQuery = `
            UPDATE users SET
                FirstName = ?,
                LastName = ?,
                Phone = ?,
                Address = ?,
                Pincode = ?,
                State = ?,
                District = ?,
                City = ?,
                ModifiedDate = ?,
                ModifiedBy = ?
            WHERE UserId = ?
        `;

 const softDeleteByIdQuery = 'Update users set ActiveState = false where UserId = ?';


module.exports = {
    getAllUsersQuery,
    getUserByIdQuery,
    updateUserQuery,
    softDeleteByIdQuery
}