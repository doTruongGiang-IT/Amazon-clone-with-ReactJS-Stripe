import React from 'react';
import Head from "next/head";
import Image from 'next/image';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { addToBasket } from '../../slices/basketSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const MAX_RATING = 5;
const MIN_RATING = 1;

export async function getStaticPaths() {
    const productList = await fetch("https://fakestoreapi.com/products")
                                .then(res => res.json())
                                .catch(err => console.log(err.message));
    
    const paths = productList.map((product) => ({
        params: { id: product.id.toString() },
    }));

    return {paths, fallback: false};
};

export async function getStaticProps({params}) {
    const productDetails = await fetch(`https://fakestoreapi.com/products/${params.id}`)
                                .then(res => res.json())
                                .catch(err => console.log(err.message));

    return {
        props: {
            details: productDetails
        }
    }
};

const Details = ({details}) => {
    const dispatch = useDispatch();
    const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
    const [prime] = useState(Math.random() < 0.5);

    const addItemToBasket = () => {
        dispatch(addToBasket({...details, rating, prime, qty: 1}));
    };

    return (
        <div>
            <Head>
                <title>Amazon | Details</title>
            </Head>
            <main className="max-w-screen-xl mx-auto">
               <div className="lg:flex justify-start flex-grow m-5 p-5 space-y-10">
                    <div className="mr-10">
                        <Image objectFit="contain" src={details.image} alt="product image" height={350} width={350} />
                    </div>
                    <div className="mx-5 flex flex-col">
                        <p className="text-xl font-bold">{details.title}</p>
                        <div className="flex my-2">
                        {
                            Array(rating).fill().map((_, index) => {
                                return <StarIcon className="h-5 text-yellow-400" key={index} />
                            })
                        }
                        </div>
                        <p className="my-2">{details.description}</p>
                        <Currency quantity={details.price} currency="GBP" />
                        {
                            prime && (
                                <div className="flex items-center space-x-2">
                                    <img className="w-12" loading="lazy" src="https://links.papareact.com/fdw" alt="prime" />
                                    <p className="text-xs text-gray-400">FREE Next day Delivery</p>
                                </div>
                            )
                        }
                        <button onClick={addItemToBasket} className="button mt-5 flex items-center justify-center"><ShoppingCartIcon className="h-6 mr-2" /> Add To Basket</button>
                    </div>
               </div>
            </main>
        </div>
    )
}

export default Details;
