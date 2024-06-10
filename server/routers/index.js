import express from 'express'


const router = express.Router();
import { ForgetPassword, userLogin, userRegister, ResetPassword, profile } from '../controllers/user.controllers.js';

router.post("/register", userRegister)
router.post("/login", userLogin)
router.post("/forget_password", ForgetPassword)
router.post("/reset_password/:id/:token",ResetPassword)
router.get('/profile', profile);



//.........................................................................................................

export {router}