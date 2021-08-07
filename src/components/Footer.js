import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className="bg-amazon_blue-light xs:hidden sm:visible">
            <main className="max-w-screen-xl mx-auto py-8 text-gray-400">
                <div className="flex justify-around">
                    <div>
                        <p className="text-white font-medium mb-3">Get to know us</p>
                        <p>Careers</p>
                        <p>Blog</p>
                        <p>About Amazon</p>
                        <p>Investor Relations</p>
                        <p>Amazon Services</p>
                    </div>
                    <div>
                        <p className="text-white font-medium mb-3">Make money with us</p>
                        <p>Sell products on Amazon</p>
                        <p>Sell on Amazon Business</p>
                        <p>Sell apps on Amazon</p>
                        <p>Become an Affiliate</p>
                        <p>Advertise Your Products</p>
                        <p>Self-Publish with Us</p>
                        <p>Host an Amazon Hub</p>
                    </div>
                    <div>
                        <p className="text-white font-medium mb-3">Amazon Payment Products</p>
                        <p>Amazon Business Card</p>
                        <p>Shop with Points</p>
                        <p>Reload Your Balance</p>
                        <p>Amazon Currency Converter</p>
                    </div>
                    <div>
                        <p className="text-white font-medium mb-3">Let Us Help You</p>
                        <p>Amazon and COVID-19</p>
                        <p>Your Account</p>
                        <p>Shipping Rates & Policies</p>
                        <p>Returns & Replacements</p>
                        <p>Amazon Assistant</p>
                        <p>Help</p>
                    </div>
                </div>
                <hr className="my-10" />
                <div className="flex items-center justify-center">
                    <Image objectFit="contain" src="https://links.papareact.com/f90" alt="footer image" height={40} width={150} />
                    <p className="font-bold text-2xl text-white ml-5 mb-5">@River since 2021</p>
                </div>  
            </main>
        </div>
    )
}

export default Footer;
