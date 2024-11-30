// import { Router } from 'express'
// import { loginController, logoutController, registerUserController, uploadAvatar, verifyEmailController } from '../controllers/user.controllers.js'
// import auth from "../middleware/auth.js"

// const userRouter = Router()

// userRouter.post('/register', registerUserController)
// userRouter.post('/verify-email', verifyEmailController)
// userRouter.post('/login', loginController)
// userRouter.get('/logout', logoutController)
// userRouter.put("/upload", auth, upload.single("avatar"), uploadAvatar)
// export default userRouter

import { Router } from 'express';
import multer from 'multer'; // Import multer
import { 
    
    forgotPasswordController,
    loginController, 
    logoutController, 
    registerUserController,  
    updateUserDetails,  
    uploadAvatar, 
    verifyEmailController 
} from '../controllers/user.controllers.js';
import auth from "../middleware/auth.js";
import upload from '../middleware/multer.js';

const userRouter = Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginController);
userRouter.get('/logout', logoutController);
userRouter.put('/update-details',auth, updateUserDetails);
userRouter.put('/forgotPassword',auth, forgotPasswordController);

// Add multer middleware to handle avatar uploads
userRouter.put('/upload', auth, upload.single('avatar'), uploadAvatar);

export default userRouter;
