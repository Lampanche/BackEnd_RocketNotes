const {Router} = require("express")

const routes = Router()

const usersRouter = require("./user.routes.js")
const notesRouter = require("./note.routes.js")
const tagsRouter = require("./tags.routes.js")
const sessionsRouter = require("./session.routes.js")

routes.use("/users", usersRouter)
routes.use("/notes", notesRouter)
routes.use("/tags", tagsRouter)
routes.use("/session", sessionsRouter)

module.exports = routes