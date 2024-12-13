import React, { useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";


const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const [showPassword, setShowPassword] = useState(false)
    console.log("data", data);

    return (
        <section className='w-full container mx-auto px-2 '>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-4  '>
                <p>Welcome to Binkeyit</p>

                <form className='grid  gap-2 mt-6'>
                    <div className='grid gap-2'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" autoFocus className='bg-blue-50 px-2 py-2 text-xl rounded-sm outline-primary-200' onChange={handleChange} name='name' value={data.name} />
                    </div>
                    <div className='grid gap-2'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" className='bg-blue-50 px-2 py-2 text-xl rounded-sm outline-primary-200' onChange={handleChange} name='email' value={data.email} />
                    </div>
                    <div className='grid gap-2'>
                        <label htmlFor="password">Password:</label>
                        <div className='bg-blue-50 px-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input type={showPassword ? "text" : "password"} className='bg-blue-50 px-2 py-2 w-full text-xl rounded-sm outline-none' onChange={handleChange} name='password' value={data.password} />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursure-pointer'>
                                {
                                    showPassword ? (
                                        <IoMdEye />
                                    ) : (

                                        <IoMdEyeOff />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register