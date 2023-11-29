import React, { useEffect, useState } from "react";
import {
  Modal,
  Table,
  Tag,
  Input,
  Button,
  message,
  ConfigProvider,
  Form,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchList,
  searchUser,
} from "../../../../Redux/listUserSlice/listUserSlice";
import {
  CloseOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import FormEnrollment from "./FormEnrollment";
import { setTaiKhoan } from "../../../../Redux/formEnrollSlice/formEnrollSlice";
import AddUser from "../AddUser/AddUser";
import EditUser from "../EditUser/EditUser";

export default function TableUser() {
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Username",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Name",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Type",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (text) => {
        if (text === "HV") {
          return <Tag color='green'>Học Viên</Tag>;
        } else {
          return <Tag color='red'>Giáo Viên</Tag>;
        }
      },
    },
    {
      title: "Action",
      render: (_, user) => {
        return (
          <div className='space-x-8'>
            <button
              onClick={() => {
                showModalEdit(user);
              }}
              className='text-2xl text-yellow-400 hover:text-yellow-500 duration-300'
            >
              <i className='fa-solid fa-pen-to-square'></i>
            </button>
            <button
              onClick={() => handleDelete(user.taiKhoan)}
              className='text-2xl text-red-600 hover:text-red-700 duration-300'
            >
              <i className='fa-solid fa-square-xmark '></i>
            </button>
            <button
              onClick={() => {
                showModalEnroll(user);
              }}
              className='text-2xl text-green-400 hover:text-green-500 duration-300'
            >
              <i className='fa-solid fa-user-check'></i>
            </button>
          </div>
        );
      },
    },
  ];
  let dataSource = [];
  const [searchResult, setSearchResult] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch();
  const { listUser } = useSelector((state) => state.listUserSlice);
  const [isModalEnrollOpen, setIsModalEnrollOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [infoUser, setInfoUser] = useState(null);
  const [form] = Form.useForm();

  const showModalEnroll = (user) => {
    dispatch(setTaiKhoan(user.taiKhoan));
    setIsModalEnrollOpen(true);
  };
  const handleCancelEroll = () => {
    setIsModalEnrollOpen(false);
  };
  const showModalAdd = () => {
    form.resetFields();
    setIsModalAddOpen(true);
  };
  const handleCancelAdd = () => {
    setIsModalAddOpen(false);
  };

  const showModalEdit = (user) => {
    setIsModalEditOpen(true);
    setInfoUser(user);
  };
  const handleCancelEdit = () => {
    setIsModalEditOpen(false);
  };

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  let dataUser = isSearch ? searchResult : listUser;

  dataUser?.map((item, index) =>
    dataSource.push({
      key: index + 1,
      stt: index + 1,
      ...item,
    }),
  );

  const handleDelete = (taiKhoan) => {
    dispatch(deleteUser(taiKhoan));
  };

  const handleSearch = (e) => {
    dispatch(searchUser(e.target.value))
      .then((action) => {
        if (action.type === "listUser/searchUser/fulfilled") {
          setSearchResult(action.payload);
          setIsSearch(e.target.value);
        }
      })
      .catch((error) => {
        message.error("Lỗi tìm kiếm:", error);
      });
  };

  return (
    <div>
      <div id='modal__enroll'>
        <Modal
          footer={null}
          centered
          width={"60%"}
          closeIcon={<CloseOutlined className='text-black' />}
          okType={"default"}
          open={isModalEnrollOpen}
          onCancel={handleCancelEroll}
        >
          <FormEnrollment />
        </Modal>
      </div>

      <ConfigProvider
        theme={{ token: { colorPrimary: "white", borderRadius: 10 } }}
      >
        <Button
          onClick={showModalAdd}
          type='default'
          className='flex items-center bg-green-600 hover:bg-green-700 duration-300'
        >
          <PlusCircleOutlined /> Add New User
        </Button>
      </ConfigProvider>

      <div id='modal__addUser'>
        <Modal
          footer={null}
          centered
          width={"60%"}
          closeIcon={<CloseOutlined className='text-black' />}
          okType={"default"}
          open={isModalAddOpen}
          onCancel={handleCancelAdd}
        >
          <AddUser form={form} setIsModalAddOpen={setIsModalAddOpen} />
        </Modal>
      </div>
      <div id='modal__editUser'>
        <Modal
          footer={null}
          centered
          width={"60%"}
          closeIcon={<CloseOutlined className='text-black' />}
          okType={"default"}
          open={isModalEditOpen}
          onCancel={handleCancelEdit}
        >
          <EditUser
            infoUser={infoUser}
            form={form}
            setIsModalAddOpen={setIsModalAddOpen}
            setIsModalEditOpen={setIsModalEditOpen}
          />
        </Modal>
      </div>
      <div className='search-bar my-5'>
        <Input
          suffix={<SearchOutlined />}
          placeholder='Input search text...'
          onChange={handleSearch}
          size='large'
        />
      </div>

      <Table bordered columns={columns} dataSource={dataSource} />
    </div>
  );
}
