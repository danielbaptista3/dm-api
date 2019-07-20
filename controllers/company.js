const ModelIndex = require('../models');
const Company = ModelIndex.Company;

const CompanyController = function() {};

//ADD
CompanyController.addCompany = function(name, SIREN, city, street, number, zipcode, email, password){
  return Company.create({
    name: name,
    SIREN: SIREN,
    city: city,
    street: street,
    number: number,
    zipcode: zipcode,
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
    const company = Company.find({
        where:{
            idCompany: idCompany
        }
    });
    
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

    company.updateAttributes({
        name: newName,
        SIREN: newSIREN,
        city: newCity,
        street: newStreet,
        number: newNumber,
        zipCode: newZipCode,
        email: newEmail,
        password: newPassword
    });
    
    return company;
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

module.exports = CompanyController;
