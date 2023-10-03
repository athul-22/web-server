import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import {v4 as uuidv4} from 'uuid';
import Verification from '../models/emailVerification';
import { hashString } from './index.js';


dotenv.config();

const {AUTH_EMAIL , AUTH_PASSWORD, APP_URL} = process.env;

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth:{
        user:AUTH_EMAIL,
        pass:AUTH_PASSWORD,
    },
})

export const sendVerificationEmail = async(user,res) => {
    const { _id, email , lastName } = user; 

    const token = _id+uuidv4();

    const link = APP_URL + "users/verify/"+_id + "/" + token;
    
    //mail options
    const mailOptions = {
        from: AUTH_EMAIL,
        to:email,
        subject: "Email Verification - WEBZ",

        html: `<div>
        ${lastName} <br>
        <p>Please verify your account </p><br>
        ${link}
        </div>`
    }
    try{
        const hashedToken = await hashString(token);

        const newVerifiedEmail = await Verification.create({
            userId:_id,
            token:hashedToken,
            createdAt:Date.now(),
            expiresAt:Date.now()+ 3600000,
        });

        if(newVerifiedEmail){
            transporter
                .sendMail(mailOptions)
                .then(()=>{
                    res.status(201).send({
                        success:"PENDING",
                        message:"VERIFICATION EMAIL HAS BEEEN SENT TO YOUR ACCOUT. PLS CHECK YOUR EMAIL AND CONFIRM"
                    });
                })
            }
    }
    catch(error){
        console.log(error);
        res.status(404).json({message:"Something went wrong "});
    }
}