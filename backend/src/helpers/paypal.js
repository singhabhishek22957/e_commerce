import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";
dotenv.config();

console.log("process.env.PAYPAL_CLIENT_ID", process.env.PAYPAL_CLIENT_ID);
console.log(" from paypal.js  process.env.PAYPAL_CLIENT_SECRET", process.env.PAYPAL_CLIENT_SECRET);

paypal.configure({
    mode: process.env.PAYPAL_MODE || 'sandbox', // 'sandbox' or 'live'
    client_id: process.env.PAYPAL_CLIENT_ID ,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
});


export default paypal