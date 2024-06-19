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

import { addProd, getProd, editProd, deleteProd } from '../controllers/product.controller.js';
import { upload } from '../middleware/multer.js';

router.post('/addProd', upload.single('file'),addProd);

router.get('/getProd', getProd);

router.put('/editProd/:id', upload.single('file'),editProd);

router.delete('/deleteProd/:id', deleteProd);


export {router}