import { Progress } from "antd";
import React, { Fragment } from "react";
import "./AboutUs.scss";
import { NavLink } from "react-router-dom";

let data = [
  { title: "Completed Projects", percent: "92%", number: 92 },
  { title: "Financial Skills", percent: "98%", number: 98 },
  { title: "Relaible & Hardworking", percent: "90%", number: 90 },
];
export default function AboutUs() {
  return (
    <section id='about_us' className='aboutUs pt-28'>
      <div className='container grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-28'>
        <div className='aboutUs__left'>
          <img
            src='./image/aboutUs/about_1.jpg'
            alt='...'
            className='rounded-xl mb-9'
          />
          <div>
            {data.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div className='flex justify-between'>
                    <span>{item.title}</span>
                    <span>{item.percent}</span>
                  </div>
                  <Progress
                    percent={item.number}
                    status='active'
                    strokeColor={"#41246D"}
                    size={"small"}
                  />
                </Fragment>
              );
            })}
          </div>
          <div className='regarding_us grid-cols-1 grid sm:grid-cols-2 gap-4 sm:gap-8 mt-[20px]'>
            <div className='regarding_left'>
              <div className='flex items-center mb-4'>
                <i className='fa-solid fa-medal'></i>
                <h3>Certified Institute</h3>
              </div>
              <div>
                <p className='leading-[1.7]'>
                  Lacinia asperiores incididunt saepe corrupti quos eros
                  cupidatat faucibus natus.
                </p>
              </div>
            </div>
            <div className='regarding_right'>
              <div className='flex items-center  mb-4'>
                <i className='fa-solid fa-user-tie'></i>
                <h3>Qualifed Teachers</h3>
              </div>
              <div>
                <p className='leading-[1.7]'>
                  Lacinia asperiores incididunt saepe corrupti quos eros
                  cupidatat faucibus natus.
                </p>
              </div>
            </div>
          </div>
          <div className='mt-10'>
            <NavLink to={"/aboutUs"} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
              <button className='btnGlobal font-bold'>MORE ABOUT US</button>
            </NavLink>
          </div>
        </div>
        <div className='aboutUs__right flex flex-col justify-around'>
          <div>
            <h1 className='text-[30px] sm:text-[42px] font-extrabold leading-[1.1] mb-5'>
              Why Students Choose Us for Gaining Knowledge !
            </h1>
            <p>
              Per sed, mattis. Integer viverra euismod maecenas incidunt,
              phasellus consequatur aliquam nihil temporibus in assumens
              deserunt convallis. Inceptos per consectetur consequatur proin.
            </p>
          </div>
          <img
            src='./image/aboutUs/about_2.jpg'
            alt='...'
            className='rounded-xl w-full mt-5 md:mt-0'
          />
        </div>
      </div>
    </section >
  );
}
