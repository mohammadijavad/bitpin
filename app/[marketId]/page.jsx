"use client";
import React, { useEffect, useState } from "react";
import { typeOfTransactionTabs } from "@/components/constants";
import Tab from "@/components/market/tab";
import CryptoTabTitle from "@/components/market/crypto-tab-title";
import MarketTransactionList from "@/components/market-transactions/market-transaction-list";

import TransactionSummary from "@/components/market-transactions/transaction-summary";
const MarketData = ({ params }) => {
  const [activeTab, setActiveTab] = useState(typeOfTransactionTabs.buy);
  const [sellOrders, setSellOrders] = useState([]);
  const [buyOrders, setBuyOrders] = useState([]);
  const [matches, setMatches] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [calculationResult, setCalculationResult] = useState(null);
  const actionTabs = [
    {
      tabName: typeOfTransactionTabs.buy,
      title: "فروش",
      action: (tab) => setActiveTab(tab),
    },
    {
      tabName: typeOfTransactionTabs.sell,
      title: "خرید",
      action: (tab) => setActiveTab(tab),
    },
    {
      tabName: typeOfTransactionTabs.match,
      title: "معاملات",
      action: (tab) => setActiveTab(tab),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellResponse = await fetch(
          `https://api.bitpin.org/v2/mth/actives/${params.marketId}/?type=sell`
        );
        const sellData = await sellResponse.json();
        setSellOrders(sellData.orders.slice(0, 10));

        const buyResponse = await fetch(
          `https://api.bitpin.org/v2/mth/actives/${params.marketId}/?type=buy`
        );
        const buyData = await buyResponse.json();
        setBuyOrders(buyData.orders.slice(0, 10));

        const matchesResponse = await fetch(
          `https://api.bitpin.org/v1/mth/matches/${params.marketId}/`
        );
        const matchesData = await matchesResponse.json();
        setMatches(matchesData.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [params.marketId]);

  const handleCalculation = () => {
    const totalRemainSell = sellOrders.reduce(
      (acc, order) => acc + parseFloat(order.remain),
      0
    );
    const totalValueSell = sellOrders.reduce(
      (acc, order) => acc + parseFloat(order.value),
      0
    );
    const averagePriceSell =
      sellOrders.reduce(
        (acc, order) =>
          acc + parseFloat(order.price) * parseFloat(order.remain),
        0
      ) / totalRemainSell;

    const totalRemainBuy = buyOrders.reduce(
      (acc, order) => acc + parseFloat(order.remain),
      0
    );
    const totalValueBuy = buyOrders.reduce(
      (acc, order) => acc + parseFloat(order.value),
      0
    );
    const averagePriceBuy =
      buyOrders.reduce(
        (acc, order) =>
          acc + parseFloat(order.price) * parseFloat(order.remain),
        0
      ) / totalRemainBuy;

    const totalRemain = (totalRemainSell + totalRemainBuy) * (percentage / 100);
    const averagePrice = (averagePriceSell + averagePriceBuy) / 2;
    const totalValue = totalRemain * averagePrice;

    // جلوگیری از NaN
    if (!isNaN(totalRemain) && !isNaN(averagePrice) && !isNaN(totalValue)) {
      setCalculationResult({
        totalRemain,
        averagePrice,
        totalValue,
      });
    } else {
      setCalculationResult(null);
    }
  };

  const activeTabList = {
    [typeOfTransactionTabs.sell]: sellOrders,
    [typeOfTransactionTabs.buy]: buyOrders,
    [typeOfTransactionTabs.match]: matches,
  };

  if (
    sellOrders.length === 0 ||
    buyOrders.length === 0 ||
    matches.length === 0
  ) {
    return <h1>loading ...</h1>;
  }

  return (
    <div className="container mx-auto p-4">
      <Tab actionTabs={actionTabs} activeTab={activeTab} />
      <div className="grid md:grid-cols-6 gap-4 mt-6">
        <CryptoTabTitle title="قیمت" className="pr-2 text-xs md:text-base" />
        <CryptoTabTitle
          title="مقدار"
          className="text-xs md:text-base text-center md:text-right"
        />
        {activeTab !== typeOfTransactionTabs.match && (
          <CryptoTabTitle
            title="کل"
            className="text-xs md:text-base text-center md:text-right"
          />
        )}
        {activeTab === typeOfTransactionTabs.match && (
          <CryptoTabTitle
            title="زمان"
            className="text-xs md:text-base text-center md:text-right"
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
  );
};

export default MarketData;
