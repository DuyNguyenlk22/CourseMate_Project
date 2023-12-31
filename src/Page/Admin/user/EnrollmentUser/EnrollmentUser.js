import { Divider, Select, Table, Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ghiDanhKhoaHoc, huyGhiDanh, layDanhSachKhoaHocChoXetDuyet, layDanhSachKhoaHocChuaGhiDanh, layDanhSachKhoaHocDaXetDuyet, } from "../../../../Services/api";
import { setListKhoaHocChoXetDuyet, setListKhoaHocChuaGhiDanh, setListKhoaHocDaXacThuc, } from "../../../../Redux/formEnrollSlice/formEnrollSlice";

export default function EnrollmentUser({ user }) {
  const columnsKhoaHocChoXacThuc = [
    { title: "#", dataIndex: "stt", key: "stt", },
    { title: "Course name", dataIndex: "tenKhoaHoc", key: "tenKhoaHoc", },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <div className='space-x-4'>
            <button
              onClick={() => {
                handleGhiDanhKhoaHoc(record.maKhoaHoc);
              }}
              className='btnGlobal'>Enroll</button>
            <button
              onClick={() => {
                handleCancelCourse(
                  record.maKhoaHoc,
                  layDanhSachKhoaHocChoXetDuyet,
                  setListKhoaHocChoXetDuyet,
                );
              }}
              className='btnGlobalOutline'>Denied</button>
          </div>
        );
      },
    },
  ];
  const columnsKhoaHocDaXacThuc = [
    { title: "#", dataIndex: "stt", key: "stt", },
    { title: "Course name", dataIndex: "tenKhoaHoc", key: "tenKhoaHoc", },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <div className='space-x-4'>
            <button
              onClick={() => {
                handleCancelCourse(
                  record.maKhoaHoc,
                  layDanhSachKhoaHocDaXetDuyet,
                  setListKhoaHocDaXacThuc,
                );
              }}
              className='btnGlobalOutline'>Delete</button>
          </div>
        );
      },
    },
  ];

  const {
    listKhoaHocChuaGhiDanh,
    listKhoaHocChoXetDuyet,
    listKhoaHocDaXacThuc,
    taiKhoan,
  } = useSelector((state) => state.formEnrollSlice);
  const [maKhoaHoc, setMaKhoaHoc] = useState(null);
  const dispatch = useDispatch();
  const dataSource = [];
  const dataSource1 = [];

  useEffect(() => {
    let danhSachKhoaHocChuaGhiDanh = async () => {
      try {
        let res = await layDanhSachKhoaHocChuaGhiDanh(taiKhoan);
        dispatch(setListKhoaHocChuaGhiDanh(res.data));
      } catch (err) {
        message.error("Error...");
      }
    };
    let danhSachKhoaHocChoXetDuyet = async () => {
      try {
        let res = await layDanhSachKhoaHocChoXetDuyet({
          taiKhoan: taiKhoan,
        });
        dispatch(setListKhoaHocChoXetDuyet(res.data));
      } catch (err) {
        message.error("Error...");
      }
    };
    let danhSachKhoaHocDaXetDuyet = async () => {
      try {
        let res = await layDanhSachKhoaHocDaXetDuyet({
          taiKhoan: taiKhoan,
        });
        dispatch(setListKhoaHocDaXacThuc(res.data));
      } catch (err) {
        message.error("Error...");
      }
    };
    danhSachKhoaHocDaXetDuyet();
    danhSachKhoaHocChuaGhiDanh();
    danhSachKhoaHocChoXetDuyet();
  }, [dispatch, taiKhoan]);

  if (listKhoaHocChoXetDuyet.length > 0) {
    listKhoaHocChoXetDuyet?.map((item, index) =>
      dataSource.push({
        key: index,
        stt: index + 1,
        ...item,
      }),
    );
  }
  if (listKhoaHocDaXacThuc.length > 0) {
    listKhoaHocDaXacThuc?.map((item, index) =>
      dataSource1.push({
        key: index,
        stt: index + 1,
        ...item,
      }),
    );
  }

  const handleChange = (value) => {
    setMaKhoaHoc(value);
  };
  let renderListKhoaHocChuaGhiDanh = () => {
    return listKhoaHocChuaGhiDanh?.map((item) => {
      return {
        value: item.maKhoaHoc,
        label: item.tenKhoaHoc,
      };
    });
  };
  const handleCourseEnrollmentSelected = () => {
    let handleGhiDanhKhoaHoc = async () => {
      try {
        await ghiDanhKhoaHoc({
          maKhoaHoc: maKhoaHoc,
          taiKhoan: taiKhoan,
        });
        message.success("Enrollment successful");
        setMaKhoaHoc(null);
        let res = await layDanhSachKhoaHocDaXetDuyet({ taiKhoan: taiKhoan, });
        dispatch(setListKhoaHocDaXacThuc(res.data));
      } catch (err) {
        message.error(err.response.data);
      }
    };
    handleGhiDanhKhoaHoc();
  };

  let handleGhiDanhKhoaHoc = async (maKhoaHoc) => {
    try {
      await ghiDanhKhoaHoc({
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan,
      });
      message.success("Enrollment successful");
      let res = await layDanhSachKhoaHocChoXetDuyet({
        taiKhoan: taiKhoan,
      });
      dispatch(setListKhoaHocChoXetDuyet(res.data));
      let res1 = await layDanhSachKhoaHocDaXetDuyet({
        taiKhoan: taiKhoan,
      });
      dispatch(setListKhoaHocDaXacThuc(res1.data));
    } catch (err) {
      message.error(err.response.data);
    }
  };

  let handleCancelCourse = async (maKhoaHoc, danhSach, setList) => {
    try {
      await huyGhiDanh({
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan,
      });
      message.success("Enrollment cancellation successful");
      let res = await danhSach({
        taiKhoan: taiKhoan,
      });
      dispatch(setList(res.data));
    } catch (err) {
      message.error(err.response.data);
    }
  };
  return (
    <>
      <div className='flex flex-col justify-between'>
        <p>
          Username:{" "}
          <span className='text-left font-semibold'>{user.taiKhoan}</span>{" "}
          <br />
          Email: <span className='text-left font-semibold'> {user.email}</span>
        </p>
        <h1 className='text-3xl font-bold text-center my-5'>Enroll Course</h1>
        <div className='flex items-center w-full'>
          <Select
            defaultValue='Choose course'
            style={{
              width: "80%",
            }}
            onChange={handleChange}
            value={{
              label:
                maKhoaHoc === null ? "Choose course" : maKhoaHoc.tenKhoaHoc,
              value: maKhoaHoc,
            }}
            options={renderListKhoaHocChuaGhiDanh()}
          />
          <button
            onClick={() => {
              handleCourseEnrollmentSelected();
            }}
            className='px-4 py-2 ml-4 btnGlobal text-white rounded duration-300 w-[20%]'
          >
            Enroll
          </button>
        </div>
        <Divider className='h-[2px] bg-slate-600' />
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: 'Waiting Aprroval Course List',
              key: '1',
              children: <div
              >
                <h1 className='text-xl italic'>Course awaiting validation :</h1>
                <Table dataSource={dataSource} columns={columnsKhoaHocChoXacThuc} />
              </div>,
            },
            {
              label: 'Enrolled Course List',
              key: '2',
              children: <div
              >
                <h1 className='text-xl italic'>Course validated :</h1>
                <Table dataSource={dataSource1} columns={columnsKhoaHocDaXacThuc} />
              </div>,
            },
          ]}
        />
      </div>
    </>
  );
}
