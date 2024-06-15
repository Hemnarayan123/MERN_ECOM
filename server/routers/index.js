import express from 'express'


const router = express.Router();
import { ForgetPassword, userLogin, userRegister, ResetPassword, profile } from '../controllers/user.controllers.js';

router.post("/register", userRegister)
router.post("/login", userLogin)
router.post("/forget_password", ForgetPassword)
router.post("/reset_password/:id/:token",ResetPassword)
router.get('/profile', profile);



import { getAllUsers } from '../controllers/admin.controller.js';
import {auth, authorize} from '../middleware/authToken.js'

router.get('/Allusers',auth, authorize(['admin']), getAllUsers);

//.........................................................................................................

export {router}