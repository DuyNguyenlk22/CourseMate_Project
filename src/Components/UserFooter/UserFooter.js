import React from "react";
import "./UserFooter.scss";
import { NavLink } from "react-router-dom";

let icons = [
  { name: "fa-brands fa-facebook-f", href: "https://facebook.com" },
  { name: "fa-brands fa-x-twitter", href: "https://twitter.com" },
  { name: "fa-brands fa-youtube", href: "https://youtube.com" },
  { name: "fa-brands fa-instagram", href: "https://instagram.com" },
];
let listItem = {
  listItemCol2: [
    { title: "About us" },
    { title: "Careers" },
    { title: "News & Articles" },
    { title: "Legal Notice" },
  ],
  listItemCol3: [
    { title: "Help Center" },
    { title: "Contact Us" },
    { title: "Payment Center" },
    { title: "Parent Community" },
  ],
};

export default function UserFooter() {
  return (
    <div className='footer pt-20'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8 mb-20'>
          <div className=' col1 space-y-4'>
            <div className='hover:animate-pulse duration-300'>
              <NavLink to={"/"} className='flex items-center'>
                <i className='fa-solid fa-graduation-cap font-extrabold text-4xl'></i>
                <span className='text-xl font-extrabold'>CourseMate</span>
              </NavLink>
            </div>
            <p>
              Vero, tempor morbi, adipiscing aliqua nonummy proident
              perferendis? Laboris lacus quidem repellendus quasi.
            </p>
            <div className='space-x-6 flex'>
              {icons.map((item, index) => {
                return (
                  <div className='item_icon cursor-pointer' key={index}>
                    <a href={item.href} target='blank'>
                      <i className={item.name} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='col2'>
            <h3>Quick Links</h3>
            <ul>
              {listItem.listItemCol2.map((item, index) => {
                return (
                  <li key={index}>
                    {item.title === 'About us' ?
                      <NavLink to={"/aboutUs"} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>{item.title}</NavLink>
                      : <NavLink to={"/comingSoon"}>{item.title}</NavLink>}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='col3'>
            <h3>Support</h3>
            <ul>
              {listItem.listItemCol3.map((item, index) => {
                return (
                  <li key={index}>
                    {item.title === 'Contact Us' ?
                      <NavLink to={"/contact"} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>{item.title}</NavLink>
                      : <NavLink to={"/comingSoon"}>{item.title}</NavLink>}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='col4 space-y-4'>
            <h3>School Hours</h3>
            <div>
              <i className='fa-regular fa-clock text-[#f24080]'></i>
              <p className='inline ml-3'>8 AM - 5 PM , Monday - Saturday</p>
            </div>
            <p>Aut, quae convallis minim cum ornare! Pede dictum convallis.</p>
            <div>
              <button className='btnGlobal font-semibold'>
                <NavLink to={"/contact"} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>JOIN US NOW</NavLink>
              </button>
            </div>
          </div>
        </div>
        <div className='footer_bottom flex justify-center md:justify-between items-center text-sm py-5 border-t-2 border-[#a7a7a73b]'>
          <div>
            <p>Copyright © 2023 Educator. All rights reserved.</p>
          </div>
          <div className='bottom__right'>
            <span>PRIVACY POLICY</span>
            <span>SUPPORT</span>
            <span>TERMS & CONDITION</span>
          </div>
        </div>
      </div>
    </div>
  );
}
