import { response } from 'express';
import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/veryEmailTemplate.js'
import generateAcccessToke from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';
import forgotPassword from '../utils/forgotPasswordTemplate.js';
import generateOtp from '../utils/generateOtp.js';

export async function registerUserController(req, res) {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please fill name, email and password fields',
                error: true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if (user) {
            return res.json({
                message: "Already email exist",
                error: true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;


        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from Binkyit",
            html: verifyEmailTemplate({
                name,
                url : verifyEmailUrl
            })
        })

        return res.json({
            message: "User Registered Successfully",
            error: false,
            success: true,
            data : save
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success : false
        })
    }
}

export async function verifyEmailController(req, res) {
    try {
        const { code } = req.body
        
        const user = await UserModel.findOne({ _id: code })
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success : false
            })
        }

        const updateUser = await UserModel.updateOne({ _id: code }, {
            verify_email : true
        })

        return res.json({
            message: "Email verified successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success : false
        })
    }
}

// login controller
export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                message: "Email and password are required",
                error: true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not register",
                error: true,
                success: false
            });
        }

        if (user.status !== "active") {
            return res.status(400).json({
                message: "Your account is not active",
                error: true,
                success: false
            });
        }

        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Invalid password",
                error: true,
                success: false
            });
        }

        const accessToken = await generateAcccessToke(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        res.cookie("accessToken", accessToken, cookiesOption);
        res.cookie("refreshToken", refreshToken, cookiesOption);

        return res.json({
            message: "Login Successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// logout controller

export async function logoutController(req, res) {
    try {

        const userId = req.userId

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        }

        res.clearCookie("accessToken", cookieOption)
        res.clearCookie("refreshToken", cookieOption)

        const removeRefreshtoken = await UserModel.findByIdAndUpdate(userId, {
            refresh_token: " "
        })

        return res.json({
            message: "Logout Successfully",
            error: false,
            success : true
        })

    } catch(error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// upload avatar
export async function uploadAvatar(req, res) {
    try {
        
        const userId = req.userId
        const image = req.file
        const upload = await uploadImageCloudinary(image)
        
        const upadateUser = await UserModel.findByIdAndUpdate(userId, {
            avater: upload.url
        })

        return res.json({
            message: "upload profile",
            data: {
                _id: userId,
                avatar: upload.url
            }
        })
        

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//update user details

export async function updateUserDetails(req, res){
    try {
        const userId = req.userId
        const { name, email, password, mobile } = req.body
        
        let hashPassword = ""

        if (password) {
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password, salt)
        }

        const upadateUser = await UserModel.findByIdAndUpdate(userId, {
            ...(name && {name: name}),
            ...(email && {email: email}),
            ...(mobile && {mobile: mobile}),
            ...(password && {password: hashPassword}),
        })
        
        return res.json({
            message: "update user details",
            error: false,
            success: false,
            data: upadateUser
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// forgot password

export async function forgotPasswordController(req, res) { 
    try {
        
        const { email } = req.body
        
        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                message: "user not found",
                error: true,
                success : false
            })
        }

        const otp = generateOtp()
        const expireTime = new Date() + 60 * 60 * 1000 // 1 hour

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expire: new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo: email,
            subject: "Forgot Password from binkeit",
            html: forgotPassword({
                name: user.name,
                otp : otp
            })
        })

        return res.json({
            message: "otp sent to your email",
            error: false,
            success: true,
            data: {
                otp: otp,
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
