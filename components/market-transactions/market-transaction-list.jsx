import React from "react";
import { typeOfTransactionTabs } from "@/components/constants";
import { formatNumberWithCommas, getTime } from "@/components/helper";
import Decimal from "decimal.js";

function MarketTransactionList({
  transactionList,
  activeTab,
  isMatchTabActive,
}) {
  const priceClassName =
    activeTab === typeOfTransactionTabs.sell
      ? "text-green-light"
      : activeTab === typeOfTransactionTabs.buy
        ? "text-red-500"
        : "text-black-dark dark:text-darkText";
  return (
    <div className="col-span-3 md:col-span-6 mt-4 border-t border-t-gray-400 dark:border-t-darkText">
      {transactionList.map((transaction) => (
        <div
          key={transaction.value + activeTab}
          className="grid grid-cols-3 md:grid-cols-6 hover:bg-white-taupe py-3 transition duration-300 cursor-pointer border-b border-b-gray-300 select-none px-2 md:px-0"
        >
          <div className={`${priceClassName}`}>
            {formatNumberWithCommas(new Decimal(transaction.price))}
          </div>

          <div className="text-sm md:text-base">
            {isMatchTabActive ? transaction.match_amount : transaction?.remain}
          </div>

          {isMatchTabActive ? (
            <div className="text-sm md:text-base">
              {getTime(transaction.time)}
            </div>
          ) : (
            <div className="text-sm md:text-base">{transaction?.value}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MarketTransactionList;
