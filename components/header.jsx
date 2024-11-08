import Image from "next/image";
import logo from "@/public/logo.svg";
import ThemeSwitch from "./theme-switch";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-16">
      <div className="flex justify-between items-center container h-full mx-auto mt-3">
        <Link href="/">
          <Image src={logo} alt="bit pin" width={127} height={64} />
        </Link>
        <div className="flex items-center gap-6 justify-between px-4 md:px-0">
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
