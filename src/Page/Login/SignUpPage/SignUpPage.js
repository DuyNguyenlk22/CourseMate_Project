import React from "react";
import { dangKy } from "../../../Services/api";
import { Form, Input, message } from "antd";
import { NavLink } from "react-router-dom";

export default function SignUpPage() {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
      md: {
        span: 6,
      },
      lg: {
        span: 5,
      }
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
      lg: {
        span: 24,
      }
    },
  };
  const handleSubmit = (values) => {
    console.log("Form values:", values);
    let fetchDataUserRegister = async () => {
      try {
        await dangKy(values);
        message.success("Congratulations, you have assigned successfully, please sign in now");
        setTimeout(() => {
          window.location.reload();
          window.location.href = "/signIn"
        }, 1000);
      } catch (err) {
        message.error(err.response.data);
      }
    };
    fetchDataUserRegister();
  };

  return <div id='signUp' className='w-screen h-screen relative ' style={{
    backgroundImage: 'url(./image/bgLogin.png)',
    backgroundSize: 'cover'
  }}>
    <div className='container border'>
      <div className='text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 lg:w-1/2'>
        <Form
          className=' lg:p-20 p-5 border bg-purple-300 bg-opacity-60 rounded-2xl'
          theme={'dark'}
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={handleSubmit}
          style={{
            maxWidth: 800,
          }}
          scrollToFirstError
        >
          <h1 className='pb-5 text-4xl font-semibold'>SIGN UP</h1>
          <Form.Item name="taiKhoan"
            label="Account"
            rules={[
              {
                required: true,
                message: 'Please enter your account!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="matKhau"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="soDienThoai"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please enter your Phone Number!',
                whitespace: true,
              },
              {
                pattern: /^\d{10}$/,
                message: 'Please enter a valid phone number!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item name="maNhom"
            label="Group Code"
            className='hidden'
            initialValue={'GP09'}
            rules={[
              {
                required: true,
                message: 'Please enter your group code(ex: GP09)!',
                whitespace: true,
              },
            ]}>
            <Input disabled={true} placeholder={'GP09'} />
          </Form.Item>
          <Form.Item name="hoTen"
            label="Fullname"
            rules={[
              {
                required: true,
                message: 'Please enter your fullname!',
                whitespace: true,
              },
              {
                pattern: /^[\p{L}\s']+$/u,
                message: 'Please enter a valid name!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item name="email"
            label="Email Address"
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid E-mail!',
              },
              {
                required: true,
                message: 'Please enter your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <button className='btnGlobal' htmlType="submit">
            Sign up
          </button>
          <p className='pt-3'>If you already have an account, click <NavLink to='/signIn' className={'text-pink-600 hover:text-purple-800 font-bold duration-125'}>HERE</NavLink></p>
        </Form>
      </div>
    </div>
  </div>;
}
