import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { localServices } from "../../../../Services/localServices";
import { Button, DatePicker, Form, Image, Input, Select, message } from "antd";
import { useSelector } from "react-redux";
import { capNhatKhoaHocUpload } from "../../../../Services/api";

export default function FormEdit({ setIsModalEditOpen, fetchDataCourseList }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [form] = Form.useForm();
  let { infoCourse } = useSelector((state) => state.popupEditModal);

  useEffect(() => {
    if (infoCourse) {
      form.setFieldsValue({
        maKhoaHoc: infoCourse.maKhoaHoc,
        biDanh: infoCourse.biDanh,
        danhGia: 0,
        tenKhoaHoc: infoCourse.tenKhoaHoc,
        luotXem: infoCourse.luotXem,
        maDanhMucKhoaHoc: infoCourse.danhMucKhoaHoc.maDanhMucKhoahoc,
        nguoiTao: infoCourse.nguoiTao.hoTen,
        ngayTao: dayjs(infoCourse.ngayTao, "DD/MM/YYYY"),
        maNhom: infoCourse.maNhom,
        hinhAnh: infoCourse.hinhAnh,
        moTa: infoCourse.moTa,
        taiKhoanNguoiTao: infoCourse.nguoiTao.taiKhoan,
      });
    }
  }, [form, infoCourse]);

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
      await capNhatKhoaHocUpload(formData);
      message.success("Updated successfully");
      fetchDataCourseList();
      setIsModalEditOpen(false);
    } catch (err) {
      message.error(err.response.data);
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
    });
  }, [form]);

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='font-bold text-2xl mb-5'>Edit Course</h1>
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
            maDanhMucKhoaHoc: "Chọn khoá học",
            maNhom: "GP09",
          }}
        >
          <Form.Item
            label='Tài khoản người tạo'
            name='taiKhoanNguoiTao'
            className='hidden'
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Mã khoá học'
            name='maKhoaHoc'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã khoá học",
                whitespace: true,
              },
            ]}
          >
            <Input disabled />
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
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Rate'
            name='danhGia'
            rules={[
              {
                required: true,
                message: "Please rate this course",
              },
            ]}
          >
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
            ]}
          >
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
            ]}
          >
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
            ]}
          >
            <Select
              options={[
                {
                  value: "BackEnd",
                  label: "BackEnd",
                },
                {
                  value: "Design",
                  label: "Design",
                },
                {
                  value: "DiDong",
                  label: "DiDong",
                },
                {
                  value: "FrontEnd",
                  label: "FrontEnd",
                },
                {
                  value: "FullStack",
                  label: "FullStack",
                },
                {
                  value: "TuDuy",
                  label: "TuDuy",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label='Người tạo'
            name='nguoiTao'
            className='hidden'
            rules={[
              {
                required: true,
                message: "Vui lòng không bỏ trống",
                whitespace: true,
              },
            ]}
          >
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
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label='Creation date'
            name='ngayTao'
            rules={[
              {
                required: true,
                message: "Please input date",
              },
            ]}
          >
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item label='Mã nhóm' name='maNhom' className='hidden'>
            <Select
              disabled
              style={{
                width: 120,
              }}
            />
          </Form.Item>
          <Form.Item
            label='Hình ảnh'
            rules={[
              {
                required: true,
                message: "Vui lòng chọn hình ảnh",
                whitespace: true,
              },
            ]}
          >
            <input
              type='file'
              onChange={handleChangeFile}
              accept='image/png , image/jpeg , image/jpg'
            />
            <Image
              src={imgSrc === null ? infoCourse.hinhAnh : imgSrc}
              width={100}
              height={100}
            />
          </Form.Item>
          <div className='flex justify-center'>
            <Button
              size='large'
              className='bg-green-500 hover:bg-green-600 duration-300 text-white'
              htmlType='submit'
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
