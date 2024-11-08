"use client";
import { useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Tab from "./tab";
import MarketContainer from "./market-container";
import { extractCryptoCurrencyType } from "@/components/helper";
import { typeOfTabs } from "@/components/constants";
import useSwipeNavigation from "@/components/hooks/use-swipe-navigation";

const Pagination = dynamic(() => import("./pagination"));

export default function Market({ market }) {
  const [activeTab, setActiveTab] = useState(typeOfTabs.currency1);
  const [currentPage, setCurrentPage] = useState(1);
  const [swipeDirection, setSwipeDirection] = useState("");
  const swipeHandlers = useSwipeNavigation(activeTab, setActiveTab);

  //avoid re-create new functionality for change tab
  const handleTabChange = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  const actionTabs = [
    {
      action: handleTabChange,
      title: "پایه تومان",
      tabName: typeOfTabs.currency1,
    },
    {
      action: handleTabChange,
      title: "پایه تتر",
      tabName: typeOfTabs.currency2,
    },
  ];

  //if market change to execute check cryptos money type
  const cryptosUsdtTypeList = useMemo(
    () => extractCryptoCurrencyType(market, "usdt"),
    [market]
  );
  const cryptosIrttTypeList = useMemo(
    () => extractCryptoCurrencyType(market, "irt"),
    [market]
  );

  const activeMarketTabObj = {
    [typeOfTabs.currency1]: cryptosIrttTypeList,
    [typeOfTabs.currency2]: cryptosUsdtTypeList,
  };
  const marketList = activeMarketTabObj[activeTab];

  const currentPageMarketData = useMemo(() => {
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    return marketList.slice(start, end);
  }, [currentPage, marketList]);

  return (
    <div className="md:w-10/12 container mx-auto" {...swipeHandlers}>
      <Tab actionTabs={actionTabs} activeTab={activeTab} />

      <div
        className={`market-content ${swipeDirection === "left" ? "slide-left" : "slide-right"}`}
      >
        <MarketContainer
          cryptos={currentPageMarketData}
          activeTab={activeTab}
        />
      </div>

      {marketList.length > 10 && (
        <Pagination
          totalItems={marketList.length}
          itemsPerPage={10}
          onPageChange={(page) => setCurrentPage(page)}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
