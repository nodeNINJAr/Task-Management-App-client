import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, notification } from "antd";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import NewTaskModal from "./addTaskModal/AddTaskModal";

const TaskFormModal = ({setRefresh,refresh}) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState('')

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setError('');
  };

  // Function to handle form submission
  const handleCreate = async (values) => {
    // 
    try{
      const { data } = await axiosSecure.post("/tasks", {
        ...values,
        uid: user?.uid,
      });
      if (data?.insertedId) {
        setError('')
        notification.success({message:"Task Added"})
        setRefresh(!refresh);
        setIsModalVisible(false);
        form.resetFields();
      }
    }catch(err){
      setError(err?.response?.data?.error)
    }
  };

  return (
    <div className="flex justify-center font-Roboto">
      {/* Button to open the modal */}
      <Button variant="outlined" onClick={showModal}>
        <span className="text-base font-medium font-Josefin"> Add Task</span>
      </Button>
       {/*  */}
      <NewTaskModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreate={handleCreate}
        error={error}
        refresh={refresh}
      />
    </div>
  );
};
TaskFormModal.propTypes = {
  setRefresh: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
};

export default TaskFormModal;

