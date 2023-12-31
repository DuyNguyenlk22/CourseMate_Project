import React, { useEffect, useState } from "react";
import { ScheduleOutlined, TeamOutlined } from "@ant-design/icons";
import { Breadcrumb, ConfigProvider, Layout, Menu, message, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { layDanhSachKhoaHoc } from "../../Services/api";
import UserManagement from "./user/UserManagement";
import PersonalPage from "../User/PersonalPage/PersonalPage";
import CourseManagement from "./course/CourseManagement";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import EnrollmentByCourse from "./course/EnrollmentByCoursePopup/EnrollmentByCourse";

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}
const items = [
  getItem("User Management", "Users", <TeamOutlined />),
  getItem("Course Management", "Courses", <ScheduleOutlined />),
];

export default function AdminHomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const [selectedItem, setSelectedItem] = useState("Users");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseList, setCourseList] = useState([]);

  const handleMenuItemClick = (key) => {
    setSelectedItem(key);
  };
  const fetchDataCourseList = async () => {
    try {
      let response = await layDanhSachKhoaHoc();
      setCourseList(response.data);
    } catch {
      message.error("An error occurred");
    }
  };
  const breadcrumbItems = [
    <Breadcrumb.Item key='Admin'>Admin</Breadcrumb.Item>,
    selectedItem === "enrollmentByCourse" ? (
      <>
        <Breadcrumb.Item>
          <div
            onClick={() => handleMenuItemClick("Courses")}
            className='cursor-pointer'
          >
            Courses
          </div>
        </Breadcrumb.Item>
        <Breadcrumb.Item key={selectedItem}>
          Enrollment By Course
        </Breadcrumb.Item>
      </>
    ) : (
      <Breadcrumb.Item key={selectedItem}>{selectedItem}</Breadcrumb.Item>
    ),
  ];

  const componentMapping = {
    Users: <UserManagement />,
    Courses: (
      <CourseManagement
        setSelectedItem={setSelectedItem}
        setSelectedCourse={setSelectedCourse}
      />
    ),
    enrollmentByCourse: (
      <EnrollmentByCourse
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        courseList={courseList}
      />
    ),
    personal: <PersonalPage />,
  };
  useEffect(() => {
    fetchDataCourseList();
  }, []);
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#f24080' }, }}>
      <Layout
        style={{ minHeight: "100vh", scrollBehavior: "smooth", overflow: "auto" }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            style={{ paddingTop: 10 }}
            theme='dark'
            defaultSelectedKeys={[selectedItem]}
            mode='inline'
            items={items}
            onClick={({ key }) => handleMenuItemClick(key)}
            className="mt-20"
          />
        </Sider>
        <Layout>
          <Header>
            <AdminHeader />
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {breadcrumbItems}
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 900,
                background: colorBgContainer,
              }}
            >
              {componentMapping[selectedItem]}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
