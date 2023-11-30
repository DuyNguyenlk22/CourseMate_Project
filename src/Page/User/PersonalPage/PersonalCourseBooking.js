import { message } from 'antd';
import React from 'react'
import { huyGhiDanh } from '../../../Services/api';
import { useNavigate } from 'react-router-dom';

export default function PersonalCourseBooking({ userDetail }) {
    const navigate = useNavigate();
    let chiTietKhoaHocGhiDanh = userDetail.chiTietKhoaHocGhiDanh;
    if (!chiTietKhoaHocGhiDanh || !userDetail) {
        return <div>Loading...</div>;
    }
    const fetchData = async (data) => {
        try {
            await huyGhiDanh(data);
            message.success("Terminate your course successful");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            message.error(error.response.data.content);
            console.log(error);
        }
    };
    const handleCancleUserCourse = (maKhoaHoc) => {
        let data = {
            "maKhoaHoc": maKhoaHoc,
            "taiKhoan": userDetail.taiKhoan,
        }
        fetchData(data);
    }
    const renderUserRegisteredCourseList = () => {
        return chiTietKhoaHocGhiDanh.map((course, index) => {
            return (
                <div key={index} className='grid md:grid-cols-4 grid-cols-1 bg-purple-100 my-5 rounded-2xl overflow-hidden'>
                    <div className='md:p-4 pb-5'>
                        <img className='rounded-lg'
                            src={course.hinhAnh} alt={course.tenKhoaHoc} />
                    </div>
                    <div className='col-span-2 flex flex-col justify-center items-center md:items-start'>
                        <p className='text-center md:text-left font-bold text-lg'> {course.tenKhoaHoc.substring(0, 40)}{course.tenKhoaHoc.length > 40 ? '...' : ''}</p>
                        <p className='text-sm text-pink-500'><span className='text-black font-normal'>Enroll: </span>{course.ngayTao.substring(0, 10)}</p>
                    </div>
                    <div className="flex justify-center items-center m-5">
                        <button className='btnGlobalOutline max-h-10 md:max-h-20'
                            onClick={() => { handleCancleUserCourse(course.maKhoaHoc) }}>Cancel Enrollment</button>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className='lg:ml-10 mt-10'>
            <div className="text-center">
                <span className='text-3xl font-semibold'>Course List you have assign</span>
            </div>
            <div>{renderUserRegisteredCourseList()}</div>
            <div className="text-right">
                <p className='lg:text-2xl text-sm lg:p-10 py-4'>View Other Courses of Educator at <span className='cursor-pointer font-semibold underline text-purple-900'
                    onClick={() => { navigate('/') }}>HERE</span></p>
            </div>
        </div>
    )
}
