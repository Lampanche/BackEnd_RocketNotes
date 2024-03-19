const {Router} = require("express")

const multer = require("multer")
const uploadConfig = require("../configs/upload")

const userRouter = Router()

const ensureAuth = require("../middlewares/ensureAuthenticated")

const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")

const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

userRouter.post('/', usersController.creat)
userRouter.put('/', ensureAuth, usersController.update)
userRouter.patch("/avatar", ensureAuth, upload.single("avatar"), userAvatarController.update)

module.exports = userRouter