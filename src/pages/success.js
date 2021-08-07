import React from 'react';
import Head from "next/head";
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';

const Success = () => {
    const router = useRouter();

    return (
        <div className="bg-gray-100 h-screen">
            <Head>
                <title>Amazon | Confirmed</title>
            </Head>
            <main className="max-w-screen-lg mx-auto">
                <div className="bg-white flex flex-col p-10 shadow-md">
                    <div className="flex items-center space-x-2 mb-5">
                        <CheckCircleIcon className="text-green-500 h-10" />
                        <h1 className="text-3xl">Thank you, your order has been confirmed!</h1>
                    </div>
                    <p>
                        Thank you for your order. This represents the first of ten monthly payments you pledged to bring your account up to date. We appreciate your following through on this commitment and hope we can continue to serve your needs. Please call us if you have any problems.
                    </p>
                    <button onClick={() => router.push("/orders")} className="button mt-5">Go to my order</button>
                </div>
            </main>
        </div>
    )
}

export default Success;
