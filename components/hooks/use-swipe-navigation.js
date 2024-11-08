import { useSwipeable } from "react-swipeable";

import { typeOfTabs } from "@/components/constants";
function useSwipeNavigation(activeTab, setActiveTab) {
  const tabOrder = [typeOfTabs.currency1, typeOfTabs.currency2];

  return useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = tabOrder.indexOf(activeTab);
      if (currentIndex > 0) {
        setActiveTab(tabOrder[currentIndex - 1]);
      }
    },
    onSwipedRight: () => {
      const currentIndex = tabOrder.indexOf(activeTab);
      if (currentIndex < tabOrder.length - 1) {
        setActiveTab(tabOrder[currentIndex + 1]);
      }
    },
    trackMouse: false,
  });
}
export default useSwipeNavigation