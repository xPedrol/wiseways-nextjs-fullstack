"use client";
import { Ban, CircleCheckBig, Info } from "lucide-react";
import style from "./toast.module.scss";
import { createContext, useContext, useRef, useState } from "react";

type Toast = {
  message: string;
  type: "success" | "error" | "info";
};
const getToastIcon = (type: Toast["type"]) => {
  switch (type) {
    case "success":
      return <CircleCheckBig size={30} />;
    case "error":
      return <Ban size={30} />;
    case "info":
      return <Info size={30} />;
    default:
      return "";
  }
};
type Context = {
  showToast: (message: Toast["message"], type: Toast["type"]) => void;
  hideToast: () => void;
};
const ToastContext = createContext<Context>({
  showToast: (message: Toast["message"], type: Toast["type"]) => {},
  hideToast: () => {},
});
type Props = {
  children: React.ReactNode;
};
export const ToastProvider = ({ children }: Props) => {
  const queue = useRef<Toast[]>([]);
  const [key, setKey] = useState(0);
  const handleForceUpdate = () => {
    setKey((prevKey) => prevKey + 1);
  };
  const showToast = (message: Toast["message"], type: Toast["type"]) => {
    queue.current.push({ message, type });
    handleForceUpdate();
    setTimeout(() => {
      hideToast();
    }, 3000);
  };
  const hideToast = () => {
    queue.current.shift();
    console.log(queue);
    handleForceUpdate();
  };
  const value = {
    showToast,
    hideToast,
  };
  return (
    <ToastContext.Provider value={value}>
      <div className={style.container}>
        {queue.current.map((toast, index) => (
          <div key={index} className={`${style.toast} ${style[toast.type]}`}>
            {getToastIcon(toast.type)}
            {toast.message}
          </div>
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
