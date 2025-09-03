const citizenRegisterQuery = 'insert into users (FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId,Password) values(?,?,?,?,?,?,?,?,?,?,?)';
const loginQuery = `select  UserId,FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId,ActiveState from users where Email = ? and Password = ? `;


module.exports = {citizenRegisterQuery, loginQuery};