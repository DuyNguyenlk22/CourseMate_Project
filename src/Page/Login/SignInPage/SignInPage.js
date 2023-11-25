import React from "react";
import { useDispatch } from "react-redux";
import { setInfo } from "../../../Redux/userSlice/userSlice";
import { dangNhap } from "../../../Services/api";
import { message } from "antd";
import { localServices } from "../../../Services/localServices";
import { useNavigate } from "react-router";

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    let logIn = async () => {
      try {
        let res = await dangNhap(values);
        dispatch(setInfo(res.data));
        localServices.set(res.data);
        message.success("Đăng nhập thành công");
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

  return <div></div>;
}
