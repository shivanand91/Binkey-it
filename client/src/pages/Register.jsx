import React, { useState } from 'react'

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
    return (
        <section className='w-full container mx-auto px-2 '>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-4  '>
                <p>Welcome to Binkeyit</p>

                <form className='grid  gap-2 mt-6'>
                    <div className='grid'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" autoFocus className='bg-blue-50 p' onChange={handleChange} name='name' value={data.name} />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register