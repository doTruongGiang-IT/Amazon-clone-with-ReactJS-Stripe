import React from 'react';
import Head from "next/head";
import {getSession, useSession} from 'next-auth/client';
import data from '../../firebase';
import moment from 'moment';
import Order from '../components/Order';

export async function getServerSideProps(context) {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const session = await getSession(context);
    if(!session) {
        return {
            props: {}
        }
    };
    const stripeOrders = await data
                                .collection("users")
                                .doc(session.user.email)
                                .collection("orders")
                                .orderBy("timestamp", "desc")
                                .get();

    const orders = await Promise.all(
        stripeOrders.docs.map(async(order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {limit: 100})
            ).data,    
        }))
    );      

    return {
        props: {
            orders: orders
        }
    }
};

const Orders = ({orders}) => {
    const [session, loading] = useSession();

    return (
        <div>
            <Head>
                <title>Amazon | Orders</title>
            </Head>
            <main className="max-w-screen-lg mx-auto py-5">
                <h1 className="text-3xl xs:ml-3 sm:ml-3 lg:ml-0">Your orders</h1>
                <hr className="text-yellow-400 my-2 xs:mx-3 sm:mx-3 lg:mx-0" />
                {
                    session ? <p className="xs:ml-3 sm:ml-3 lg:ml-0">{orders.length} order(s)</p> : <p>Please Sign in to see your orders</p>
                }
                <div className="mt-5 space-y-4">
                    {
                        orders?.map((order) => {
                            return <Order key={order.id} order={order} />
                        })
                    }
                </div>
            </main>
        </div>
    )
}

export default Orders;
