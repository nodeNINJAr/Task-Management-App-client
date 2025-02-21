import React, { useState, useEffect } from "react";
import { Modal, Input, Radio, Button, DatePicker } from "antd";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { format } from "date-fns";

const { RangePicker } = DatePicker;

const UpdateTaskModal = ({ visible, onCancel, onUpdate, task, error}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [description, setDescription] = useState("");
  const [dates, setDates] = useState([dayjs(), dayjs()]);

  // ** Initialize form fields when the task prop changes
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setCategory(task.category || "To-Do");
      setDescription(task.description || "");
      // Set dates if they exist in the task object
      if (task.timestamp && task.dueDate) {
        setDates([dayjs(task.timestamp), dayjs(task.dueDate)]);
      }
    }
  }, [task]);

  // Handle date range change
  const handleDateChange = (dates) => {
    setDates(dates);
   
  };

  // Handle update
  const handleUpdate = () => {
    if (!title || !category || !description || !dates || dates.length !== 2) {
      return;
    }

    // Format dates using date-fns
    const formattedEndDate = format(dates[1].toDate(), "yyyy-MM-dd");

    const updatedTask = {
      ...task,
      title,
      category,
      description,
      dueDate: formattedEndDate,
    };

    onUpdate(updatedTask);
  };


  // 
  return (
    <Modal
      title="Update Task"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          <span className="font-Josefin">Cancel</span>
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          <span className="font-Josefin">Update</span>
        </Button>,
      ]}
    >
      <div className="modal-content">
         {error && <p className="bg-red-300 rounded-md text-white px-6 py-2 mb-4 font-Roboto">{error}</p>}
        <div className="form-group">
          <label className="mb-2" htmlFor="title">
            Task Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Update Task Name..."
          />
        </div>

        <div className="space-y-2">
          <div className="form-group">
            <label className="mb-2">Category</label>
            <Radio.Group
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <Radio value="To-Do">To-Do</Radio>
              <Radio value="In Progress">In Progress</Radio>
              <Radio value="Done">Done</Radio>
            </Radio.Group>
          </div>

          <div className="form-group">
            <label className="mb-2">Due Date</label>
            <RangePicker
              value={dates}
              onChange={handleDateChange}
              disabled={[ true,false]}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="mb-2" htmlFor="description">
            Description
          </label>
          <Input.TextArea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Update Description..."
          />
        </div>
      </div>
    </Modal>
  );
};

UpdateTaskModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  error: PropTypes.string,
};

export default UpdateTaskModal;