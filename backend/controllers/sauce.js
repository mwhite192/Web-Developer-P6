// Description: This file contains the logic for the sauce routes
// sets up the sauce model
const Sauce = require('../models/Sauce');

// creates a new sauce
exports.createSauce = (req, res, next) => {
  // sets the url
  const url = req.protocol + '://' + req.get('host');
  // sets the sauce
  req.body.sauce = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...req.body.sauce,
    userId: req.body.sauce.userId,  
    likes: 0, 
    dislikes: 0, 
    usersLiked: [],
    usersDisliked: [],
    imageUrl: url + '/images/' + req.file.filename,
  });
  // saves the sauce
  sauce
  .save()
  .then(() => {
    res.status(201).json({
      message: 'Sauce added successfully!',
    });
  })
  .catch((error) => {
    res.status(400).json({
      error: error,
    });
  });
};

// gets all the sauces
exports.getAllSauces = (req, res, next) => {
  // finds all the sauces
  Sauce.find()
  // returns the sauces
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// gets a single sauce
exports.getOneSauce = (req, res, next) => {
  // finds the sauce by id
  Sauce.findOne({
    _id: req.params.id,
  })
  // returns the sauce
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// updates a sauce
exports.updateSauce = (req, res, next) => {
  // sets the url
  const url = req.protocol + '://' + req.get('host');
  // sets the sauce
  const sauce = new Sauce({
    _id: req.params.id,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    manufacturer: req.body.manufacturer,
    heat: req.body.heat,
  });
  // checks if there is a file
  if (req.file) {
    // sets the sauce image url
    sauce.imageUrl = url + '/images/' + req.file.filename;
  }
  // updates the sauce
  Sauce.updateOne({ _id: req.params.id }, sauce)
  // returns the sauce
    .then(() => {
      res.status(201).json({
        message: 'Sauce updated successfully!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// deletes a sauce
exports.deleteSauce = (req, res, next) => {
  // finds the sauce by id
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    // checks if the sauce exists
    if (!sauce) {
      // returns an error
      return res.status(404).json({
        error: new Error('Sauce not found!'),
      });
    }
    // checks if the user is authorized
    if (sauce.userId !== req.auth.userId) {
      return res.status(403).json({
        error: new Error('Unauthorized request!'),
      });
    }
    // deletes the sauce
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => {
        // returns the message
        res.status(200).json({
          message: 'Sauce deleted successfully!',
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};

// likes a sauce
exports.likeSauce = (req, res, next) => {
  // finds the sauce by id
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const like = req.body.like;
    switch (like) {
      // case 1: user likes the sauce
      case 1:
        // checks if the user has already liked the sauce
        if (!sauce.usersLiked.includes(req.body.userId)) {
          // adds the user to the usersLiked array
          sauce.usersLiked.push(req.body.userId);
          // increments the likes
          sauce.likes++;
          // updates the sauce
          Sauce.updateOne({ _id: req.params.id }, sauce).then(() => {
            // returns the message
            res.status(201).json({
              message: "Sauce liked successfully!",
            });
          });
        } else {
          res.status(200).json({
            message: "You already liked this sauce!",
          });
        }
        break;
        // case 0: user unlikes the sauce
      case 0:
          // checks if the user has already liked the sauce
          if (sauce.usersLiked.includes(req.body.userId)) {
            // removes the user from the usersLiked array
            sauce.usersLiked.pull(req.body.userId);
            // decrements the likes
            sauce.likes--;
            // updates the sauce
            Sauce.updateOne({ _id: req.params.id }, sauce).then(() => {
              // returns the message
              res.status(201).json({
                message: "Sauce unliked successfully!",
              });
            });
          } else {
            res.status(200).json({
              message: "You already unliked this sauce!",
            });
          }
          break;
      // case -1: user dislikes the sauce
      case -1:
        // checks if the user has already disliked the sauce
        if (!sauce.usersDisliked.includes(req.body.userId)) {
          // adds the user to the usersDisliked array
          sauce.usersDisliked.push(req.body.userId);
          // increments the dislikes
          sauce.dislikes++;
          // updates the sauce
          Sauce.updateOne({ _id: req.params.id }, sauce).then(() => {
            // returns the message
            res.status(201).json({
              message: "Sauce disliked successfully!",
            });
          });
        } else {
          res.status(200).json({
            message: "You already disliked this sauce!",
          });
        }
        break;
    }
  });
};


    