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
import { 
    
    forgotPasswordController,
    loginController, 
    logoutController, 
    refreshTokenController, 
    registerUserController,  
    resetPasswordController,  
    updateUserDetails,  
    uploadAvatar, 
    verifyEmailController, 
    verifyForgotPasswordOtp
} from '../controllers/user.controllers.js';
import auth from "../middleware/auth.js";
import upload from '../middleware/multer.js';

const userRouter = Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginController);
userRouter.get('/logout', logoutController);
userRouter.put('/update-details',auth, updateUserDetails);
userRouter.put('/forgotPassword', forgotPasswordController);
userRouter.put('/verifyforgotPassword', verifyForgotPasswordOtp);
userRouter.put('/resetPassword', resetPasswordController);
userRouter.post('/refresh-token', refreshTokenController);

// Add multer middleware to handle avatar uploads
userRouter.put('/upload', auth, upload.single('avatar'), uploadAvatar);

export default userRouter;
