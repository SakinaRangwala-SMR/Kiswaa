import jwt from 'jsonwebtoken'
const isAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies

        if(!token){
            return res.status(400).json({message:"user doesnt have token"})
        }
        let verifyToken = jwt.verify(token,process.env.JWT_SECRET)

            if(!verifyToken){
                return res.status(400).json({message:"user doesnt have a valid token"})
            }
            req.userId = verifyToken.userId
            next()

    } catch (error) {
        console.log("isAuth error", error);
    return res.status(500).json({ message: `isAuth error: ${error.message}` });
    }
}
export default isAuth