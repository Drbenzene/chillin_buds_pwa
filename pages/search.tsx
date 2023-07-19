'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter, useSearchParams } from "next/navigation"
import ProductView from "../components/block-component/modal/product-view-modal";
import axios from "axios";
import Loader from "../components/block-component/loader/loader";
import EmptyImage from '../../assets/cbd.png';
import {toast } from 'react-toastify';
import { BASE_URL } from '../constants';

const Search = () => {
  const router = useRouter();
  const [showProduct, setShowProduct] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [details, setDetails] = useState<any>();
  const [loading, setLoading] = useState(true);

  const search = useSearchParams().get('query');

  console.log(search, "THE SEARCH");

  const showHandler = (details: any) => {
    setShowProduct(true);
    setDetails(details);
  };

  useEffect(() => {
    if (!search) {
      router.push('/');
    }

    async function getData() {
      const { data } = await axios.post(`${BASE_URL}/products/search`, { search }); 
      if (data.status !== 'success'){
        toast.error("Something went wrong. Please try again")
        setLoading(false);
        return
      }
      setProducts(data?.products);
      setLoading(false);
      console.log(data, "THE DATAAAA");
    }

    getData();

  }, [search]);

  return (
    <div className="search-bg-con min-h-screen min-w-full pb-20">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 bg-white shadow-lg">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900"> Related Products for - <span className="text-green">{search}</span> </h2>
          <button 
          onClick = {() => router.push('/')}
          className="text-2xl text-white font-bold tracking-tigh px-3 py-2 bg-red-500"> Back </button>
        </div>

        {
          loading && (
            <div className="flex justify-center items-center mt-20">
              <Loader />
            </div>
          )
        }

        {
          !loading && products?.length === 0 && (
            <div className="flex justify-center items-center mt-20 flex-col">
              <Image src={require('../assets/cbd.png')} alt="" className="w-1/4" />
              <p className="font-bold text-xl text-green-400">No Related Product with the search query {search} Found</p>
            </div>
          )
        }

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products?.map((product: any) => (
            <div key={product.id} className="group cursor-pointer relative bg-black rounded-xl text-white mb-5"
              onClick={() => showHandler(product)}
            >
              <div className="h-40 w-full overflow-hidden bg-gray-200 group-hover:opacity-75">
                <img
                  src={product.imageSrc || 
                    "https://img.freepik.com/free-photo/cannabis-leaves-shoots-placed-shopping-cart_1150-19252.jpg?w=1060&t=st=1689762468~exp=1689763068~hmac=f80c6b5e730eda89d5496f738df7add756cca8a7968f3a5f4a36fc77285093fe"
                    }
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="p-5">
                <h3 className="mt-4 text-sm text-white">
                  <a href={product.href}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
              </div>

            </div>
          ))}
        </div>

      </div>

      {
        showProduct && (
          <ProductView open={showProduct} setOpen={setShowProduct} details={details} />
        )
      }
    </div>
  );
};

export default Search;
