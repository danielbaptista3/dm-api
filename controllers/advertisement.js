const ModelIndex = require('../models');
const Advertisement = ModelIndex.Advertisement;

const AdvertisementController = function() {};

//ADD
AdvertisementController.addAdvertisement = function(availabilityDate, description, large, medium, small, idCompany){
  return Advertisement.create({
    availabilityDate: availabilityDate,
    description: description,
    large: large,
    medium: medium,
    small: small,
    idCompany: idCompany
  });
};

//GET ALL
AdvertisementController.getAllAdvertisement = function(idCompany){  
  return Advertisement.findAll({
    where: {
      idCompany: idCompany
    }
  })
  .catch((err) => {
    console.error(err);
  });
};

//GET ID
AdvertisementController.getAdvertisementById = function(idCompany, idAdvertisement){
  const advertisement =  Advertisement.find({
    where: {
      idCompany: idCompany,
      idAdvertisement: idAdvertisement
    }
  })  
  .then((advertisement) => {
    console.log('Annonce trouvée');
    return advertisement;
  })
  .catch((error) => {
    console.error(err);
  });
};


//UPDATE
AdvertisementController.updateAdvertisement = function(idAdvertisement, newAvailabilityDate, newDescription, newLarge, newMedium, newSmall, idCompany) {
    const advertisement = Advertisement.find({
        where:{
            idAdvertisement: idAdvertisement,
            idCompany: idCompany
        }
    });
    
    if(advertisement === undefined){
        return;
    }
    
    if(newAvailabilityDate === undefined) {
        newAvailabilityDate = advertisement.availabilityDate;
    }

    if(newDescription === undefined) {
      newDescription = advertisement.description;
    }

    if(newLarge === undefined) {
        newLarge = advertisement.large;
    }
    
    if(newMedium === undefined) {
        newMedium = advertisement.medium;
    }

    if(newSmall === undefined) {
        newSmall = advertisement.small;
    }

    advertisement.updateAttributes({
        availabilityDate: newAvailabilityDate,
        description: newDescription,
        large: newLarge,
        medium: newMedium,
        small: newSmall
    });
    
    return advertisement;
};

//DELETE
AdvertisementController.deleteAdvertisementById = function(idAdvertisement){
  return Advertisement.destroy({
    where:{
      idCompany: idCompany,
      idAdvertisement: idAdvertisement
    }
  })
  .then(() => {
      console.log("L'annonce à été supprimée.");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = AdvertisementController;
