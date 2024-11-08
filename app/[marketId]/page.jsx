"use client";
import React, { useMemo, useState } from "react";
import { typeOfTransactionTabs } from "@/components/constants";
import Tab from "@/components/market/tab";
import CryptoTabTitle from "@/components/market/crypto-tab-title";
import MarketTransactionList from "@/components/market-transactions/market-transaction-list";
import useMarketData from "@/components/hooks/use-market-data";
import dynamic from "next/dynamic";

const TransactionSummary = dynamic(
  () => import("@/components/market-transactions/transaction-summary"),
);
const OrderSummary = dynamic(
  () => import("@/components/market-transactions/order-summary"),
);
const MarketData = ({ params }) => {
  const { sellOrders, buyOrders, matches, loading, noResults } = useMarketData(
    params.marketId,
  );

  const [activeTab, setActiveTab] = useState(typeOfTransactionTabs.buy);

  const actionTabs = useMemo(
    () => [
      {
        tabName: typeOfTransactionTabs.buy,
        title: "فروش",
        action: setActiveTab,
      },
      {
        tabName: typeOfTransactionTabs.sell,
        title: "خرید",
        action: setActiveTab,
      },
      {
        tabName: typeOfTransactionTabs.match,
        title: "معاملات",
        action: setActiveTab,
      },
    ],
    [setActiveTab],
  );

  const activeTabList = {
    [typeOfTransactionTabs.sell]: sellOrders,
    [typeOfTransactionTabs.buy]: buyOrders,
    [typeOfTransactionTabs.match]: matches,
  };

  if (loading) {
    return (
      <div className="container text-2xl mt-8 mx-auto">loading 💲💲💲</div>
    );
  }
  if (noResults) {
    return <div className="text-2xl text-center w-full">موردی یافت نشد</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <Tab actionTabs={actionTabs} activeTab={activeTab} />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-6">
            <CryptoTabTitle
              title="قیمت"
              className="pr-2 text-xs md:text-base"
            />
            <CryptoTabTitle
              title="مقدار"
              className="text-xs md:text-base text-right"
            />
            {activeTab !== typeOfTransactionTabs.match && (
              <CryptoTabTitle
                title="کل"
                className="text-xs md:text-base text-right"
              />
            )}
            {activeTab === typeOfTransactionTabs.match && (
              <CryptoTabTitle
                title="زمان"
                className="text-xs md:text-base text-right"
              />
            )}
          </div>

          <MarketTransactionList
            transactionList={activeTabList[activeTab]}
            activeTab={activeTab}
            isMatchTabActive={activeTab === typeOfTransactionTabs.match}
          />
          {activeTab !== typeOfTransactionTabs.match && (
            <TransactionSummary
              activeTabData={
                activeTab === typeOfTransactionTabs.buy ? buyOrders : sellOrders
              }
              activeTab={activeTab}
            />
          )}
        </div>
        {activeTab !== typeOfTransactionTabs.match && (
          <div className="col-span-3 md:col-span-1">
            <OrderSummary
              orders={
                activeTab === typeOfTransactionTabs.buy ? buyOrders : sellOrders
              }
              isBuyactiveTab={activeTab === typeOfTransactionTabs.buy}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketData;
