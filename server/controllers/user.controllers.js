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

// import UserModel from '../models/user.model.js';
// import bcryptjs from 'bcryptjs';
// import sendEmail from '../config/sendEmail.js';
// import verifyEmailTemplate from '../utils/veryEmailTemplate.js';

// export async function registerUserController(req, res) {
//     try {
//         const { name, email, password } = req.body;

//         // Validate input fields
//         if (!name || !email || !password) {
//             return res.status(400).json({
//                 message: 'Please fill name, email, and password fields',
//                 error: true,
//                 success: false
//             });
//         }

//         // Check if the email already exists
//         const user = await UserModel.findOne({ email });
//         if (user) {
//             return res.status(400).json({
//                 message: 'Email already exists',
//                 error: true,
//                 success: false
//             });
//         }

//         // Hash the password
//         const salt = await bcryptjs.genSalt(10);
//         const hashPassword = await bcryptjs.hash(password, salt);

//         // Create new user payload
//         const payload = {
//             name,
//             email,
//             password: hashPassword
//         };

//         // Save the new user
//         const newUser = new UserModel(payload);
//         const savedUser = await newUser.save();

//         // Generate verification email URL
//         const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser?._id}`;

//         // Send verification email
//         sendEmail({
//             sendTo: email,
//             subject: 'Verify your email from Binkyit',
//             html: verifyEmailTemplate({
//                 name,
//                 url: verifyEmailUrl
//             })
//         });

//         // Respond with success
//         return res.status(201).json({
//             message: 'User Registered Successfully',
//             error: false,
//             success: true,
//             data: savedUser
//         });
//     } catch (error) {
//         // Catch and respond with errors
//         return res.status(500).json({
//             message: error.message || 'Internal Server Error',
//             error: true,
//             success: false
//         });
//     }
// }
