const ModelIndex = require('../models');
const User = ModelIndex.User;

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
  const user = User.find({
    where:{
      idUser: idUser
    }
  });

  if(newFirstName === undefined) {
    newFirstName = advertisement.firstName;
}

if(newLastName === undefined) {
    newLastName = advertisement.lastName;
}

if(newZipCode === undefined) {
    newZipCode = advertisement.zipCode;
}

if(newCity === undefined) {
    newCity = advertisement.city;
}

if(newPassword === undefined) {
    newPassword = advertisement.password;
}

if(newEmail === undefined) {
    newEmail = advertisement.email;
}

  user.updateAttributes({
    firstName: newFirstName,
    lastName: newLastName,
    zipCode: newZipCode,
    city: newCity,
    email: newEmail,
    password: newPassword
  });

  return user;
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
