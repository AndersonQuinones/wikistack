const express = require("express");
const router = express.Router();
const wikiPage = require("../views/wikipage");
const { Page } = require("../models");
const { addPage } = require("../views");
const { main } = require('../views')


router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll()
    res.send(main(pages))
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
  const [user, wasCreated] = await user.findOrCreate({
    where:{
      name: req.body.name,
      email: req.body.email
    }
  })
  const page = await Page.create(req.body);
  page.setAuthor(user)
  res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error)
  }
});

router.get("/add", async (req, res, next) => {
  try {
    res.send(addPage());
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async(req, res, next) => {
  try {
    const slugs = Page.findOne({
      where:{
        slug: req.params.slug
      }
    })
    res.send(wikiPage(slugs))
  } catch (error) {
    next(error)
  }
});

module.exports = router;
