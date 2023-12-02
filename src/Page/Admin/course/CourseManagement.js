import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Image, Tag, ConfigProvider, Table, Modal } from "antd";
import Search from "antd/es/input/Search";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { layDanhSachKhoaHoc, layDanhSachKhoaHocTheoTen, xoaKhoaHoc, layThongTinKhoaHoc, } from "../../../Services/api";
import AddCoursePopup from "./AddCoursePopup/AddCoursePopup";
import FormEdit from "./EditCoursePopup/FormEdit";
import { setInfoCourse } from "../../../Redux/popupEditModal/popupEditModal";

export default function CourseManagement({ setSelectedItem, setSelectedCourse, }) {
  dayjs.extend(customParseFormat);
  const dispatch = useDispatch();

  const [courseList, setCourseList] = useState([]);
  const [courseSearchList, setCourseSearchList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const colorMap = {
    BackEnd: "green",
    FrontEnd: "blue",
    Design: "red",
    DiDong: "yellow",
    TuDuy: "purple",
  };

  const fetchDataCourseList = async () => {
    try {
      let response = await layDanhSachKhoaHoc();
      setCourseList(response.data);
    } catch {
      message.error("An error occurred");
    }
  };

  const fetchDataCourseSearch = async (searchValue) => {
    try {
      if (searchValue === "")
        message.error("Please enter the search content into the search box");
      if (
        searchValue === undefined ||
        searchValue === "" ||
        searchValue === null
      )
        return;
      let response = await layDanhSachKhoaHocTheoTen(searchValue);
      setCourseSearchList(response.data);
      setIsSearch(true);
      message.success(
        `There are ${response.data.length} results fit your search key.`,
      );
    } catch (error) {
      if (error.response.status === 404) {
        setCourseSearchList([]);
        setIsSearch(true);
        message.error("There is 0 result fit your search key.");
      } else {
        message.error("An unexpected error occurred. Please try again later.");
      }
    }
  };
  const handleSearchCancel = () => {
    setIsSearch(false);
  };

  const showModalEdit = (maKhoaHoc) => {
    let getInfoCourse = async () => {
      try {
        let res = await layThongTinKhoaHoc(maKhoaHoc);
        dispatch(setInfoCourse(res.data));
        setIsModalEditOpen(true);
      } catch (err) {
        message.error("An error occurred");
      }
    };
    getInfoCourse();
  };

  const handleCancel = () => {
    setIsModalEditOpen(false);
  };
  const handleDeleteCourse = async (maKhoaHoc) => {
    try {
      await xoaKhoaHoc(maKhoaHoc);
      message.success("Course deleted successfully");
      fetchDataCourseList();
    } catch (error) {
      message.error(error.response.data);
    }
  };

  const handleMoveToEnrollment = (maKhoaHoc) => {
    setSelectedItem("enrollmentByCourse");
    setSelectedCourse(maKhoaHoc);
  };

  const tableColumns = [
    { title: "Ordinal", dataIndex: "ordinal", key: "ordinal" },
    { title: "Image", dataIndex: "image", key: "image" },
    { title: "Name", dataIndex: "courseName", key: "courseName" },
    { title: "Type", dataIndex: "courseType", key: "courseType" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Create Date",
      dataIndex: "dateCreate",
      key: "dateCreate",
      sorter: (a, b) => a.dateCreate - b.dateCreate,
    },
    {
      title: "Attendees Amount",
      dataIndex: "courseAttendees",
      key: "courseAttendees",
    },
    {
      title: "Course Views",
      dataIndex: "courseViews",
      key: "courseViews",
      sorter: (a, b) => a.courseViews - b.courseViews,
    },
    {
      title: "Create Account",
      dataIndex: "createAccount",
      key: "createAccount",
    },
    { title: "Actions", dataIndex: "actions", key: "actions" },
  ];
  const courseData = [];
  let list = isSearch ? courseSearchList : courseList;
  list.forEach((course, index) => {
    let maDanhMucKhoahoc = course.danhMucKhoaHoc.maDanhMucKhoahoc;
    let tagColor = colorMap[maDanhMucKhoahoc] || "default";
    let dataRow = {
      ordinal: index + 1,
      image: <Image width={50} height={80} src={course.hinhAnh} alt='' />,
      courseName: `${course.tenKhoaHoc.substring(0, 30)}${course.tenKhoaHoc.length > 30 ? "..." : ""
        }`,
      courseType: <Tag color={tagColor}>{maDanhMucKhoahoc}</Tag>,
      description: `${course.moTa.substring(0, 200)}${course.moTa.length > 200 ? "..." : ""
        }`,
      dateCreate: course.ngayTao,
      courseAttendees: course.soLuongHocVien,
      courseViews: course.luotXem,
      createAccount: course.nguoiTao.taiKhoan,
      actions: (
        <div className='flex align-middle justify-center'>
          <button
            className='h-11 w-10 text-2xl border-none font-extrabold text-yellow-500 hover:text-yellow-600 flex align-middle justify-center'
            onClick={() => {
              showModalEdit(course.maKhoaHoc);
            }}
            title={"Fix This Course"}>
            <i className='fa-solid fa-pen-to-square'></i>
          </button>

          <button
            className='h-11 w-10 text-2xl border-none font-extrabold text-red-500 hover:text-red-700 mx-1 flex align-middle justify-center'
            onClick={() => {
              handleDeleteCourse(course.maKhoaHoc);
            }}
            title={"Delete This Course"}>
            <i className='fa-solid fa-square-xmark '></i>
          </button>

          <button
            className='h-11 w-10 text-2xl border-none font-extrabold text-green-500 hover:text-green-700 flex align-middle justify-center'
            onClick={() => {
              handleMoveToEnrollment(course.maKhoaHoc);
            }}
            title={"Move to All Enrollment of this Course"}>
            <i className='fa-regular fa-calendar'></i>
          </button>
        </div>
      ),
    };
    courseData.push(dataRow);
  });

  useEffect(() => {
    fetchDataCourseList();
    fetchDataCourseSearch();
  }, []);

  return (
    <div>
      <div className='text-right mb-2'>
        <ConfigProvider
          theme={{ token: { colorPrimary: "white", borderRadius: 10 } }}>
          <AddCoursePopup fetchDataCourseList={fetchDataCourseList} />
        </ConfigProvider>
      </div>
      <div id='modal_edit'>
        <Modal
          width={"60%"}
          footer={false}
          centered
          open={isModalEditOpen}
          closeIcon={false}
          onCancel={handleCancel}>
          <FormEdit
            setIsModalEditOpen={setIsModalEditOpen}
            fetchDataCourseList={fetchDataCourseList}
          />
        </Modal>
      </div>
      <div className='flex searchCourse my-5'>
        <Search
          enterButton
          size='large'
          onSearch={fetchDataCourseSearch}
          placeholder='Input search text(phone number/name)'
          className=' overflow-hidden rounded-lg'
          title={"Search Data about Courses"}
        />
        <button
          className={`btn border w-32 rounded-xl border-pink-600 text-pink-500 font-bold ml-3 h-10 ${isSearch ? "block" : "hidden"
            }`}
          onClick={() => {
            handleSearchCancel();
          }}
          title={"Search Data about Courses"}>
          Cancel Search
        </button>
      </div>
      <Table bordered columns={tableColumns} dataSource={courseData} />
    </div>
  );
}
