const ModelIndex = require('../models');
const Company = ModelIndex.Company;
const PasswordHistoryController = require('./passwordHistory');
const CompanyController = function() {};

//ADD
CompanyController.addCompany = function(name, SIREN, city, street, number, zipCode, email, password){
  return Company.create({
    name: name,
    SIREN: SIREN,
    city: city,
    street: street,
    number: number,
    zipCode: zipCode,
    email: email,
    password: password
  });
};

//GET ALL
CompanyController.getAllCompany = function(){
  return Company.findAll()
  .catch((err) => {
    console.error(err);
  });
};

//GET ID
CompanyController.getCompanyById = function(idCompany){
  return Company.find({
    where: {
      idCompany: idCompany
    }
  })
  .then((company) => {
    console.log('Déménagement trouvé');
    return company;
  })
  .catch((error) => {
    console.error(err);
  });
};


//UPDATE
CompanyController.updateCompany = function(idCompany, newName, newSIREN, newCity, newStreet, newNumber, newZipCode, newEmail, newPassword) {
  
  return Company.findById(idCompany)
  .then((company)=>{

      if(company === undefined){
        return;
    }
    
    if(newName === undefined) {
        newName = company.name;
    }
    
    if(newSIREN === undefined) {
        newSIREN = company.SIREN;
    }
    
    if(newCity === undefined) {
        newCity = company.city;
    }
    
    if(newStreet === undefined) {
        newStreet = company.street;
    }

    if(newNumber === undefined) {
        newNumber = company.number;
    }

    if(newZipCode === undefined) {
        newZipCode = company.zipCode;
    }

    if(newEmail === undefined) {
        newEmail = company.email;
    }

    if(newPassword === undefined) {
      newPassword = company.password;
    }
    else
    {
        PasswordHistoryController.addCompanyPasswordHistory(new Date(), company.password, company.idCompany);
    }

    return company.updateAttributes({
      name: newName,
      SIREN: newSIREN,
      city: newCity,
      street: newStreet,
      number: newNumber,
      zipCode: newZipCode,
      email: newEmail,
      password: newPassword
    });
  });
};

//DELETE
CompanyController.deleteCompanyById = function(idCompany){
  return Company.destroy({
    where:{
      idCompany: idCompany
    }
  })
  .then(() => {
      console.log("Le déménagement à été supprimé.");
    })
    .catch((err) => {
      console.error(err);
    });
};

//LOGIN
CompanyController.login = function(email, password){
  return Company.find({
    where : {
      email : email,
      password : password
    }
  })
  .then((company)=>{
    if(company){
      return company;
    }
    else{
      return null;
    }
  });
};

module.exports = CompanyController;
