import Image from "next/image";
import React, { toLocaleString } from "react";
import Decimal from "decimal.js";
import { typeOfTabs } from "../constants";
import { formatNumberWithCommas } from "../helper";
function Crypto({ crypto, activeTab }) {
  const cryptoInfo = crypto[activeTab];
  const change = crypto.price_info.change;
  const a = new Decimal(crypto.price);
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 hover:bg-white-taupe py-3 transition duration-300 cursor-pointer border-b border-b-gray-300 select-none px-2 md:px-0">
      <div className="flex items-start">
        <Image
          src={crypto.currency1.image}
          alt={cryptoInfo.title}
          width={36}
          height={36}
          className="h-6 w-6 md:h-9 md:w-9"
        />
        <div className="mr-2 flex flex-col">
          <span className="font-bold text-sm md:text-base text-nowrap">
            {crypto[typeOfTabs.currency1].title_fa}
          </span>
          <span className="text-xs text-white-stone">
            {crypto.code.replace("_", "/")}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm md:text-base">
          {formatNumberWithCommas(a.toString())}
        </span>
        <span className="text-white-stone text-xs">
          {crypto[typeOfTabs.currency2].title_fa}
        </span>
      </div>
      <div
        className={`${change > 0 ? "text-green-500" : "text-red-500"} text-xs md:text-base flex items-center justify-center`}
      >
        %{change}
      </div>
    </div>
  );
}

export default Crypto;
