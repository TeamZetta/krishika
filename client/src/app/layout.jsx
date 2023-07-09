import { defaultLocale } from "../../middleware";
import "./globals.css";
import ContextProvider from "@/context/ContextProvider";

export const metadata = {
  title: "Krishika",
  description: "Krishika | One stop solution for our farmer friends",
  icons: ["/favicon.ico"],
};

export default function RootLayout({ params, children }) {
  return (
    <html lang={params.lang ?? defaultLocale}>
      <body className="bg-light-background flex items-center justify-center ">
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
