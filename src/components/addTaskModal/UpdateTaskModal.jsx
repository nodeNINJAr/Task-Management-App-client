import React, { useState, useEffect } from "react";
import { Modal, Input, Radio, Button } from "antd";
import PropTypes from "prop-types";

const UpdateTaskModal = ({ visible, onCancel, onUpdate, task }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [description, setDescription] = useState("");

  //   
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setCategory(task.category || "To-Do");
      setDescription(task.description || "");
    }
  }, [task]);

  //   
  const handleUpdate = () => {
    onUpdate({ ...task, title, category, description });
  };

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
};

export default UpdateTaskModal;
