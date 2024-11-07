import { typeOfTabs } from "../constants";
export default function Tab({ setActiveTab, activeTab }) {
  const actionTabs = [
    {
      action: (tabName) => setActiveTab(tabName),
      title: "دیده بان",
      tabName: typeOfTabs.follow,
    },
    {
      action: (tabName) => setActiveTab(tabName),
      title: "پایه تومان",
      tabName: typeOfTabs.currency1,
    },
    {
      action: (tabName) => setActiveTab(tabName),
      title: "پایه تتر",
      tabName: typeOfTabs.currency2,
    },
  ];

  return (
    <div className="w-full border-b border-b-black-dark dark:border-b-gray-400">
      {actionTabs.map(({ action, tabName, title }, index) => (
        <button
          key={tabName}
          onClick={() => action(tabName)}
          className={` pb-2 border-b-2 border-transparent ${index > 0 ? "px-6" : "pl-6"} ${activeTab === tabName ? "border-b-green-light text-white" : "text-gray-400"}`}
        >
          {title}
        </button>
      ))}
    </div>
  );
}
