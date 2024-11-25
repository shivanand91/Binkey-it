import jwt from "jsonwebtoken"
const generateAcccessToke = async(user) => {
    const token = await jwt.sign({ id: user},
        process.env.SECRET_KEY_ACCESS_TOKEN, 
        {expiresIn : '5h'} 
    )

    return token
}

export default generateAcccessToke
