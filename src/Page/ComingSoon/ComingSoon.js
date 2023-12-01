import React from "react";
import "./comingSoon.scss";
import { NavLink } from "react-router-dom";
import Countdown from "react-countdown";

export default function ComingSoon() {
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return "Have a good experience";
    } else {
      // Render a countdown
      return (
        <div className='flex justify-center flex-wrap md:flex-nowrap'>
          <div className='number__item'>
            <div className='item__wrap'>
              <p>{days}</p>
              <span>Days</span>
            </div>
          </div>
          <div className='number__item'>
            <div className='item__wrap'>
              <p>{hours}</p>
              <span>Hours</span>
            </div>
          </div>
          <div className='number__item'>
            <div className='item__wrap'>
              <p>{minutes}</p>
              <span>Minutes</span>
            </div>
          </div>
          <div className='number__item'>
            <div className='item__wrap'>
              <p>{seconds}</p>
              <span>Seconds</span>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <section id='commingSoon'>
      <div className='commingSoon__bg h-full md:h-screen'>
        <div className='overlay_purpil'></div>
        <div className='container h-[90%]'>
          <div className='relative z-[2]'>
            <div className='flex justify-center mt-5'>
              <NavLink to={"/"}>
                <img
                  src='../image/educator-logo1.png'
                  alt='...'
                  className='hover:animate-pulse duration-300'
                />
              </NavLink>
            </div>
            <div className='comingSoon__title text-center mt-[70px] mb-[40px]'>
              <h2 className='text-[30px] md:text-[60px] font-bold'>
                We are coming soon !!
              </h2>
              <p className='w-20 h-1 bg-white inline-block my-4' />
              <p className='font-semibold text-lg uppercase'>
                Something awesome is in the works
              </p>
            </div>
            {/* <div className='flex justify-center'> */}
            <div className='comingSoon__listNumber mb-16'>
              <Countdown date={Date.now() + 1701413929} renderer={renderer} />
            </div>
            {/* </div> */}
            <div className='comingSoon__footer flex justify-center md:justify-between items-center flex-wrap md:flex-nowrap px-8 mb-5'>
              <div className='space-x-0 md:space-x-8'>
                <span className='md:inline-block block'>
                  <i className='fa-solid fa-phone mr-2'></i>
                  (+984) 256 897 21
                </span>
                <span className='md:inline-block block'>
                  <i className='fa-solid fa-envelope mr-2'></i>
                  info@domain.com
                </span>
                <span className='md:inline-block block'>
                  <i className='fa-solid fa-location-dot mr-2'></i>
                  Ho Chi Minh, VN
                </span>
              </div>
              <div className='flex justify-center items-center text-center space-x-4 mt-5 md:mt-0'>
                <div className='item__icon'>
                  <a href={"https://www.facebook.com/"} target='blank'>
                    <i className='fa-brands fa-facebook' />
                  </a>
                </div>
                <div className='item__icon'>
                  <a href={"https://twitter.com/"} target='blank'>
                    <i className='fa-brands fa-twitter' />
                  </a>
                </div>
                <div className='item__icon'>
                  <a href={"https://www.whatsapp.com/"} target='blank'>
                    <i className='fa-brands fa-whatsapp'></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
