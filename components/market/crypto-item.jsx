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
    <div className="grid grid-cols-6 hover:bg-white-taupe py-3 transition duration-300 cursor-pointer border-b border-b-gray-300 select-none">
      <div className="flex items-start">
        <Image
          src={crypto.currency1.image}
          alt={cryptoInfo.title}
          width={36}
          height={36}
        />
        <div className="mr-2 flex flex-col">
          <span className="font-bold">
            {crypto[typeOfTabs.currency1].title_fa}
          </span>
          <span className="text-xs text-white-stone">
            {crypto.code.replace("_", "/")}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start">
        <span>{formatNumberWithCommas(a.toString())}</span>
        <span className="text-white-stone text-xs">
          {crypto[typeOfTabs.currency2].title_fa}
        </span>
      </div>
      <div className={change > 0 ? "text-green-500" : "text-red-500"}>
        %{change}
      </div>
    </div>
  );
}

export default Crypto;
