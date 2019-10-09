const ModelIndex = require('../models');
const Comment = ModelIndex.Comment;

const CommentController = function() {};

//ADD
CommentController.addComment = function(date, subject, message, idUser, idRemoval){
  return Comment.create({
    date: date,
    subject: subject,
    message: message,
    idUser: idUser,
    idRemoval: idRemoval
  });
};

//GET ALL
CommentController.getAllComment = function(){
  return Comment.findAll()
  .catch((err) => {
    console.error(err);
  });
};

//GET ID
CommentController.getRemovalById = function(idComment){
  return Comment.find({
    where: {
      idComment: idComment
    }
  })
  .then((comment) => {
    console.log('Commentaire trouvé');
    return comment;
  })
  .catch((error) => {
    console.error(err);
  });
};


//UPDATE
CommentController.updateComment = function(idComment, newSubject, newMessage) {
  return Comment.findById(idComment)
  .then((comment)=>{


    if(comment === undefined){
        return;
    }

    if(newSubject === undefined) {
        newSubject = comment.subject;
    }

    if(newMessage === undefined) {
        newMessage = comment.message;
    }

    return comment.updateAttributes({
        subject: newSubject,
        message: newMessage,
        edited: true
      });
    });
};

//DELETE
CommentController.deleteCommentById = function(idComment){
  return Comment.destroy({
    where:{
      idComment: idComment
    }
  })
  .then(() => {
      console.log("Le commentaire à été supprimé.");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = CommentController;
