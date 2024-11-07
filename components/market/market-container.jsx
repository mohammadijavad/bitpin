import React, { useMemo } from "react";
import Crypto from "./crypto-item";
import CryptoTabTitle from "./crypto-tab-title";
import NoResult from "../no-result";
function MarketContainer({ cryptos, activeTab }) {
  return (
    <div className="grid grid-cols-6 mt-4">
      <CryptoTabTitle title="نام ارز" />
      <CryptoTabTitle title="قیمت" />
      <CryptoTabTitle title="تغییر 24 ساعت" />

      {cryptos.length === 0 ? (
        <NoResult />
      ) : (
        <div className="col-span-6 mt-4 border-t border-t-gray-400 dark:border-t-darkText">
          {cryptos.map((crypto) => (
            <Crypto key={crypto.id} crypto={crypto} activeTab={activeTab} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MarketContainer;
