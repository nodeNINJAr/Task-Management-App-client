import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const TaskFormModal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Function to handle form submission
  const handleSubmit = async (values) => {
    const { data } = await axiosSecure.post("/tasks", {
      ...values,
      uid: user?.uid,
    });
    if (data?.insertedId) {
      setIsModalVisible(false);
      form.resetFields();
    }
  };

  return (
    <div className="flex justify-center">
      {/* Button to open the modal */}
      <Button variant="outlined" onClick={showModal}>
        <span className="text-base font-semibold"> Add Task</span>
      </Button>

      {/* Modal */}
      <Modal
        title="Add New Task"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="w-full max-w-md"
      >
        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          {/* Title Field */}
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please enter the task title!" },
              { max: 50, message: "Title must not exceed 50 characters!" },
            ]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          {/* Description Field */}
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                max: 200,
                message: "Description must not exceed 200 characters!",
              },
            ]}
          >
            <Input.TextArea rows={3} placeholder="Enter task description" />
          </Form.Item>

          {/* Category Field */}
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select category">
              <Select.Option value="To-Do">To-Do</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskFormModal;
