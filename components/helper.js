export function extractCryptoCurrencyType(list=[], currencyName='irt',) {
    if (list.length > 0) {
        return list.filter(
    (currency) => currency['currency2'].code.toLowerCase() === currencyName
  );
    } 
    return []
}

export function formatNumberWithCommas(number) {
 return number>1  ?number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):number
}

export function getTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, '0'); 
const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`
}

 export function calculateSummary(data) {
    const totalRemain = data.reduce((sum, item) => sum + parseFloat(item.remain), 0);
    const totalValue = data.reduce((sum, item) => sum + parseFloat(item.value), 0);
    const weightedPriceSum = data.reduce((sum, item) => sum + parseFloat(item.price) * parseFloat(item.amount), 0);
    const totalAmount = data.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const weightedAveragePrice = totalAmount > 0 ? (weightedPriceSum / totalAmount) : 0;

    return {
      totalRemain: totalRemain.toFixed(6),
      totalValue: totalValue.toFixed(2),
      weightedAveragePrice: weightedAveragePrice.toFixed(2),
    };
  };