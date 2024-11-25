import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generatedRefreshToken = async (user) => {
    const token = await jwt.sign({ id: user },
        process.env.SECRET_KEY_REFRESH_TOKEN, 
        {expiresIn : '30d'} 
    )
    
    const { updateRefreshToken } = await UserModel.updateOne(
        { _id: user },
        {
            refresh_token : token
        }
    )

    return token
}

export default generatedRefreshToken;