"use client";
import { useMemo, useState } from "react";
import Tab from "./tab";
import MarketContainer from "./market-container";
import Pagination from "./pagination";
import { extractCryptoCurrencyType } from "../helper";
import { typeOfTabs } from "../constants";
import { useSwipeable } from "react-swipeable";
import { div } from "framer-motion/client";

export default function Market({ market, totalItems }) {
  const [activeTab, setActiveTab] = useState(typeOfTabs.currency1);
  const [currentPage, setCurrentPage] = useState(1);
  const [followList, setFollowList] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState("");

  const cryptosUsdtTypeList = extractCryptoCurrencyType(market, "usdt");
  const cryptosIrttTypeList = extractCryptoCurrencyType(market, "irt");

  const tabOrder = [
    typeOfTabs.follow,
    typeOfTabs.currency1,
    typeOfTabs.currency2,
  ];

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = tabOrder.indexOf(activeTab);
      if (currentIndex > 0) {
        setActiveTab(tabOrder[currentIndex - 1]);
        setSwipeDirection("left");
      }
    },
    onSwipedRight: () => {
      const currentIndex = tabOrder.indexOf(activeTab);
      if (currentIndex < tabOrder.length - 1) {
        setActiveTab(tabOrder[currentIndex + 1]);
        setSwipeDirection("right");
      }
    },
    trackMouse: false,
  });

  const activeMarketTabObj = {
    [typeOfTabs.currency1]: cryptosIrttTypeList,
    [typeOfTabs.currency2]: cryptosUsdtTypeList,
    [typeOfTabs.follow]: followList,
  };
  const marketList = activeMarketTabObj[activeTab];

  const paginatedMarket = useMemo(() => {
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    return marketList.slice(start, end);
  }, [currentPage, marketList]);

  return (
    <div className="md:w-10/12 container mx-auto" {...swipeHandlers}>
      <Tab setActiveTab={setActiveTab} activeTab={activeTab} />

      <div
        className={`market-content ${swipeDirection === "left" ? "slide-left" : "slide-right"}`}
      >
        <MarketContainer cryptos={paginatedMarket} activeTab={activeTab} />
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
