import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {SearchIcon, MenuIcon, ShoppingCartIcon} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useSelector, useDispatch } from 'react-redux';
import {selectItems} from '../slices/basketSlice';
import { searchItem } from '../slices/productSlice';

const Header = () => {
    const [search, setSearch] = useState("");
    const [ session, loading ] = useSession();
    const dispatch = useDispatch();
    const router = useRouter();
    const products = useSelector(selectItems);

    let liveSearch = () => {
        dispatch(searchItem(search));
        setSearch("");
    };

    return (
        <header> 
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                    <Image onClick={() => router.push("/")} className="cursor-pointer" objectFit="contain" src="https://links.papareact.com/f90" alt="logo" height={40} width={150} />
                </div>
                <div className="bg-yellow-300 hover:bg-yellow-500 cursor-pointer hidden sm:flex items-center rounded-md h-10 flex-grow">
                    <input value={search} onChange={(e) => setSearch(e.target.value)} className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none" type="text" />
                    <SearchIcon onClick={liveSearch} className="h-12 p-4" />
                </div>
                <div className="text-white text-sm space-x-6 mx-6 whitespace-nowrap flex items-center">
                    <div onClick={session ? signOut : signIn} className="link flex flex-col justify-center items-center">
                        <p className={session ? 'opacity-100' : 'opacity-60'}>
                            {
                                session ? 
                                <div className="flex items-center justify-center">   
                                    <img className="w-7 rounded-full mr-1" src={session.user.image} alt="email" /> 
                                    <span>{session.user.name}</span>
                                </div> : "Sign in"
                            }
                        </p>
                        <p>Account & List</p>
                    </div>
                    <div onClick={() => session && router.push("/orders")} className="link flex flex-col justify-center items-center">
                        <p>Returns</p>
                        <p>& Orders</p>
                    </div>
                    <div className="link flex items-center relative">
                        <span className="text-amazon_blue text-xs font-medium flex items-center justify-center h-5 w-5 rounded-full bg-yellow-300 absolute right-0 top-0 md:right-8">{products.length}</span>
                        <Link href="/cart"><a><ShoppingCartIcon className="h-10" /></a></Link>
                        <p className="hidden md:inline">Basket</p> 
                    </div>
                </div>
            </div>
            <div className="text-white text-sm space-x-3 flex items-center bg-amazon_blue-light px-5 py-2">
                <p className="link flex items-center justify-center"><MenuIcon className="h-6 mr-1" /> All</p>
                <p className="link">Prime Video</p>
                <p className="link">Amazon Business</p>
                <p className="link">Today's Deals</p>
                <p className="link hidden lg:inline-flex">Electronics</p>
                <p className="link hidden lg:inline-flex">Food & Grocery</p>
                <p className="link hidden lg:inline-flex">Prime</p>
                <p className="link hidden lg:inline-flex">Buy again</p>
                <p className="link hidden lg:inline-flex">Shopper toolkit</p>
                <p className="link hidden lg:inline-flex">Health & Personal Care</p>
            </div>
        </header>
    )
}

export default Header;
