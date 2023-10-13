import Users from "../models/userModel.js";
import { comparePassword, createJWT, hashString } from "../utils/index.js";

export const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    //VALIDATE FIELDS
    if (!(firstName || lastName || email || password)) {
        next("Provide required fields!");
        return;
    }

    try {
        //CHEKCING WEATHER EMAIL ID ALREADY REGSITERED OR NOT
        const userExist = await Users.findOne({ email });

        if (userExist) {
            next("Email address already exists");
            return
        }

        const hashedPassword = await hashString(password);

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        //SEND VERIFICATION EMAIL TO USER
        sendVerificationEmail(user, res);

    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
}


export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        //VALIDATION
        if (!(email || password)) {
            next("Provide required fields!");
            return;
        }
        //FIND USER BY EMAIL 
        const user = await Users.findOne({ email }).select("+password").populate({
            path: "friends",
            select: "firstName lastName email location profileUrl password",
        });

        //USER EXIST OR NOT

        if (!user) {
            next("Invalid email or password");
            return;
        }

        if (!user?.verified) {
            next("Please verify your email address");
            return;
        }

        const isMatch = await comparePassword(password, user?.password)

        if(!isMatch){
            next("Invalid email or password");
            return;
        }

        user.password = undefined;
        const token = createJWT(user?._id);

        res.status(201).json({
            success:true,
            message:"Login successfully",
            user,
            token,
        })

    }
    catch (error) {
        console.log(error);
    }
}
