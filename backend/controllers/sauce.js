const Sauce = require('../models/Sauce');


exports.createSauce = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
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


exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};


exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};


exports.updateSauce = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const sauce = new Sauce({
    _id: req.params.id,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    manufacturer: req.body.manufacturer,
    heat: req.body.heat,
  });
  if (req.file) {
    sauce.imageUrl = url + '/images/' + req.file.filename;
  }
  Sauce.updateOne({ _id: req.params.id }, sauce)
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


exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({
        error: new Error('Sauce not found!'),
      });
    }
    if (sauce.userId !== req.auth.userId) {
      return res.status(403).json({
        error: new Error('Unauthorized request!'),
      });
    }
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => {
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

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const like = req.body.like;
    switch (like) {
      case 1:
        if (!sauce.usersLiked.includes(req.body.userId)) {
          sauce.usersLiked.push(req.body.userId);
          sauce.likes++;
          Sauce.updateOne({ _id: req.params.id }, sauce).then(() => {
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
      case 0:
          if (sauce.usersLiked.includes(req.body.userId)) {
            sauce.usersLiked.pull(req.body.userId);
            sauce.likes--;
            // sauce.usersDisliked.pull(req.body.userId);
            // sauce.dislikes--;
            Sauce.updateOne({ _id: req.params.id }, sauce).then(() => {
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
      case -1:
        if (!sauce.usersDisliked.includes(req.body.userId)) {
          sauce.usersDisliked.push(req.body.userId);
          sauce.dislikes++;
          Sauce.updateOne({ _id: req.params.id }, sauce).then(() => {
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


    