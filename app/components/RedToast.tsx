// components/Toast.js
import React from "react";

type ToastProps = {
  message: string;
  show: boolean;
};

/**
 * Component for the toast.
 * @param {ToastProps} props - The component props.
 * @returns {JSX.Element} The Toast component.
 */
const Toast = ({ message, show }: ToastProps) => {
  return (
    <div
      className={`${
        show ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300 fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg`}
    >
      {message}
    </div>
  );
};

export default Toast;
