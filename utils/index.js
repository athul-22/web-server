import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export const hashString = async (useValue) => {

    console.log("Token before hashing:", token);
    const hashedToken = await hashString(token);
    console.log("Hashed token:", hashedToken);
    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(useValue, salt);
    return hashedpassword;


};

export const compareString = async (userPassword, password) => {
    const isMatch = await bcrypt.compare(userPassword, password);
    return isMatch;
};

//JSON WEBTOKEN
export function createJWT(id) {
    return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
}