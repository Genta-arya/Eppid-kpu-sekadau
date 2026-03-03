import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
      <div className="flex justify-center items-center flex-col">
        <ScaleLoader color="#B31B1E" height={40} />
        <p className="text-center mt-4 text-gray-700 font-medium">
          Memproses data, mohon tunggu .....
        </p>
      </div>
    </div>
  );
};

export default Loading;
