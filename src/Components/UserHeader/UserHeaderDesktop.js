import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import { ConfigProvider } from "antd";
import { localServices } from "../../Services/localServices";
import { dataHeader } from "./dataHeader";

export default function UserHeaderDesktop() {
  const [headerFixed, setheaderFixed] = useState(" ");
  let { info } = useSelector((state) => state.userSlice);
  let navigate = useNavigate();

  const onSearch = (value, _e) => {
    navigate(`/searchCourse/${value}`);
  };
  let handleLogOut = () => {
    localServices.remove();
  };
  const handleScrollHeader = () => {
    if (window.scrollY > 200) {
      setheaderFixed("header__fixed");
    } else {
      setheaderFixed(" ");
    }
  };

  let renderNavItem = () => {
    return dataHeader.items.map((item, index) => {
      return (
        <li key={`item${index}`} className="hover:text-[#f24080]">
          <a
            onClick={() => {
              navigate(`/`);
              const element = document.getElementById(item.itemID);
              if (element) { element.scrollIntoView({ behavior: "smooth" }); }
            }}
            href={`#${item.itemID}`}>
            {item.navItem}
          </a>
        </li>
      );
    });
  };

  let renderButton = () => {
    if (info) {
      return (
        <div className='flex items-center'>
          <NavLink to={"/personal"}>
            <span className='hover:text-[#f24080] font-bold duration-300 flex items-center'>
              <img src={`https://i.pravatar.cc/150?u=${info.hoTen}`} className='w-8 mr-2 rounded-full' alt='...' />
              {info.hoTen}
            </span>
          </NavLink>

          <button
            onClick={handleLogOut}
            className='ml-3 hover:text-[#f24080] font-bold duration-300'>
            <i className='fa-solid fa-right-from-bracket mr-2'></i>
            <span>Log Out</span>
          </button>
        </div>
      );
    } else {
      return (
        <>
          <button className='mr-4 font-bold'>
            <NavLink to={"/signIn"}><i className='fa-solid fa-user mr-2'></i><span>Sign In</span></NavLink>
          </button>
          <button className='font-bold'>
            <NavLink to={"/signUp"}><i className='fa-solid fa-unlock mr-2'></i><span>Sign Up</span></NavLink>
          </button>
        </>
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollHeader);
  }, []);

  return (
    <div className='header'>
      <div className='header__top'>
        <div className='iconHeader flex justify-between items-center container '>
          <div className='iconHeader__left space-x-6'>
            {dataHeader.icons.map((item, index) => {
              return (
                <a href={`https://${item.link}`} target='blank'>
                  <i key={`icon-${index}`} className={item.nameIcon} />
                </a>
              );
            })}
          </div>
          <div>
            <ConfigProvider
              theme={{
                token: {
                  colorBorder: "#f24080",
                },
              }}>
              <Search
                enterButton
                placeholder='Search something...'
                onSearch={onSearch}
                style={{
                  width: 400,
                }}
              />
            </ConfigProvider>
          </div>
          <div>{renderButton()}</div>
        </div>
      </div>
      <div className={` header__bottom ${headerFixed}`}>
        <div className='container navbar flex justify-between items-center py-3'>
          <div className='hover:animate-pulse duration-300'>
            <NavLink to={"/"} className='flex items-center'>
              <i className='fa-solid fa-graduation-cap font-extrabold text-4xl'></i>
              <span className='text-xl font-extrabold'>CourseMate</span>
            </NavLink>
          </div>
          <nav>
            <ul className='flex items-center space-x-8 lg:space-x-4 xl:space-x-8'>
              {renderNavItem()}
              <li>
                <NavLink to={"/contact"} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>CONTACT</NavLink>
              </li>
            </ul>
          </nav>
          <div>
            <NavLink to={"/contact"} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
              <button className='btnGlobal'>JOIN US NOW</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
