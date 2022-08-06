const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});
tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  try {
    // use our method to get posts by tag name from the db
    const allTags = await getPostsByTagName(tagName);

    const tags = allTags.filter((tag) => {
      if (tag.active) {
        return true;
      }
      if (req.user && post.author.id === req.user.id) {
        return true;
      }
      return false;
    });

    res.send({ posts: tags });
    // send out an object to the client { posts: // the posts }
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    next({ name, message });
  }
});

module.exports = tagsRouter;
