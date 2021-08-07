import { buffer } from "micro";
import * as admin from 'firebase-admin';

const serviceAccount = require("../../../permission.json");
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
}) : admin.app();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpoint = process.env.STRIPE_SIGNING_SECRET;

const order = async (session) => {
    return app.firestore().collection("users").doc(session.metadata.email).collection("orders").doc(session.id).set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),      
    }).then(() => {
        console.log(`Success: Order ${session.id} had been stored into database`)
    }).catch((error) => console.log(error.message));
};

export default async (req, res) => {
    if(req.method === "POST") {
        const reqBuffer = await buffer(req);
        const payload = reqBuffer.toString();
        const signature = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(payload, signature, endpoint);  
        } catch (error) {
            console.log("Errors from webhooks: " + error.message);
            return res.status(400).send(`Webhooks error: ${error.message}`);
        };

        if(event.type === "checkout.session.completed") {
            const session = event.data.object;
            return order(session)
                    .then(() => {
                        res.status(200);
                    })
                    .catch((err) => {
                        return res.status(400).send(`Webhooks error: ${err.message}`);
                    });
        };
    };
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
};