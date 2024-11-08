import React from "react";
import { calculateSummary } from "@/components/helper";
import { typeOfTransactionTabs } from "@/components/constants";
function TransactionSummary({ activeTabData, activeTab }) {
  const activeTabType = typeOfTransactionTabs.buy === activeTab;
  console.log(activeTab);
  if (activeTabData.length === 0) return null;
  const summary = calculateSummary(activeTabData);
  console.log(summary);
  return (
    <div className="mt-4 flex items-center justify-start gap-4">
      <div>
        <span>مجموع باقی‌مانده: </span>
        <span
          className={`${activeTabType ? "text-red-500" : "text-green-light"}`}
        >
          {summary?.totalRemain}
        </span>
      </div>
      <div>
        <span>مجموع ارزش: </span>
        <span
          className={`${activeTabType ? "text-red-500" : "text-green-light"}`}
        >
          {summary?.totalValue}
        </span>
      </div>
      <div>
        <span>میانگین وزنی قیمت: </span>
        <span
          className={`${activeTabType ? "text-red-500" : "text-green-light"}`}
        >
          {summary?.weightedAveragePrice}
        </span>
      </div>
    </div>
  );
}

export default TransactionSummary;
