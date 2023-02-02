// const router = createMemoryRouter([
//     {
//         element: <NavBar/>,
//         errorElement: <ErrorPage/>,
//         children:[
//             {
//                 path: '/',
//                 element: <Home/>,
//             },
//             {
//                 path: '/projects',
//                 element: <Projects/>,
//                 children:[
//                     {
//                         path: '/projects/filename',
//                         element: <DefaultComponent/>
//                     }
//                 ]
//             },
//             {
//                 path: '/store',
//                 element: <Store/>,
//             },
//             {
//                 path: '/documentation',
//                 element: <Documentation/>,
//             },
//             {
//                 path: '/settings',
//                 element: <Settings/>,
//             }
//         ]
//     },
// ])

{/* 
        <div className='absolute flex flex-row items-start p-[8px] gap-[10px] w-[46px] h-[168px] top-[250px]'>
          <div className='flex flex-col items-center px-0 py-[7px] gap-[8px] w-[30px] h-[152px] rounded-[31px]'>
            <div className='w-[32px] h-[16px] -rotate-90'><BsToggleOn className='flex flex-row p-[3px] gap-[6px] absolute fill-[#FF8616] rounded-[16px]'/></div>
            <div className='w-[88px] h-[16px] font-Roboto font-normal font-semibold text-[12px] leading-[16px] flex items-center text-[#FF8616] -rotate-90'>Connect to edge</div>
            <AiOutlineInfoCircle className='w-[16px] h-[16px] absolute fill-[#A3A3B1]'/>
          </div>
        </div> */}
        {/* <div>
          <Outlet/>
        </div> */}
        // import {createRoot} from 'react-dom/client';
        // root.render(
//     <Provider store={store}>
//         <RouterProvider router={router}/>
//     </Provider>
// )
// import DefaultComponent from './components/DefaultComponent';
// const rootElement = document.getElementById("root")
// const root = createRoot(rootElement)
// const router = createMemoryRouter(createRoutesFromElements(
//     <Route element={<AppLayout/>}>
        // <Route path='/' element={<Home/>}/>
        // <Route path='/projects' element={<Projects setTab={setTab} setOpenTabs={setOpenTabs} openTabs={openTabs} tab={tab}/>}>
        //     {/* <Route path='' element={<DefaultComponent/>}/> */}
        //     <Route path='/projects/' element={<Workflows/>}/>
        // </Route>
        // <Route path='/store' element={<Store/>}/>
        // <Route path='/documentation' element={<Documentation/>}/>
        // <Route path='/settings' element={<Settings/>}/>
//     </Route>
// ))

// // const [query, setQuery] = useState('')
  // // const[show, setShow] = useState(false)
  // // const [tab, setTab] = useState('')
  // // const [openTabs, setOpenTabs] = useState([])
  // const [showSidebar, setShowSidebar] = useState(true)

  // import { BsSearch} from "react-icons/bs";
// import {AiOutlinePlus} from "react-icons/ai";
//import { capitalizeFirstLetter } from '../utils/captial';

// import {IoIosArrowForward} from "react-icons/io";
// import Tabs from '../components/Tabs/Tabs';
// import Editor from '../components/Editor/Editor';
// import CreateWorkflow from '../components/CreateWorkflow/CreateWorkflow';
{/* <Tabs setOpenTabs={setOpenTabs} openTabs={openTabs} tab={tab} setTab={setTab} setShowSidebar={setShowSidebar}/>
        <Editor tab={tab}/> */}
        // <div>
        //   <Outlet/>
        // </div>
        // onClick={()=> handleSelect(item)}

        // {!contents ? (
        //   <div className="defaultView">
        //     {/* <BsCodeSquare /> */}
        //     <span>Select a file to display its contents</span>
        //   </div>
        // ) : (
        //   <div className="code">
        //     <SyntaxHighlighter showLineNumbers style={dark}>
        //       {contents}
        //     </SyntaxHighlighter>
        //   </div>
        // )}
        {/* <div className="logo" onClick={() => setShowSidebar((value) => !value)}>
        <BsCodeSquare />
      </div> */}
      // function DefaultComponent({ tab, setTab, setOpenTabs, openTabs }) {
//   let params = useParams()
//     // Not important Just for styling
//   const [showSidebar, setShowSidebar] = useState(true);

//   return (
//     <div className={`App ${showSidebar ? "showSidebar" : "hideSidebar"}`}>
//       <Tabs
//         setOpenTabs={setOpenTabs}
//         openTabs={openTabs}
//         tab={tab}
//         setTab={setTab}
//         setShowSidebar={setShowSidebar}
//       />
//       <Editor tab={tab} />
//     </div>
//   );
// }

// function AppLayout(){
//     return(
//       <>
        
//         <Outlet/>
//       </>
//     )
// }

// function Workflows(){
//     return(
//       <div className='bg-blue-800 absolute left-[292px] top-0'>Select a file</div>
//     )
// }

{/* <Route path='/projects' element={<Workflows/>}/> */}
// console.log(tasks)
    // const contents = tasks(tab)
       // (Not really imporytant, just to make it work well)
       // import { BsCodeSquare } from "react-icons/bs";
       {/* <SyntaxHighlighter showLineNumbers style={dark}>
          {contents}
        </SyntaxHighlighter> */}
        // import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
        // import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism'
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

// const myTheme = createTheme({
//   theme: 'dark',
//   settings: {
//     background: '#1C1C23',
//     foreground: '#75baff',
//     caret: '#5d00ff',
//     selection: '#036dd626',
//     selectionMatch: '#036dd626',
//     lineHighlight: '#8a91991a',
//     gutterBackground: '#1C1C23',
//     gutterForeground: '#8a919966',
//   },
//   styles: [
//     { tag: t.comment, color: '#787b8099' },
//     { tag: t.variableName, color: '#0080ff' },
//     { tag: [t.string, t.special(t.brace)], color: '#5c6166' },
//     { tag: t.number, color: '#5c6166' },
//     { tag: t.bool, color: '#5c6166' },
//     { tag: t.null, color: '#5c6166' },
//     { tag: t.keyword, color: '#5c6166' },
//     { tag: t.operator, color: '#5c6166' },
//     { tag: t.className, color: '#5c6166' },
//     { tag: t.definition(t.typeName), color: '#5c6166' },
//     { tag: t.typeName, color: '#5c6166' },
//     { tag: t.angleBracket, color: '#5c6166' },
//     { tag: t.tagName, color: '#5c6166' },
//     { tag: t.attributeName, color: '#5c6166' },
//   ],
// });

// className={({ isActive }) => (isActive ? activeClassName : className)}

{/* <div className='h-full w-[300px] fixed bg-[#fff] right-1'>
        <iframe
          title='output'
          sandbox='allow-scripts'
          frameBorder='0'
          height='100vh'
          width='300px'
          backgroundColor='white'
          srcDoc={srcDoc}
        />
      </div> */}

    //   const srcDoc =`
    //   <html>
    //     <script>${contents}</script>
    //   </html>
    // `
    // className={`${state===2 ? : }`}

    {/* <Empty 
            icon="CrawlessLogo" 
            iconSize="large" 
            style={{
                minHeight: 600,
                background: 'COLORS.background10'
            }} 
            content={
                <div 
                    style={{display: 'flex'}}>
                    <div 
                        style={{marginRight: 16}}>
                        <Typography.Paragraph 
                            size={20} 
                            style={{color: 'COLORS.foreground30'}}
                        >
                            Show commands
                        </Typography.Paragraph>
                        <Typography.Paragraph 
                            size={20} 
                            style={{color: 'COLORS.foreground30',marginTop: 16}}
                        >
                            Find in file
                        </Typography.Paragraph>
                        <Typography.Paragraph 
                            size={20} 
                            style={{color: 'COLORS.foreground30',marginTop: 16}}
                        >
                            Find globally
                        </Typography.Paragraph>
                        <Typography.Paragraph 
                            size={20} 
                            style={{color: 'COLORS.foreground30',marginTop: 16}}
                        >
                            Start debugging
                        </Typography.Paragraph>
                    </div>
                    <div>
                        <Hotkeys keys={['command', 'shift', 'P']} />
                        <Hotkeys keys={['command', 'F']} style={{marginTop: 16}} />
                        <Hotkeys keys={['command', 'shift', 'F']} style={{marginTop: 16}} />
                        <Hotkeys keys={['F5']} style={{marginTop: 16}} />
                    </div>
                </div>
            } 
        /> */}

        // const handleCompile = () => {
  //   // setProcessing(true);
  //   // const formData = {
  //   //   language_id: language.id,
  //   //   // encode source code in base64
  //   //   source_code: btoa(code),
  //   //   stdin: btoa(customInput),
  //   // };
  //   // const options = {
  //   //   method: "POST",
  //   //   url: process.env.REACT_APP_RAPID_API_URL,
  //   //   params: { base64_encoded: "true", fields: "*" },
  //   //   headers: {
  //   //     "content-type": "application/json",
  //   //     "Content-Type": "application/json",
  //   //     "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
  //   //     "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  //   //   },
  //   //   data: formData,
  //   // };

  //   // axios
  //   //   .request(options)
  //   //   .then(function (response) {
  //   //     console.log("res.data", response.data);
  //   //     const token = response.data.token;
  //   //     checkStatus(token);
  //   //   })
  //   //   .catch((err) => {
  //   //     let error = err.response ? err.response.data : err;
  //   //     // get error status
  //   //     let status = err.response.status;
  //   //     console.log("status", status);
  //   //     if (status === 429) {
  //   //       console.log("too many requests", status);

  //   //       showErrorToast(
  //   //         `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
  //   //         10000
  //   //       );
  //   //     }
  //   //     setProcessing(false);
  //   //     console.log("catch block...", error);
  //   //   });
  // };

  // // const checkStatus = async (token) => {
  // //   const options = {
  // //     method: "GET",
  // //     url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
  // //     params: { base64_encoded: "true", fields: "*" },
  // //     headers: {
  // //       "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
  // //       "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  // //     },
  // //   };
  // //   try {
  // //     let response = await axios.request(options);
  // //     let statusId = response.data.status?.id;

  // //     // Processed - we have a result
  // //     if (statusId === 1 || statusId === 2) {
  // //       // still processing
  // //       setTimeout(() => {
  // //         checkStatus(token);
  // //       }, 2000);
  // //       return;
  // //     } else {
  // //       setProcessing(false);
  // //       setOutputDetails(response.data);
  // //       showSuccessToast(`Compiled Successfully!`);
  // //       console.log("response.data", response.data);
  // //       return;
  // //     }
  // //   } catch (err) {
  // //     console.log("err", err);
  // //     setProcessing(false);
  // //     showErrorToast();
  // //   }
  // };

   // const showSuccessToast = (msg) => {
  //   toast.success(msg || `Compiled Successfully`, {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined
  //   })
  // }

  // const showErrorToast = (msg)=>{
  //   toast.error(msg || `Something went wrong! Please try again`, {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progess: undefined,
  //   })
  // }

    // const onChange =(e)=>{
  //   handleCompile(e.target.value)
  // }

  // const handleCompile = ()=>{
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       source_code: code,
  //       language_id: '63',
  //       stdin: ''
  //     })
  //   };

  //   fetch('https://cors-anywhere.herokuapp.com/' + API_URL + '/submissions', options)
  //     .then(res => res.json())
  //     .then(body => {
  //       setOutputDetails(body.stdout)
  //     })
  // }

   // const language = {
  //   id: 63,
  //   name: 'JavaScript (Node.js 12.14.0)',
  //   label: 'JavaScript (Node.js 12.14.0)',
  //   value: "javascript",
  // }

  // import { createTheme } from '@uiw/codemirror-themes';
// import { tags as t } from '@lezer/highlight';

  // const statuses = [
  //   {
  //     id: 1,
  //     description: "In Queue",
  //   },
  //   {
  //     id: 2,
  //     description: "Processing",
  //   },
  //   {
  //     id: 3,
  //     description: "Accepted",
  //   },
  //   {
  //     id: 4,
  //     description: "Wrong Answer",
  //   },
  //   {
  //     id: 5,
  //     description: "Time Limit Exceeded",
  //   },
  //   {
  //     id: 6,
  //     description: "Compilation Error",
  //   },
  //   {
  //     id: 7,
  //     description: "Runtime Error (SIGSEGV)",
  //   },
  //   {
  //     id: 8,
  //     description: "Runtime Error (SIGXFSZ)",
  //   },
  //   {
  //     id: 9,
  //     description: "Runtime Error (SIGFPE)",
  //   },
  //   {
  //     id: 10,
  //     description: "Runtime Error (SIGABRT)",
  //   },
  //   {
  //     id: 11,
  //     description: "Runtime Error (NZEC)",
  //   },
  //   {
  //     id: 12,
  //     description: "Runtime Error (Other)",
  //   },
  //   {
  //     id: 13,
  //     description: "Internal Error",
  //   },
  //   {
  //     id: 14,
  //     description: "Exec Format Error",
  //   },
  // ];

   // const enterPress = useKeyPress('Enter')
  // const ctrlPress = useKeyPress('Control')

  // const getOutput = () => {
  //   let statusId = outputDetails?.status?.id;

  //   if (statusId === 6) {
  //     // compilation error
  //     return (
  //       <pre className="px-2 py-1 font-normal text-xs text-red-500">
  //         {atob(outputDetails?.compile_output)}
  //       </pre>
  //     );
  //   } else if (statusId === 3) {
  //     return (
  //       <pre className="px-2 py-1 font-normal text-xs text-green-500">
  //         {atob(outputDetails.stdout) !== null
  //           ? `${atob(outputDetails.stdout)}`
  //           : null}
  //       </pre>
  //     );
  //   } else if (statusId === 5) {
  //     return (
  //       <pre className="px-2 py-1 font-normal text-xs text-red-500">
  //         {`Time Limit Exceeded`}
  //       </pre>
  //     );
  //   } else {
  //     return (
  //       <pre className="px-2 py-1 font-normal text-xs text-red-500">
  //         {atob(outputDetails?.stderr)}
  //       </pre>
  //     );
  //   }
  // };

    // const onChange = (action, data) => {
  //   switch(action){
  //     case 'code': {
  //       setCode(data)
  //       break;
  //     }
  //     default:{
  //       console.warn('case not handled', action, data)
  //     }
  //   }
  // }

  

  // const handleCompile = async (code) => {
  //   try {
  //     // Make a POST request to the Judge0 API to run the code
  //     const response = await axios.post(`${judge0ApiUrl}submissions/?base64_encoded=false`, {
  //       source_code: code,
  //       language_id: 63, // C++
  //       stdin: '',
  //     });

  //     // Get the submission id from the response
  //     const submissionId = response.data.token;

  //     // Poll the Judge0 API to get the output of the code
  //     const result = await axios.get(`${judge0ApiUrl}submissions/${submissionId}`);

  //     // Update the output state with the result
  //     setOutput(result.data.stdout);
  //   } catch (error) {
  //     // Handle any errors
  //     console.error(error);
  //   }
  // };

  // const [processing, setProcessing] = useState(null)
  // const [customInput, setCustomInput] = useState('')

  // const onChange = useCallback((value, viewUpdate) => {
  //   console.log('value:', value);
  // }, []);

    // const run =(code)=>{
  //   const options = {
  //     method: 'POST',
  //     url: process.env.REACT_APP_RAPID_API_URL,
  //     params: {base64_encoded: 'true', fields: '*'},
  //     headers: {
  //       'content-type': 'application/json',
  //       'Content-Type': 'application/json',
  //       'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  //       'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
  //     },
  //     data: {
  //       "language_id":63,
  //       "source_code":code,
  //       "stdin":"",
  //       'expected_output': '',
  //       'expected_return_code': 0,
  //       'expected_signal': 0,
  //       'max_cpu_time': 5,
  //       'max_memory': 262144,
  //       'max_stack': 262144,
  //       'max_output_size': 16777216,
  //       'max_processes_and_or_threads': 1,
  //       'enable_per_process_and_thread_time_limit': false,
  //       'enable_per_process_and_thread_memory_limit': false,
  //       'enable_per_process_and_thread_verbose_mode': false,
  //       'custom_comparator': ''
  //     }
  //   };
    
  //   axios.request(options).then(function (response) {
  //     const result = response.json()
  //     setOutput(result.stdout);
  //     console.log(result.stdout)
  //   }).catch(function (error) {
  //     console.error(error);
  //   });
  // }


  // exec('compiler -o output.js input.js', (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`Error: ${error}`);
    //     return;
    //   }

    //   if (stderr) {
    //     console.error(`Error: ${stderr}`);
    //     return;
    //   }

    //   // Write the JavaScript code to the input file
    //   fs.writeFileSync('input.js', code);

    //   // Read the compiled code from the output file
    //   const compiledCode = fs.readFileSync('output.js', 'utf8');
    //   setCompiledCode(compiledCode);
    // });
    // useEffect(() => {
  //   const code = 'console.log("Hello, world!");';
  //   compile(code);
  // }, []);

  // const filepath = generateFile(javascript, code)
  //   return filepath

    // const dirCodes = path.join(__dirname, 'codes')

  // const generateFile = async (format, content) =>{
  //   const jobId = uuidv4()
  //   const filename = `${jobId}.${format}`
  //   const filepath = path.join(dirCodes, filename)
  //   await fs.writeFileSync(filepath, content)
  //   return filepath
  // }

  // import { v4 as uuidv4 } from 'uuid';
  // import axios from 'axios'
  // const fs = window.require('fs');
  // const path = window.require('path')

  // const [output, setOutput] = useState(null)
  // const [errorMessage, setErrorMessage] = useState('')
  // const [code, setCode] = useState(contents)

  {/* <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}

      // import { ToastContainer} from 'react-toastify'

        