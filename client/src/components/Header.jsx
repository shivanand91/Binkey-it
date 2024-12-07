import React from 'react'
import logo from '../assets/logo (1).png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { useMobile } from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";



const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
 const navigate = useNavigate()
  const reDrictToLoginPage = () => {
      navigate("/login")
  }

  return (
    <header className='h-24 lg:h-20 lg:shadow-sm sticky top-0 flex flex-col justify-center gap-1'>
      {
        !(isSearchPage && isMobile) && (
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
              {/* user icon display only one mobile version  */}
              <button className='text-neutral-600 lg:hidden'>
                <FaRegUserCircle size={27} />
              </button>
              {/* Desktop  */}
              <div className='hidden lg:flex items-center gap-10'>
                <button onClick={reDrictToLoginPage} className='text-lg px-2'>Login</button>
                <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 py-2 px-3 text-white rounded-md '>
                  {/* add to cart icon  */}
                  <div className='animate-bounce'>
                    <BsCart4 size={22}/>
                  </div>
                  <div>
                    <p className='font-semibold'>My Cart</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )
      }
      <div className='container mx-auto px-2 lg:hidden'>
        <Search />
      </div>
    </header>
  )
}

export default Header