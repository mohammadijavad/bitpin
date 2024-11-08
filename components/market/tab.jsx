export default function Tab({ activeTab, actionTabs }) {
  return (
    <div className="w-full border-b border-b-black-dark dark:border-b-gray-400">
      {actionTabs.map(({ action, tabName, title }, index) => (
        <button
          key={tabName}
          onClick={() => action(tabName)}
          className={`text-sm md:text-base mr-2 md:mr-0 pb-2 border-b-2 border-transparent ${index > 0 ? "px-6" : "pl-6"} ${activeTab === tabName ? "border-b-green-light text-white" : "text-gray-400"}`}
        >
          {title}
        </button>
      ))}
    </div>
  );
}
