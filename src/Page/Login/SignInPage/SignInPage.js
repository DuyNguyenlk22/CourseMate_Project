import React from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, message } from "antd";
import { setInfo } from "../../../Redux/userSlice/userSlice";
import { dangNhap } from "../../../Services/api";
import { localServices } from "../../../Services/localServices";

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const handleSubmit = (values) => {
    let logIn = async () => {
      try {
        let res = await dangNhap(values);
        dispatch(setInfo(res.data));
        localServices.set(res.data);
        message.success("Sign In successfully");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } catch (err) {
        message.error(err.response.data);
      }
    };
    logIn();
  };

  return <div id='signIn' className='w-screen h-screen relative bg-black'>
    <div className='container border '>
      <div className='text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 lg:w-1/2'>
        <Form
          className='lg:p-20 p-5 border bg-white rounded-2xl w-full'
          theme={'dark'}
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={handleSubmit}
          style={{
            maxWidth: 1200,
          }}
          scrollToFirstError
        >
          <h1 className='pb-5 text-4xl font-semibold'>SIGN IN</h1>
          <Form.Item name="taiKhoan" label="Account"
            rules={[
              {
                required: true,
                message: 'Please insert your account!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="matKhau" label="Password"
            rules={[
              {
                required: true,
                message: 'Please insert your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <button className='btnGlobal' htmlType="submit">Sign In</button>
          <p className='pt-3'>If you haven't asigned yet, click <NavLink to='/signUp' className={'text-pink-600 hover:text-purple-800 font-bold'}>HERE</NavLink></p>
        </Form>
      </div>
    </div>
  </div>;
}
