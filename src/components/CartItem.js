import React from 'react';
import Image from 'next/image';
import { removeFromBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { increaseQty, decreaseQty } from '../slices/basketSlice';

const CartItem = ({product}) => {
    const dispatch = useDispatch();

    let removeItemFromBasket = () => {
        dispatch(removeFromBasket(product.id));
    };

    return (
        <div className="my-3 grid grid-cols-5 relative">
            <div>
                <Image objectFit="contain" src={product.image} alt="product image" height={200} width={200} />
            </div>
            <div className="col-span-3 mx-5">
                <p className="absolute top-0 right-0 text-gray-400">x{product.qty}</p>
                <p className="text-xl font-bold">{product.title}</p>
                <div className="flex my-2">
                {
                    Array(product.rating).fill().map((_, index) => {
                        return <StarIcon className="h-5 text-yellow-400" key={index} />
                    })
                }
                </div>
                <p className="my-2 line-clamp-3">{product.description}</p>
                <Currency quantity={product.price} currency="GBP" />
                {
                    product.prime && (
                        <div className="flex items-center space-x-2">
                            <img className="w-12" loading="lazy" src="https://links.papareact.com/fdw" alt="prime" />
                            <p className="text-xs text-gray-400">FREE Next day Delivery</p>
                        </div>
                    )
                }
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex space-x-1">
                    <button onClick={() => dispatch(increaseQty(product.id))} className="button mb-3 flex-1">+</button>
                    <button onClick={() => dispatch(decreaseQty(product.id))} className="button mb-3 flex-1">-</button>
                </div>
                <button onClick={removeItemFromBasket} className="button">Remove from Basket</button>
            </div>
        </div>
    )
}

export default CartItem;
