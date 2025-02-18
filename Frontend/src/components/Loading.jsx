import React from 'react'
import loadingIcon from '@/assets/images/images.png'
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-violet-500 rounded-full animate-spin"></div>
    </div>
  );
};


export default Loading

