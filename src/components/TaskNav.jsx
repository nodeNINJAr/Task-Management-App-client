import React from "react";
import PropTypes from "prop-types";
import TaskFormModal from "./TaskFormModal";
import SignOut from "./SignOut";


// 
const TaskNav = ({refresh,setRefresh}) => {

  //
  return (
    <div className="flex justify-between items-center">
      {/* task add from */}
      <TaskFormModal refresh={refresh} setRefresh={setRefresh} />
      {/* signout and profile */}
      <SignOut />
    </div>
  );
};
TaskNav.propTypes = {
  refresh: PropTypes.bool.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default TaskNav;

