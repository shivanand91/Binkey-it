import React from 'react'
import logo from '../assets/logo (1).png'

const Header = () => {
  return (
    <header className='h-20 shadow-sm sticky top-0'>
      <div className='container mx-auto flex items-center h-full'>
        {/* logo */}
        <div className='h-full'>
          <div className='h-full flex justify-center items-start'>
            <img src={logo} alt="logo" width={170} height={60} />
          </div>
        </div>

        {/* search */}
        <div>
          search
        </div>
        {/* login and my cart */}
      </div>
    </header>
  )
}

export default Header