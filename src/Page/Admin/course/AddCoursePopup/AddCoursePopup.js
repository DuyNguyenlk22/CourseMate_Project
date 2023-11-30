import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal, Form } from "antd";
import React, { useState } from "react";
import FormAdd from "./FormAdd";

export default function AddCoursePopup({ fetchDataCourseList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        type='default'
        className='flex items-center btnGlobal duration-300'
        onClick={showModal}
      >
        <PlusCircleOutlined className="mr-2" /> Add New Course
      </button>
      <Modal
        width={"60%"}
        footer={false}
        open={isModalOpen}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={false}
      >
        <FormAdd
          form={form}
          setIsModalOpen={setIsModalOpen}
          fetchDataCourseList={fetchDataCourseList}
        />
      </Modal>
    </>
  );
}
