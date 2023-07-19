import React, { useState } from 'react'
import Image from 'next/image'
// import Logo from '../../assets/CB_Logo_-_No_Tagline_300x.webp'
import { Formik, FormikProps, FormikValues } from 'formik';
import Link from 'next/link'
import { useRouter } from 'next/navigation'



function Index() {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const handleSearch = (e: any) => {
    setSearch(e.target.value)
  }

  const searchHandler = () => {
    router.push(`/search?query=${search}`,)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  };

  return (
    <section className="min-h-screen min-w-full bg-con">
      <div className='flex justify-center items-center flex-col py-40 flex-1'>
        <input
          onChange={handleSearch}
          onKeyDown={handleKeyPress}
          value={search}
          type="text" placeholder="Search with (name, flavour, effect, terpenes, helps, affects, etc)" className="md:w-1/2 mx-5  w-full h-12 p-5 rounded-lg border-none outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50" />



        <button 
        className="mt-5 font-bold"
        onClick = {() => searchHandler()}
        >
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
              </svg>
            </div>
          </div>
          <span>Search</span>
        </button>

      </div>
    </section>
  )
}

export default Index

