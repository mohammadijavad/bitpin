import React, { useEffect, useMemo, useState } from "react";

function OrderSummary({ orders, isBuyactiveTab }) {
  const [percentage, setPercentage] = useState("");
  const [summary, setSummary] = useState({
    totalRemain: "0.000000",
    weightedAveragePrice: "0.00",
    totalValue: "0.00",
  });

  function handleChangePercentage(value) {
    const numberRegex = /^[0-9]*\.?[0-9]*$/;
    if (numberRegex.test(value)) {
      setPercentage(value);
    }
  }

  const calculateSummaryByPercentage = useMemo(
    () => (orders, percentage) => {
      const totalRemain = orders.reduce(
        (sum, order) => sum + parseFloat(order.remain || 0),
        0
      );
      const targetRemain = (percentage / 100) * totalRemain;

      let accumulatedRemain = 0;
      let weightedPriceSum = 0;
      let totalValue = 0;

      for (let order of orders) {
        const remain = parseFloat(order.remain || 0);
        const price = parseFloat(order.price || 0);
        const value = parseFloat(order.value || 0);

        if (accumulatedRemain + remain <= targetRemain) {
          accumulatedRemain += remain;
          weightedPriceSum += price * remain;
          totalValue += value;
        } else {
          const remainingNeeded = targetRemain - accumulatedRemain;
          accumulatedRemain += remainingNeeded;
          weightedPriceSum += price * remainingNeeded;
          totalValue += price * remainingNeeded;
          break;
        }
      }

      const weightedAveragePrice =
        accumulatedRemain > 0 ? weightedPriceSum / accumulatedRemain : 0;

      return {
        totalRemain: accumulatedRemain.toFixed(6),
        weightedAveragePrice: weightedAveragePrice.toFixed(2),
        totalValue: totalValue.toFixed(2),
      };
    },
    []
  );

  useEffect(() => {
    setSummary(calculateSummaryByPercentage(orders, percentage));
  }, [percentage, calculateSummaryByPercentage, orders]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full md:w-2/3 md:h-2/3 border rounded-md overflow-hidden px-2 mt-5 md:mt-0 pb-4 md:pb-0">
        <div className="mt-4">
          <label htmlFor="number-input" className="py-2 text-sm">
            مقدار
          </label>
          <input
            type="text"
            id="number-input"
            aria-describedby="helper-text-explanation"
            className={`focus:outline-none border-b border-b-transparent w-full p-3 rounded-md ${isBuyactiveTab ? "focus:border-b-red-500" : "focus:border-b-green-light"}`}
            placeholder="درصد را وارد کنید"
            onChange={(e) => handleChangePercentage(e.target.value)}
            value={percentage}
          />
        </div>
        <div className="flex flex-col items-start gap-4 mt-3">
          <div>
            <span className="text-sm">حجم ارز قابل دریافت: </span>
            <span>{summary.totalRemain}</span>
          </div>
          <div>
            <span className="text-sm">میانگین قیمت ارز: </span>
            <span>{summary.weightedAveragePrice}</span>
          </div>
          <div>
            <span className="text-sm">مجموع مبلغ قابل پرداخت: </span>
            <span>{summary.totalValue}</span>
          </div>
        </div>
        <button
          className={`w-full p-3 rounded-md mt-4 ${isBuyactiveTab ? "bg-red-500" : "bg-green-light"}`}
        >
          {isBuyactiveTab ? "فروش" : "خرید"}
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
