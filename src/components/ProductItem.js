import React, {useState} from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { addToBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

const MAX_RATING = 5;
const MIN_RATING = 1;

const ProductItem = ({product}) => {
    const router = useRouter();
    const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
    const [prime] = useState(Math.random() < 0.5);
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        let item = {
            ...product,
            rating,
            prime
        };
        dispatch(addToBasket(item));
    };

    return (
        <div className="relative flex flex-col m-5 bg-white z-20 p-10 shadow-lg">
            <p className="absolute top-2 right-2 text-xs text-gray-400">{product.category}</p>
            <Image onClick={() => router.push(`/details/${product.id}`)} className="cursor-pointer hover:scale-125 transition-all duration-300" objectFit="contain" src={product.image} alt="product image" height={200} width={200} />
            <h4 className="my-3">{product.title}</h4>
            <div className="flex">
                {
                    Array(rating).fill().map((_, index) => {
                        return <StarIcon key={index} className="h-5 text-yellow-400" />
                    })
                }
            </div>
            <p className="my-2 text-xs line-clamp-2">{product.description}</p>
            <div className="mb-5">
                <Currency quantity={product.price} currency="GBP" />
            </div>
            {
                prime && (
                    <div className="flex items-center space-x-2 -mt-5">
                        <img className="w-12" src="https://links.papareact.com/fdw" alt="product logo" />
                        <p className="text-xs text-gray-400">FREE Next day Delivery</p>
                    </div>
                )
            }
            <button onClick={addItemToBasket} className="button mt-auto">Add To Basket</button>
        </div>
    )
};

export default ProductItem;
