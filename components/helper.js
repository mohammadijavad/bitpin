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