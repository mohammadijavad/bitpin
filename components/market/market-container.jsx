import React, { useMemo } from "react";
import Crypto from "./crypto-item";
import CryptoTabTitle from "./crypto-tab-title";
import NoResult from "../no-result";
function MarketContainer({ cryptos, activeTab }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 mt-4">
      <CryptoTabTitle title="نام ارز" className="pr-2 text-xs md:text-base" />
      <CryptoTabTitle
        title="قیمت"
        className="text-xs md:text-base text-center"
      />
      <CryptoTabTitle
        title="تغییر 24 ساعت"
        className="text-xs md:text-base text-center"
      />

      {cryptos.length === 0 ? (
        <NoResult />
      ) : (
        <div className="col-span-3 md:col-span-6 mt-4 border-t border-t-gray-400 dark:border-t-darkText">
          {cryptos.map((crypto) => (
            <Crypto key={crypto.id} crypto={crypto} activeTab={activeTab} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MarketContainer;
