import React, { useEffect, useState } from 'react';
import { Modal, Input, Radio, Button, message, DatePicker } from 'antd';
import './NewTaskModal.css';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const NewTaskModal = ({ visible, onCancel, onCreate,error,refresh }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();


  // 
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCancel = () => {
    onCancel();
  };

  // ** Reset form fields
  useEffect(()=>{
    setTitle('');
    setCategory('');
    setDescription('');
    setSelectedDate(null);
  },[refresh])


  // 
  const handleCreate = () => {
    if (!title || !category || !description || !selectedDate) {
      return messageApi.open({
        type: 'warning',
        content: <span className="text-base font-medium font-Roboto capitalize">Please fill all fields to add task</span>,
        duration: 5,
      });
    }
    // Format the selected date
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    onCreate({ title, category, description, dueDate: formattedDate });
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
          <span className='font-Josefin'>Create</span>
        </Button>,
      ]}
    >
      <div className="modal-content">
        {contextHolder}
        {/* error */}
        {error && <p className="bg-red-300 rounded-md text-white px-6 py-2 mb-4 font-Roboto">{error}</p>}
        <div className="form-group">
          <label className='mb-2' htmlFor="title">Title Task</label>
          <Input id="title" value={title} onChange={handleTitleChange} placeholder="Add Task Name..." />
        </div>
        <div className='flex justify-between'>
          <div className="form-group">
            <label className='mb-2'>Category</label>
            <Radio.Group value={category} onChange={handleCategoryChange}>
              <Radio value="To-Do">To-Do</Radio>
              <Radio value="In Progress">In Progress</Radio>
              <Radio value="Done">Done</Radio>
            </Radio.Group>
          </div>
          <div className="form-group">
            <label className='mb-2'>Due Date</label>
            <DatePicker value={selectedDate} onChange={handleDateChange} />
          </div>
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
  error: PropTypes.string,
  refresh: PropTypes.any.isRequired,
};

export default NewTaskModal;