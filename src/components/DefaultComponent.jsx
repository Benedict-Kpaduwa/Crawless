// import React,{useState} from 'react'
// import Editor from './Editor/Editor';
// import Tabs from './Tabs/Tabs'

// export default function DefaultComponent({ tab, setTab, setOpenTabs, openTabs }) {
//     // const [tab, setTab] = useState("");
//     // const [openTabs, setOpenTabs] = useState([]);
  
//     // Not important Just for styling
//     const [showSidebar, setShowSidebar] = useState(true);
  
//     return (
//       <div className={`App ${showSidebar ? "showSidebar" : "hideSidebar"}`}>
//         <Tabs
//           setOpenTabs={setOpenTabs}
//           openTabs={openTabs}
//           tab={tab}
//           setTab={setTab}
//           setShowSidebar={setShowSidebar}
//         />
//         <Editor tab={tab} />
//       </div>
//     );
//   }