import { DatePicker, Form, Image, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { localServices } from "../../../../Services/localServices";
import { themKhoaHocUploadHinh } from "../../../../Services/api";

export default function FormAdd({ form, setIsModalOpen, fetchDataCourseList }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const onFinish = async (values) => {
    const formData = new FormData();
    for (let key in values) {
      if (key !== "hinhAnh" && key !== "ngayTao") {
        formData.append(key, values[key]);
      }
    }
    formData.append("ngayTao", dayjs(values.ngayTao).format("DD/MM/YYYY"));
    if (selectedImg) {
      formData.append("hinhAnh", selectedImg, selectedImg.name);
    }
    try {
      await themKhoaHocUploadHinh(formData);
      message.success("Add course successfully");
      fetchDataCourseList();
      setIsModalOpen(false);
      setImgSrc(null);
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    setSelectedImg(file);
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      taiKhoanNguoiTao: localServices?.get().taiKhoan,
      maNhom: "GP09",
      nguoiTao: localServices?.get().hoTen,
      maKhoaHoc: Math.floor(Math.random() * 10000),
      ngayTao: dayjs(),
    });
  }, [form]);

  return (
    <>
      <div className='flex flex-col items-center justify-center pt-5'>
        <h1 className='font-bold text-2xl mb-5'>ADD NEW COURSE</h1>
        <Form
          form={form}
          name='FormAddCourse'
          onFinish={onFinish}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          className='w-[80%]'
          initialValues={{
            maDanhMucKhoaHoc: " ",
          }}>
          <Form.Item label='Account' name='taiKhoanNguoiTao' className='hidden'>
            <Input />
          </Form.Item>
          <Form.Item className='hidden' label='Course Id' name='maKhoaHoc'>
            <Input />
          </Form.Item>
          <Form.Item
            label='Sub-name'
            name='biDanh'
            rules={[
              {
                required: true,
                message: "Please input sub-name",
                whitespace: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='Rate'
            name='danhGia'
            rules={[
              {
                required: true,
                message: "Please rate this course",
                whitespace: true,
              },
            ]}>
            <Input type='number' />
          </Form.Item>
          <Form.Item
            label='Course name'
            name='tenKhoaHoc'
            rules={[
              {
                required: true,
                message: "Please input course name",
                whitespace: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='View'
            name='luotXem'
            rules={[
              {
                required: true,
                message: "Please input view",
              },
            ]}>
            <Input type='number' />
          </Form.Item>
          <Form.Item
            label='Categories'
            name='maDanhMucKhoaHoc'
            rules={[
              {
                required: true,
                message: "Please choose categories",
                whitespace: true,
              },
            ]}>
            <Select
              options={[
                { label: "Choose Categories", disabled: true },
                { value: "BackEnd", label: "BackEnd" },
                { value: "Design", label: "Design" },
                { value: "DiDong", label: "DiDong" },
                { value: "FrontEnd", label: "FrontEnd" },
                { value: "FullStack", label: "FullStack" },
                { value: "TuDuy", label: "TuDuy" },
              ]}
            />
          </Form.Item>
          <Form.Item className='hidden' label='Creator' name='nguoiTao'>
            <Input />
          </Form.Item>
          <Form.Item
            label='Describe'
            name='moTa'
            rules={[
              {
                required: true,
                message: "Please input your describe",
                whitespace: true,
              },
            ]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label='Creation date' name='ngayTao' className='hidden'>
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item className='hidden' label='GroupCode' name='maNhom'>
            <Select
              style={{
                width: 120,
              }}
              options={[
                { value: "GP01", label: "GP01" },
                { value: "GP02", label: "GP02" },
                { value: "GP03", label: "GP03" },
                { value: "GP04", label: "GP04" },
                { value: "GP05", label: "GP05" },
                { value: "GP06", label: "GP06" },
                { value: "GP07", label: "GP07" },
                { value: "GP08", label: "GP08" },
                { value: "GP09", label: "GP09" },
                { value: "GP10", label: "GP10" },
                { value: "GP11", label: "GP11" },
                { value: "GP12", label: "GP12" },
                { value: "GP13", label: "GP13" },
                { value: "GP14", label: "GP14" },
                { value: "GP15", label: "GP15" },
              ]}
            />
          </Form.Item>
          <Form.Item label='Picture' name='hinhAnh'>
            <input
              type='file'
              onChange={handleChangeFile}
              accept='image/png , image/jpeg , image/jpg'
            />
            <Image src={imgSrc} width={100} height={100} />
          </Form.Item>
          <div className='flex justify-center'>
            <button
              size={"large"}
              className='btnGlobal duration-300 text-white'
              htmlType='submit'>
              Add Course
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
