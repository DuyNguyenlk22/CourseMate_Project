import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { localServices } from "../../Services/localServices";
import Search from "antd/es/input/Search";
import { Collapse, ConfigProvider } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { dataHeader } from "./dataHeader";

export default function UserHeaderMoblie() {
  const items = [
    {
      key: "1",
      label: <p className='font-bold text-xl'>MENU</p>,
      children: (
        <ul className='menuList flex flex-col justify-start'>
          {dataHeader.items.map((item, index) => {
            return (
              <li key={`item${index}`}>
                <a
                  className='block'
                  onClick={() => {
                    navigate(`/`);
                    const element = document.getElementById(item.navItem);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  href={`#${item.itemID}`}>
                  {item.navItem}
                </a>
              </li>
            );
          })}
          <li>
            <NavLink className='block' to={"/contact"}>
              CONTACT
            </NavLink>
          </li>
        </ul>
      ),
    },
  ];
  let { info } = useSelector((state) => state.userSlice);
  let navigate = useNavigate();
  const onSearch = (value, _e) => {
    navigate(`/searchCourse/${value}`);
  };
  let handleLogOut = () => {
    localServices.remove();
  };

  let renderButton = () => {
    if (info) {
      return (
        <div className='flex items-center justify-between'>
          <NavLink to={"/personal"}>
            <span className='hover:text-[#961040] duration-300 flex items-center'>
              <img
                src={`https://i.pravatar.cc/150?u=${info.hoTen}`}
                className='w-6 mr-2 rounded-full'
                alt='...'
              />
              {info.hoTen}
            </span>
          </NavLink>

          <button
            onClick={handleLogOut}
            className='ml-8 hover:text-[#961040] duration-300'>
            <i className='fa-solid fa-right-from-bracket mr-1'></i>
            <span>Log Out</span>
          </button>
        </div>
      );
    } else {
      return (
        <>
          <button className='mr-6'>
            <NavLink to={"/signIn"}>
              <i className='fa-solid fa-user mr-2'></i>
              <span>Sign In</span>
            </NavLink>
          </button>
          <button>
            <NavLink to={"/signUp"}>
              <i className='fa-solid fa-unlock mr-2'></i>
              <span>Sign Up</span>
            </NavLink>
          </button>
        </>
      );
    }
  };
  const customExpandIcon = (panelProps) => {
    const { isActive } = panelProps;
    return <span>{isActive ? <CloseOutlined /> : <MenuOutlined />}</span>;
  };

  return (
    <div className='header'>
      <div className='header__top'>
        <div className='iconHeader flex justify-end items-center container'>
          {/* <div className='space-x-2'>
            {dataHeader.icons.map((item, index) => {
              return <i key={`icon-${index}`} className={item.nameIcon} />;
            })}
          </div> */}
          <div>{renderButton()}</div>
        </div>
      </div>
      <div className='header__middle '>
        <div className='container flex justify-between item-center py-3'>
          <div className='hover:opacity-60 duration-300'>
            <NavLink to={"/"}>
              <img
                src='../image/educator-logo1.png'
                className='w-[75%] sm:w-full'
                alt='...'
              />
            </NavLink>
          </div>
          <div className='flex items-center searchBar'>
            <Search enterButton placeholder='Search...' onSearch={onSearch} />
          </div>
        </div>
      </div>
      <nav>
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                headerBg: "#41246d",
                contentBg: "#fff",
              },
            },
            token: {
              borderRadiusLG: 0,
              colorBorder: "rgba(255, 255, 255, 0.11)",
              padding: 0,
            },
          }}>
          <Collapse expandIcon={customExpandIcon} items={items} />
        </ConfigProvider>
      </nav>
    </div>
  );
}
