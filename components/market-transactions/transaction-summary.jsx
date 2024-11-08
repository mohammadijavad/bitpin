import React from "react";
import { calculateSummary } from "@/components/helper";
import { typeOfTransactionTabs } from "@/components/constants";
function TransactionSummary({ activeTabData, activeTab }) {
  const activeTabType = typeOfTransactionTabs.buy === activeTab;
  if (activeTabData.length === 0) return null;
  const summary = calculateSummary(activeTabData);
  return (
    <div className="mt-4 flex items-center justify-start gap-4">
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <span className="text-sm">مجموع باقی‌مانده: </span>
        <span
          className={`${activeTabType ? "text-red-500" : "text-green-light"} text-sm`}
        >
          {summary?.totalRemain}
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <span className="text-sm">مجموع ارزش: </span>
        <span
          className={`${activeTabType ? "text-red-500" : "text-green-light"} text-sm`}
        >
          {summary?.totalValue}
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <span className="text-sm">میانگین وزنی قیمت: </span>
        <span
          className={`${activeTabType ? "text-red-500" : "text-green-light"} text-sm`}
        >
          {summary?.weightedAveragePrice}
        </span>
      </div>
    </div>
  );
}

export default TransactionSummary;
