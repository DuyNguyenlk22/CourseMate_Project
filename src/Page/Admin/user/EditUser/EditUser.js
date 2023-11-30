import { ConfigProvider, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../Redux/listUserSlice/listUserSlice";

export default function EditUser({ form, infoUser, setIsModalEditOpen }) {
  const dispatch = useDispatch();
  useEffect(() => {
    form.setFieldsValue({
      taiKhoan: infoUser.taiKhoan,
      maLoaiNguoiDung: infoUser.maLoaiNguoiDung,
      soDT: infoUser.soDt,
      email: infoUser.email,
      hoTen: infoUser.hoTen,
      matKhau: "",
    });
  }, [infoUser, form]);

  const onFinish = (values) => {
    dispatch(updateUser(values));
    setIsModalEditOpen(false);
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='font-bold text-2xl mb-5'>Edit Information</h1>
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
          <Input disabled />
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
            <button
              type='default'
              htmlType='submit'
              className='btnGlobal duration-300'
            >
              Update
            </button>
          </ConfigProvider>
        </div>
      </Form>
    </div>
  );
}
