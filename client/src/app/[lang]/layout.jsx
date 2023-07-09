import { Metadata } from "next";

import { Noto_Sans_Bengali } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ntb = Noto_Sans_Bengali({ subsets: ["latin"] });

export const metadata = {
  title: "Krishika",
  description: "Krishika | One stop solution for our farmer friends",
  icons: ["/favicon.ico"],
};

export default function RootLayout({ children }) {
  return (
    <div className={`${ntb.className}`}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {children}
    </div>
  );
}
