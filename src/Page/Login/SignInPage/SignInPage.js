import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, message } from "antd";
import { setInfo } from "../../../Redux/userSlice/userSlice";
import { dangNhap } from "../../../Services/api";
import { localServices } from "../../../Services/localServices";

export default function SignInPage() {
  const [isUserLogin, setIsUserLogin] = useState(true);
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
      md: {
        span: 6,
      },
      lg: {
        span: 4,
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
    let logIn = async () => {
      try {
        let res = await dangNhap(values);
        if (res.data.maLoaiNguoiDung === 'HV' && isUserLogin || res.data.maLoaiNguoiDung === 'GV' && !isUserLogin) {
          dispatch(setInfo(res.data));
          localServices.set(res.data);
          message.success("Sign In successfully");
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1000);
        }
        else {
          message.error("You have choose wrong userType, please try again later");

        }
      } catch (err) {
        message.error(err.response.data);
      }
    };
    logIn();
  };
  return <div id='signIn' className='w-screen h-screen relative' style={{
    backgroundImage: 'url(./image/bgLogin.png)',
    backgroundSize: 'cover'
  }}>
    <div className='container border '>
      <div className='rounded-2xl overflow-hidden text-center max-w-800 absolute bg-purple-300 bg-opacity-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 lg:w-1/2'>
        <div class="flex flex-between max-w-800 relative bg-purple-300 bg-opacity-60">
          <button
            onClick={() => { setIsUserLogin(true) }}
            className={`w-1/2 font-bold text-xl transition-all bg-opacity-60 ${isUserLogin ? 'bg-purple-300 text-pink-500' : 'bg-white text-pink-300 rounded-br-xl'}  p-5`}>USER</button>
          <button
            onClick={() => { setIsUserLogin(false) }}
            className={`w-1/2 font-bold text-xl transition-all bg-opacity-60 ${!isUserLogin ? 'bg-purple-300 text-pink-500' : 'bg-white text-pink-300 rounded-bl-xl'}  p-5`}>ADMIN</button>
        </div>
        <div className="lg:p-20 p-5 border w-full max-w-800">
          <Form
            className=''
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
    </div>
  </div>;
}
