import React from 'react';
import ProductItem from './ProductItem';
import { useSelector } from "react-redux";

const ProductList = ({productList}) => {
    const searchProducts = useSelector(state => state.product.searchProducts);
    if(searchProducts.length !== 0) {
        productList = searchProducts;
    };

    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-48 mx-auto">
            {
                productList ?
                productList.slice(0, 4).map((product) => {
                    return <ProductItem key={product.id} product={product} />
                }) : null
            }
            {productList.length > 4 ? <img className="md:col-span-full" src="https://links.papareact.com/dyz" alt="sub banner" /> : ""}
            <div className="md:col-span-2">
            {
                productList ?
                productList.slice(4, 5).map((product) => {
                    return <ProductItem key={product.id} product={product} />
                }) : null
            }
            </div>
            {
                productList ?
                productList.slice(5, 9).map((product) => {
                    return <ProductItem key={product.id} product={product} />
                }) : null
            }
            {productList.length > 10 ? <img className="md:col-span-full" src="https://links.papareact.com/dyz" alt="sub banner" /> : ""}
            {
                productList ?
                productList.slice(9, 13).map((product) => {
                    return <ProductItem key={product.id} product={product} />
                }) : null
            }
            <div className="md:col-span-2">
            {
                productList ?
                productList.slice(13, 14).map((product) => {
                    return <ProductItem key={product.id} product={product} />
                }) : null
            }
            </div>
            {
                productList ?
                productList.slice(15).map((product) => {
                    return <ProductItem key={product.id} product={product} />
                }) : null
            }
        </div>
    )
};

export default ProductList;
