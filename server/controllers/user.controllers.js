import { response } from 'express';
import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/veryEmailTemplate.js'

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

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from Binkyit",
            html: verifyEmailTemplate({
                name,
                url : verifyEmailUrl

            })
        })

        return response.json({
            message: "User Registered Successfully",
            error: false,
            success: true,
            data : save
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success : false
        })
    }
}