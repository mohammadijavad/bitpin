import "./globals.css";
import { Vazirmatn } from "next/font/google";
import Header from "../components/header";
import { Providers } from "./providers";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.className}>
      <body className="bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText overflow-x-hidden">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
