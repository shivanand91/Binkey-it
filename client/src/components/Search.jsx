import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useMobile } from '../hooks/useMobile';



const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()

    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    }, [location])

    const redirectToSearchPage = () => {
        navigate("/search")
    }

    return (
        <div className='w-full min-w-[320px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center  text-neutral-500 bg-slate-100 group focus-within:border-primary-200'>
            <div>

                {
                    (isMobile && isSearchPage) ? (
                        <Link to={"/"} className='flex justify-center items-center h-full  p-2 group-focus-within:text-primary-200 bg-white rounded-full shadow-md m-1'>
                            <IoMdArrowRoundBack size={22} />
                        </Link>
                    ) : (
                        <Link to={"/search"} className='flex justify-center items-center h-full  p-3 group-focus-within:text-primary-200'>
                            <FaSearch size={22} />
                        </Link>
                    )
                }
            </div>
            <div className='w-full h-full'>
                {
                    !isSearchPage ? (
                        <div className='w-full h-full flex items-center' onClick={redirectToSearchPage}>
                            <TypeAnimation
                                sequence={[
                                    'Search "Milk"',
                                    1000,
                                    'Search "Bread"',
                                    1000,
                                    'Search "Paneer"',
                                    1000,
                                    'Search "Samosa"',
                                    1000,
                                    'Search "Curd"',
                                    1000,
                                    'Search "Paneer"',
                                    1000,
                                    'Search "Samosa"',
                                    1000,
                                ]}
                                wrapper="span"
                                speed={30}
                                repeat={Infinity}

                            />
                        </div>
                    ) : (
                        <div className='w-full h-full border'>
                            <input type="text" placeholder='Search here...' className="w-full h-full bg-transparent outline-none px-1" autoFocus />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Search