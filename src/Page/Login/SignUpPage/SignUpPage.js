import React from "react";
import { dangKy } from "../../../Services/api";
import { message } from "antd";

export default function SignUpPage() {
  const handleSubmit = (values) => {
    console.log("Form values:", values);
    let fetchDataUserRegister = async () => {
      try {
        let res = await dangKy(values);

        message.success("Đăng ký thành công");
      } catch (err) {
        message.error(err.response.data);
      }
    };
    fetchDataUserRegister();
  };
  return <div className='page-container'></div>;
}
