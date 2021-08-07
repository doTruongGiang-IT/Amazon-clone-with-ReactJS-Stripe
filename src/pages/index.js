import { useEffect } from "react";
import Head from "next/head";
import Banner from "../components/Banner";
import ProductList from "../components/ProductList";
import { getSession } from "next-auth/client";
import { useDispatch, useSelector } from "react-redux";
import { getProductsSuccess } from "../slices/productSlice";

export async function getStaticProps(context) {
  const session = await getSession(context);
  const productList = await fetch("https://fakestoreapi.com/products")
                                .then(res => res.json())
                                .catch(err => console.log(err.message));
  return {
    props: {
      products: productList ?? [],
      session: session
    }
  };
};
//acct_1JGKLTBqDF3l7Yfo
export default function Home({products, session}) {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.product.products);

  useEffect(() => {
    if(products) {
      localStorage.setItem("amazon", JSON.stringify(products));
      dispatch(getProductsSuccess(products));
    };
  }, [products]);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
      </Head>

      <main className="max-w-screen-xl mx-auto">
        <Banner />
        <ProductList productList={productList} />
      </main>
    </div>
  );
}
