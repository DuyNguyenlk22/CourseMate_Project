import React, { useEffect, useState } from "react";
import { thongTinTaiKhoan } from "../../../Services/api";
import { localServices, userDetailLocalStorage } from "../../../Services/localServices";
import PersonalInfo from "./PersonalInfo";
import PersonalCourseBooking from "./PersonalCourseBooking";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function PersonalPage() {

    const [userDetail, setUserDetail] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const info = localServices.get();
        if (info === null || info === undefined) {
            message.error("You need to Sign In first to use this page");
            navigate('/signIn');
        }
        const fetchDataUserDetail = async () => {
            try {
                const response = await thongTinTaiKhoan();
                userDetailLocalStorage.set(response.data);
                setUserDetail(userDetailLocalStorage.get());
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataUserDetail();
    }, [navigate]);

    return <div className="mt-20 container">
        <div className="bg-white-900 text-purple-900 shadow-2xl text-center rounded-lg lg:flex lg:mt-20 mt-5">
            <div className="lg:w-1/2 w-full lg:pl-10 pb-5">
                <p className="lg:pt-24 pt-10 font-extrabold text-3xl ">Hello, {userDetail.hoTen}</p>
                <p className="pt-5">Wellcome back to CourseMate!!!</p>
            </div>
            <div className="lg:w-1/2 w-full h-72 text-center relative overflow-hidden ">
                <img className="w-96 mx-auto relative bottom-16" src="./image/personal/banner.svg" alt="null" />
            </div>
        </div>
        <div className="grid lg:grid-cols-7 grid-cols-1 my-5">
            <div className="lg:col-span-2">
                <PersonalInfo userDetail={userDetail} />
            </div>
            <div className="lg:col-span-5">
                <PersonalCourseBooking userDetail={userDetail} />
            </div>
        </div>
    </div>;
}