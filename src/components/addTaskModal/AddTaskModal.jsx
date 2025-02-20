import React, { useState } from 'react';
import { Modal, Input, Radio, Button, message } from 'antd';
import './NewTaskModal.css';
import PropTypes from 'prop-types';

const NewTaskModal = ({ visible, onCancel, onCreate }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [description, setDescription] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancel = () => {
    onCancel();
  };
  // 
    // Reset form fields
    const resetForm = () => {
      setTitle('');
      setCategory('');
      setDescription('');
    };
  // 
  const handleCreate = () => {
     if(!title || !category || !description){
       return messageApi.open({
        type: 'warning',
        content: <span className="text-base font-medium font-Roboto capitalize">Please Fill all field to add task</span>,
        duration: 5,
      });
     }
    onCreate({ title, category, description });
    resetForm();
  };

  return (
    <Modal
      title="New Task To Do"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
           <span className='font-Josefin'>Cancel</span>
        </Button>,
        <Button key="submit" type="primary" onClick={handleCreate}>
            <span className='font-Josefin'> Create</span>
        </Button>,
      ]}
    >
      <div className="modal-content">
         {contextHolder}
        <div className="form-group">
          <label className='mb-2' htmlFor="title">Title Task</label>
          <Input id="title" value={title} onChange={handleTitleChange} placeholder="Add Task Name..." />
        </div>
        <div className="form-group">
          <label className='mb-2'>Category</label>
          <Radio.Group value={category} onChange={handleCategoryChange}>
            <Radio value="To-Do">To-Do</Radio>
            <Radio value="In Progress">In Progress</Radio>
            <Radio value="Done">Done</Radio>
          </Radio.Group>
        </div>
       
        <div className="form-group">
          <label className='mb-2' htmlFor="description">Description</label>
          <Input.TextArea id="description" value={description} onChange={handleDescriptionChange} placeholder="Add Description..." />
        </div>
      </div>
    </Modal>
  );
};

NewTaskModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default NewTaskModal;