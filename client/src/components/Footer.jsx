import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


const Footer = () => {
  return (
      <footer className='border-t'>
         
          <div className='container mx-auto p-4 text-center'>
              <p>© All Right Reserved 2024 </p>
              <div className='flex items-center gap-4 justify-center'>
                  <a href="">
                      <FaFacebook />
                  </a>
                  <a href="">
                      <FaInstagram />
                  </a>
                  <a href="">
                      <FaLinkedin />
                  </a>
                  <a href="">
                      <FaTwitter />
                  </a>
              </div>
          </div>
   </footer>
  )
}

export default Footer