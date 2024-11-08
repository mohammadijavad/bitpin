import { useCallback, useEffect, useState } from "react"; // Custom hook for data fetching

function useMarketData(marketId) {
  const [sellOrders, setSellOrders] = useState([]);
  const [buyOrders, setBuyOrders] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const fetchData = useCallback(async () => {
    try {
      const [sellData, buyData, matchesData] = await Promise.all([
        fetch(
          `https://api.bitpin.org/v2/mth/actives/${marketId}/?type=sell`,
        ).then((res) => res.json()),
        fetch(
          `https://api.bitpin.org/v2/mth/actives/${marketId}/?type=buy`,
        ).then((res) => res.json()),
        fetch(`https://api.bitpin.org/v1/mth/matches/${marketId}/`).then(
          (res) => res.json(),
        ),
      ]);

      const newSellOrders = sellData.orders.slice(0, 10);
      const newBuyOrders = buyData.orders.slice(0, 10);
      const newMatches = matchesData.slice(0, 10);

      setSellOrders(newSellOrders);
      setBuyOrders(newBuyOrders);
      setMatches(newMatches);

      setNoResults(newSellOrders.length === 0 && newBuyOrders.length === 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  }, [marketId]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  return { sellOrders, buyOrders, matches, loading, noResults };
}

export default useMarketData;
