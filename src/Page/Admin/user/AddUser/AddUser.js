import { Button, ConfigProvider, Form, Input, Select, message } from "antd";
import React from "react";
import { themNguoiDung } from "../../../../Services/api";
import { useDispatch } from "react-redux";
import { fetchList } from "../../../../Redux/listUserSlice/listUserSlice";

const AddUser = ({ form, setIsModalAddOpen }) => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    let addUser = async () => {
      try {
        await themNguoiDung(values);
        message.success("Added user successfully");
        setIsModalAddOpen(false);
        dispatch(fetchList());
      } catch (err) {
        message.error(err.response.data);
      }
    };
    addUser();
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='font-bold text-2xl mb-5'>Add New User</h1>
      <Form
        form={form}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        className='w-[80%]'
        initialValues={{
          maNhom: "GP09",
          maLoaiNguoiDung: "Choose type",
        }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label='Username'
          name='taiKhoan'
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='matKhau'
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label='Type User' name='maLoaiNguoiDung'>
          <Select
            className='w-full'
            options={[
              {
                value: "GV",
                label: "Teacher",
              },
              {
                value: "HV",
                label: "Student",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label='Fullname'
          name='hoTen'
          rules={[{ required: true, message: "Please input your Fullname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Phone Number'
          name='soDT'
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name='maNhom' className='hidden'>
          <Input />
        </Form.Item>

        <div className='flex justify-center'>
          <ConfigProvider
            theme={{ token: { colorPrimary: "white", borderRadius: 10 } }}
          >
            <Button
              type='default'
              htmlType='submit'
              className='bg-green-600 hover:bg-green-700 duration-300'
            >
              Submit
            </Button>
          </ConfigProvider>
        </div>
      </Form>
    </div>
  );
};

export default AddUser;
