import Image from "next/image";
import logo from "@/public/logo.svg";
import ThemeSwitch from "./theme-switch";

export default function Header() {
  return (
    <header className="w-full h-16">
      <div className="flex justify-between items-center container h-full mx-auto mt-3">
        <div>
          <Image src={logo} alt="bit pin" width={127} height={64} />
        </div>
        <div className="flex items-center gap-6">
          <div>
            <button className="py-3 px-6 rounded-lg text-black-dark bg-green-light">
              ثبت نام
            </button>
          </div>
          <div>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}
