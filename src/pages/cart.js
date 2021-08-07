import React from 'react';
import Head from "next/head";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import {selectItems} from '../slices/basketSlice';
import CartItem from '../components/CartItem';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key);

const Cart = () => {
    const [ session, loading ] = useSession();
    const products = useSelector(selectItems);
    const total = products.reduce((acc, current) => acc += (current.price * current.qty), 0);

    let createCheckoutSession = async() => {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post("/api/create-checkout-session", {
            products: products,
            email: session.user.email
        },);

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        });
        
    };

    return (
        <div className="bg-gray-100">
            <Head>
                <title>Amazon | Cart</title>
            </Head>
            <main className="lg:flex max-w-screen-xl mx-auto">
                <div className="flex-grow m-5 shadow-lg">
                    <Image objectFit="contain" src="https://links.papareact.com/ikj" alt="cart image" height={250} width={1020} />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">{products.length === 0 ? 'Your basket is empty' : 'Shopping basket'}</h1>
                        {
                            products.map((product, index) => {
                                return <CartItem key={index} product={product} />
                            })
                        } 
                    </div>
                </div>
                <div className="flex flex-col p-10 shadow-lg bg-white">
                    {products.length > 0 && (
                        <>
                            <h2 className="font-bold">
                                Sub Total ({products.length} items):
                                <span><Currency quantity={total} currency="GBP" /></span>
                            </h2>
                            <button role="link" onClick={createCheckoutSession} disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>{session ? "Process to checkout" : "Sign in to checkout"}</button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Cart;
