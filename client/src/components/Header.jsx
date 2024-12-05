import React from 'react'
import logo from '../assets/logo (1).png'
import Search from './Search'
import { Link, useLocation } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { useMobile } from '../hooks/useMobile';


const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  return (
    <header className='h-24 lg:h-20 lg:shadow-sm sticky top-0 bg-red-500 flex flex-col justify-center gap-1'>
      <div className='container mx-auto flex items-center px-2 justify-between gap-5'>
        {/* logo */}
        <div className='h-full'>
          <Link to={"/"} className='h-full flex justify-center items-center'>
            <img src={logo} alt="logo" width={170} height={60} className='hidden lg:block' />
            <img src={logo} alt="logo" width={170} height={60} className='lg:hidden' />
          </Link>
        </div>

        {/* search */}
        <div className='hidden lg:block'>
          <Search />
        </div>
        {/* login and my cart */}
        <div>
          <button className='text-neutral-600 lg:hidden'>
            <FaRegUserCircle size={27}/>
          </button>
          <div className='hidden lg:block '>
            login and my cart
          </div>
        </div>
      </div>
      <div className='container mx-auto px-2 lg:hidden'>
        <Search />
      </div>
    </header>
  )
}

export default Header