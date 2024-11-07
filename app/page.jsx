import MarketList from "@/components/market";

async function getMarket() {
  const res = await fetch("https://api.bitpin.ir/v1/mkt/markets/");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export const metadata = {
  title: "لیست قیمت لحظه ای ارز دیجیتال |‌ نمودار قیمت ارزهای دیجیتال",
};
export default async function Home() {
  const market = await getMarket();

  return (
    <div className="flex items-start justify-center w-full my-16 md:my-32">
      <MarketList market={market.results} />
    </div>
  );
}
