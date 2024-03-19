const {Router} = require("express")

const notesRoutes = Router()

const ensureAuth = require("../middlewares/ensureAuthenticated")

const NotesController = require("../controllers/NotesController")

const notesController = new NotesController()

notesRoutes.use(ensureAuth)

notesRoutes.post("/", notesController.create)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)
notesRoutes.get("/", notesController.index)

module.exports = notesRoutes