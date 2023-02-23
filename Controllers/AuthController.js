import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//login route

export const loginUser = async(req, res) => {
     
    const strength = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, strength);
    try {
        const user = await UserModel.findOne({username: req.body.username});
        if (user) {
            const validate = await bcrypt.compare(req.body.password, user.password);
            if (validate) {
                const { password, ...otherDetails } = user._doc;
                const token = await jwt.sign({
                    user: user.username,
                    isAdmin: user.isAdmin
                }, process.env.JWT_SEC, { expiresIn: "1day" });
                res.status(200).json({ ...otherDetails, token });
            } else {
               res.status(401).json("Wrong Credentials"); 
            }
        } else {
            res.status(404).json("Wrong Credentials");
        }
    } catch (err) {
        res.status(500).json(err.message);
    }

    
}
export const registerUser = async(req, res) => {
    const { password, username } = req.body;
    
    const strength = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, strength);
    const newUser = await new UserModel({ username: username, password: hashPass });
    try {
        const savedUser = await newUser.save();
        const { password, ...otherDetails } = savedUser;
        const token = await jwt.sign({
            user: otherDetails.username,
            isAdmin: otherDetails.isAdmin
        }, process.env.JWT_SEC, { expiresIn: "1day" });
        res.status(200).json({...otherDetails, token});
    } catch (err) {
        res.status(500).json(err);
    }
}

