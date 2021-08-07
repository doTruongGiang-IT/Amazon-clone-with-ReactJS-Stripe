import React from 'react';
import moment from 'moment';
import Currency from 'react-currency-formatter';

const Order = ({order}) => {
    return (
        <div className="relative border rounded-md xs:mx-3 sm:mx-3 lg:mx-0">
            <div className="bg-gray-100 flex items-center space-x-10 p-5 text-sm text-gray-600">
                <div>
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{moment.unix(order.timestamp).format("DD-MM-YYYY")}</p>
                </div>
                <div>
                    <p className="text-xs font-bold">TOTAL</p>
                    <p>
                        <Currency quantity={order.amount} currency="GBP" /> - Next Day Delivery{" "}
                        <Currency quantity={order.amountShipping} currency="GBP" />
                    </p>
                </div>
                <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">{order.items.length} items</p>
                <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">{order.id}</p>
            </div>
            <div className="p-5 sm:p-10">
                <div className="flex space-x-5 overflow-x-auto">
                    {
                        order.images.map((image, index) => {
                            return <img className="h-20 object-contain sm:h-32" key={index} src={image} alt="item image" />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Order;
