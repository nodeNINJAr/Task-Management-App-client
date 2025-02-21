import { useState, useEffect } from 'react';
import {MoonOutlined, SunOutlined} from '@ant-design/icons';

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <button className='text-2xl dark:text-gray-300 flex justify-center items-center cursor-pointer' onClick={toggleDarkMode}>
      {isDarkMode ?<SunOutlined /> : <MoonOutlined />}
    </button>
  );
};

export default DarkMode;
