import jwt from "jsonwebtoken";

export const verifyToken = async(req, res,next ) => {
    const authorization = req.headers.token;
    if (authorization) {
        const token = authorization.split(" ")[1];
        if (token) {
            jwt.verify(token, process.env.JWT_SEC, (err, user) => {
                
                err && res.status(403).json("Invalid Token");
                req.user = user;
                next();
            });
            } else {
            res.status(498).json("Invalid Token");
        }
    }
};

export const verifyTokenAndAdmin = async(req, res,next ) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
    });
}