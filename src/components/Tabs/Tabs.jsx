import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../contexts/store";
import {Svg} from '@crawless/ui'
export default function Navbar() {
  const Router = useNavigate();
  const { openTabs, setOpenTabs, tab} = useStore();

  const closeTab = (tabToClose) => {
    setOpenTabs((currentOpenTabs) =>
      currentOpenTabs.filter((item) => item !== tabToClose)
    );

    // Set the current tab to the tab beside the one being deleted
    const tabIndex = openTabs.findIndex((item) => item === tabToClose);
    let newFocusTab;
    if (tab === tabToClose) {
      if (tabIndex === 0) {
        if (openTabs.length > 1) newFocusTab = openTabs[1];
        else newFocusTab = null;
      } else {
        newFocusTab = openTabs[tabIndex - 1];
      }
      Router(`/projects/${newFocusTab}`);
    }
  };


  return (
    <div className="flex flex-row items-start p-0 fixed w-[1100px] h-[33px] right-0 left-[293px] top-0 overflow-y-scroll overflow-x-visible">
      {openTabs?.map((item, index) => (
        <div
          key={`tab ${index}`}
          className={`relative bg-[#1C1C23] rounded-[0px] flex flex-row border-l-2 border-r-2 border-[black] items-center justify-center w-[114px] h-[32px] ${tab === item ? "bg-[#2F2F3D] w-[115px] border-t-2 border-t-blue-500" : ""}`}
        >
          <div className="flex flex-row w-full items-center">
            <Link className='flex flex-row items-center py-1 px-2 gap-[4px] w-[83px] h-[16px]' to={`/projects/${item}`}>
              <Svg.Workflow/>
              <div className="w-[8px] h-[16px] font-Roboto font-normal font-semibold text-[12px] leading-[16px] text-[#ececec]">
                {item}
              </div>
            </Link>
            {tab === item ? 
              <div className="cursor-pointer w-[32px] h-[32px] relative" onClick={() => closeTab(item)}>
                <div className="flex flex-row hover:text-gray-100 items-center justify-end pt-1 gap-[8px] rounded-[4px] text-[20px] absolute top-[6.25%] bottom-[6.25%] w-[20px] h-[20px]">
                  &times;
                </div>
              </div>
            : ''}
          </div>
        </div>
      ))}
    </div>
  );
}
