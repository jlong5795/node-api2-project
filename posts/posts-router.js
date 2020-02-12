const express = require('express');
const Posts = require('../data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'The posts information could not be retrieved.'});
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Posts.findById(id)
        .then(post => {
            if (post.length) {
                res.status(200).json(post);
            } else {
                res.status(404).json({errorMessage: 'The post with the specified ID does not exist.'});
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'The post information could not be retrieved.'});
        });
});

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;

    Posts.findPostComments(id)
        .then(comment => {
            if (comment.length === 0) {
                res.status(404).json({errorMessage: 'The post with the specified ID does not exist.'});
            } else {
                 res.status(200).json(comment);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({errorMessage: 'The comments information could not be retrieved.'});
        });
});

router.post('/', (req, res) => {
    const newPost = {title: req.body.title, contents: req.body.contents};
    console.log(newPost);

    if (!newPost.title || !newPost.contents) {
        res.status(400).json({errorMessage: 'Please provide title and contents for the post'});
    } else {
        Posts.insert(newPost)
            .then(postID => {
                res.status(201).json(newPost);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({errorMessage: 'There was an error while saving the post to the database.'});
            });
    };
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const comment = {...req.body, post_id: id};
  if (!text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    Posts.findById(id)
      .then(post => {
        if (!post.length) {
          res
            .status(404)
            .json({
              message: "The post with the specified ID does not exist."
            });
        } else {
          Posts.insertComment(comment)
            .then(comment => {
              res.status(201).json(comment);
            })
            .catch(error => {
              res
                .status(500)
                .json({
                  error:
                    "There was an error while saving the comment to the database"
                });
            });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Posts.remove(id)
        .then(records => {
            if (records.length > 0) {
                res.status(200).json(records);
            } else {
                res.status(404).json({errorMessage: 'The post with the specified ID does not exist.'});
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'The post could not be removed.'});
        });
});

router.put('/:id', (req, res) => {
    const newPost = {title: req.body.title, contents: req.body.contents};
    const { id } = req.params;

    if (!newPost.title || !newPost.contents) {
        res.status(400).json({errorMessage: 'Please provide title and contents for the post.'});
    } else {
        Posts.findById(id)
            .then(post => {
                if (!post.length) {
                res
                    .status(404)
                    .json({
                    message: "The post with the specified ID does not exist."
                    });
                } else {
                    Posts.update(id, newPost)
                    .then(postID => {
                        res.status(201).json(newPost);
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({errorMessage: 'There was an error while saving the post to the database.'});
                    });
                }
            });
    }
});


module.exports = router;