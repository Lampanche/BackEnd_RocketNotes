const {Router} = require("express")

const tagsRoutes = Router()

const ensureAuth = require("../middlewares/ensureAuthenticated")

const TagsController = require("../controllers/TagsController")

const tagsController = new TagsController()

tagsRoutes.get("/", ensureAuth, tagsController.index)


module.exports = tagsRoutes