import React, { useContext, useState } from "react";
const StoreContext = React.createContext({});
export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [tab, setTab] = useState("");
  const [openTabs, setOpenTabs] = useState([]);
  const [workFlow, setWorkflow] = useState([])

  // Not important Just for styling
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <StoreContext.Provider
      value={{
        tab,
        setTab,
        openTabs,
        setOpenTabs,
        showSidebar,
        setShowSidebar,
        workFlow,
        setWorkflow
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const StoreConsumer = ({ children }) => {
  return (
    <StoreProvider>
      <StoreContext.Consumer>{(data) => children(data)}</StoreContext.Consumer>
    </StoreProvider>
  );
};

export default StoreContext;
