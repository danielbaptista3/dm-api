const ModelIndex = require('../models');
const Removal = ModelIndex.Removal;

const RemovalController = function() {};

//ADD
RemovalController.addRemoval = function(date, address, arrivalAddress, description){
  return Removal.create({
    date: date,
    address: address,
    arrivalAddress: arrivalAddress,
    description: description
  });
};

//GET ALL
RemovalController.getAllRemoval = function(){
  return Removal.findAll()
  .catch((err) => {
    console.error(err);
  });
};

//GET ID
RemovalController.getRemovalById = function(idRemoval){
  return Removal.find({
    where: {
      idRemoval: idRemoval
    }
  })
  .then((removal) => {
    console.log('Déménagement trouvé');
    return removal;
  })
  .catch((error) => {
    console.error(err);
  });
};


//UPDATE
RemovalController.updateRemoval = function(idRemoval, newDate, newAddress, newArrivalAddress, newDescription) {
  return Removal.findById(idRemoval)
  .then((removal)=>{

    
    if(removal === undefined){
        return;
    }
    
    if(newDate === undefined) {
        newDate = removal.date;
    }
    
    if(newAddress === undefined) {
        newAddress = removal.address;
    }
    
    if(newArrivalAddress === undefined) {
        newArrivalAddress = removal.arrivalAddress;
    }

    if(newDescription === undefined) {
      newDescription = removal.description;
  }
    
    return removal.updateAttributes({
        date: newDate,
        address: newAddress,
        arrivalAddress: newArrivalAddress,
        description: newDescription
      });
    });
};

//DELETE
RemovalController.deleteRemovalById = function(idRemoval){
  return Removal.destroy({
    where:{
      idRemoval: idRemoval
    }
  })
  .then(() => {
      console.log("Le déménagement à été supprimé.");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = RemovalController;
