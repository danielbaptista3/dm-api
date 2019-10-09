const ModelIndex = require('../models');
const User = ModelIndex.User;
 const PasswordHistoryController = require('./passwordHistory');

const UserController = function() {};

//ADD
UserController.addUser = function(firstName, lastName, zipCode, city, email, password){
  return User.create({
    firstName: firstName,
    lastName: lastName,
    zipCode: zipCode,
    city: city,
    email: email,
    password: password
  });
};

//DELETE
UserController.deleteUser = function(idUser){
  return User.destroy({
    where:{
      idUser: idUser
    }
  })
  .then(() => {
      console.log("L'utilisateur à été supprimé.");
    })
    .catch((err) => {
      console.error(err);
    })
};

//UPDATE
UserController.updateUser = function(idUser, newFirstName, newLastName, newZipCode, newCity, newEmail, newPassword) {

  return User.findById(idUser)
  .then((user)=>{

    if(user === undefined){
      return;
  }

    if(newFirstName === undefined) {
      newFirstName = user.firstName;
    }

    if(newLastName === undefined) {
        newLastName = user.lastName;
    }

    if(newZipCode === undefined) {
        newZipCode = user.zipCode;
    }

    if(newCity === undefined) {
        newCity = user.city;
    }

    if(newPassword === undefined) {
        newPassword = user.password;
    }
    else
    {
       
        PasswordHistoryController.addUserPasswordHistory(new Date(), user.password, idUser);
    }

    if(newEmail === undefined) {
        newEmail = user.email;
    }

   return user.updateAttributes({
    firstName: newFirstName,
    lastName: newLastName,
    zipCode: newZipCode,
    city: newCity,
    email: newEmail,
    password: newPassword
  });
});
};

//GET BY ID
UserController.getUserById = function(idUser){
  return User.find({
    where: {
      idUser: idUser
    }
  })
  .then((user) => {
    console.log('Utilisateur trouvé');
    return user;
  })
  .catch((error) => {
    console.error(err);
  });
};

//GET ALL
UserController.getAllUser = function(){
  return User.findAll()
  .catch((err) => {
    console.error(err);
  });
};

//LOGIN
UserController.login = function(email, password){
  return User.find({
    where : {
      email : email,
      password : password
    }
  })
  .then((user)=>{
    if(user){
      return user;
    }
    else{
      return null;
    }
  });
};

module.exports = UserController;
