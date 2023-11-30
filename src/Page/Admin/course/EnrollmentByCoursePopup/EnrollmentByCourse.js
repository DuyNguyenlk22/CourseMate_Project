import { ConfigProvider, Select, Table, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { ghiDanhKhoaHoc, huyGhiDanh, layDanhSachHocVienChoXetDuyet, layDanhSachHocVienKhoaHoc, layDanhSachNguoiDungChuaGhiDanh } from '../../../../Services/api';

export default function EnrollmentByCourse({ selectedCourse, setSelectedCourse, courseList }) {
    const [enrollmentList, setEnrollmentList] = useState(null);
    const [enrollmentType, setEnrollmentType] = useState('notRegister');
    const [courseDataList, setCourseDataList] = useState(null);
    const [tableData, setTableData] = useState([]);

    const tableColumns = [
        { title: 'Ordinal', dataIndex: 'ordinal', key: 'ordinal', },
        { title: 'User Name', dataIndex: 'hoTen', key: 'hoTen', },
        { title: 'Account Name', dataIndex: 'taiKhoan', key: 'taiKhoan', },
        { title: 'Actions', dataIndex: 'thaoTac', key: 'thaoTac', },
    ];

    const itemsTab = [
        {
            key: 'notRegister',
            label: 'Not Register List',
            children: <Table dataSource={tableData} columns={tableColumns} />,
        },
        {
            key: 'waitingApproval',
            label: 'Waiting Approval List',
            children: <Table dataSource={tableData} columns={tableColumns} />,
        },
        {
            key: 'attendees',
            label: 'Attendees List',
            children: <Table dataSource={tableData} columns={tableColumns} />,
        },
    ];

    const handleAcceptEnrollment = async (value) => {
        try {
            await ghiDanhKhoaHoc(value);
            message.success("Enrollment successful");
        } catch (error) {
            message.error(error.response.data);
        }
    };
    const handleDeniedEnrollment = async (value) => {
        try {
            await huyGhiDanh(value);
            message.success("Enrollment deleted successfully");
        } catch (error) {
            message.error(error.response.data);
        }
    };

    const fetchDataList = async (selectedCourse) => {
        try {
            let response;
            if (enrollmentType === 'notRegister') { response = await layDanhSachNguoiDungChuaGhiDanh(selectedCourse); }
            else if (enrollmentType === 'waitingApproval') { response = await layDanhSachHocVienChoXetDuyet(selectedCourse); }
            else if (enrollmentType === 'attendees') { response = await layDanhSachHocVienKhoaHoc(selectedCourse); }
            setEnrollmentList(response.data);
        } catch {
            message.error(`An error occurred. Please try again later.`);
        }
    };

    useEffect(() => {
        if (courseList !== undefined && courseList !== null) {
            let dataList = [];
            courseList.forEach(item => {
                let updateCourse = { value: item.maKhoaHoc, label: item.tenKhoaHoc };
                dataList.push(updateCourse);
                setCourseDataList(dataList);
            })
        }
        fetchDataList(selectedCourse);
        if (enrollmentList !== null) {
            let dataList = [];
            enrollmentList.forEach((item, index) => {
                let updateRow = {
                    key: index,
                    ordinal: index + 1,
                    hoTen: item.hoTen,
                    taiKhoan: item.taiKhoan,
                    thaoTac: <div className='flex align-middle justify-center'>
                        <ConfigProvider theme={{ token: { colorPrimary: 'white', borderRadius: 10, fontSize: 20, }, }}>
                            {enrollmentType === 'notRegister' || enrollmentType === 'waitingApproval' ?
                                <button className='btnGlobal'
                                    onClick={() => { handleAcceptEnrollment({ "maKhoaHoc": selectedCourse, "taiKhoan": item.taiKhoan }) }}
                                >{enrollmentType === 'notRegister' ? 'Enroll' : 'Accept'}</button>
                                : null}
                            {enrollmentType === 'waitingApproval' || enrollmentType === 'attendees' ?
                                <button className='btnGlobalOutline ml-5'
                                    onClick={() => { handleDeniedEnrollment({ "maKhoaHoc": selectedCourse, "taiKhoan": item.taiKhoan }) }}
                                >{enrollmentType === 'waitingApproval' ? 'Denied' : 'Delete'}</button>
                                : null}
                        </ConfigProvider>
                    </div>,
                }
                dataList.push(updateRow);
            })
            setTableData(dataList);
        }
    }, [selectedCourse, enrollmentList, courseList, enrollmentType,]);

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#f24080' }, }}>
            <div className='py-3 text-right'>
                <span className='pr-3'>Choose Course:</span>
                <Select
                    defaultValue={null} style={{ width: 300 }}
                    onChange={setSelectedCourse}
                    options={courseDataList}
                    value={{
                        label: selectedCourse === null ? "Choose Another Course" : selectedCourse.tenKhoaHoc,
                        value: selectedCourse,
                    }} />
            </div>
            <Tabs defaultActiveKey="notRegister" items={itemsTab} onChange={setEnrollmentType} />
        </ConfigProvider>
    )
}
