import React from "react";
import { Link } from "react-router-dom";

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  } from "react-icons/fa";

// Footer component containing social media links and copyright information
const Footer = () => {
  // Array containing social media icons with their names and links
  const socialMediaItems = [
    { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
    { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
    { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
    { name: "Github", icon: FaGithub, link: "https://github.com/" },
  ];

  return (
    <div className="ml-16 w-full mt-9 sm:mt-24 bg-opacity-75  text-black py-y px-2 font-poppins">
      {/* Container for footer content */}
      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center ">
        {/* Copyright information */}
        <p className="py-4">&copy; 2024 SkillUP. All rights reserved.</p>
        
        {/* Link to About Us page */}
        <div className="">
          <Link
            to="/about"
            className="flex md:pt-4  hover:text-blue-500 hover:font-bold pt-0 md:ml-auto ml-28"
          >
            About SkillUP
          </Link>
        </div>
        
        {/* Social media icons */}
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          {/* Mapping through social media items to display icons */}
          {socialMediaItems.map((item, index) => {
            const Icon = item.icon; // Dynamically selecting the icon component
            return <Icon key={index} className="hover:text-blue-500 hover:scale-125" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;