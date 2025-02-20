import React from "react";
import Marquee from "react-fast-marquee";
import useAuth from "../hooks/useAuth";

const MarqueeText = () => {
const {user} = useAuth();

    // 
  return (
    <div className="font-Roboto text-black-500 font-normal mb-6">
      <Marquee>
         <span className="font-Josefin font-semibold"> Welcome to TaskManager! </span> <strong className="ml-1 text-green-700"> {user?.displayName}</strong> 🎯 Stay organized, track tasks, and boost productivity with ease. Drag, drop, and update in real-time. Let’s get things done! ✅🚀
      </Marquee>
    </div>
  );
};

export default MarqueeText;
