import React from "react";
import PropTypes from "prop-types";
import { SmileOutlined } from "@ant-design/icons";

const Empty = ({category}) => {

    // 
  return (
    <div className="flex justify-center items-center pt-20 font-Josefin text-gray-400">
      <div style={{ textAlign: "center" }}>
         <SmileOutlined style={{ fontSize: 20 }} />
        <p>{category==="To-Do" && "Nothing to do? Add a task and get the ball rolling!" || category === "In Progress" && "Nothing in progress. Let’s turn plans into action!"|| category==="Done" && "No tasks completed yet. Keep going—you’re closer than you think!"}</p>
      </div>
    </div>
  );
};
Empty.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Empty;

