import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useStore } from "../contexts/store"
import {fetchWorkflow} from '../redux/features/workflowSlice'
import {Link} from 'react-router-dom';
import {Svg} from '@crawless/ui'

const Projects = () => {
  const {workflows} = useSelector(state => state.workflow)
  const dispatch = useDispatch();
  const { tab } = useStore();

  useEffect(() => {
    dispatch(fetchWorkflow())
  }, [])

  const task = workflows.tasks
  console.log(workflows)
  
  // function newProject(){
  //   console.log("New Project")
  // }
  // function handleSearch(){
  //   console.log("Searching Clicked")
  // }
  
  const getFileNames = () => task?.map(({ name }) => name);
  const files = getFileNames();
  
  
  // const handleSelect = (file) =>{
  //   setTab(file)
  //   if(!openTabs.includes(file)){
  //     setOpenTabs((currentOpenTabs)=> [...currentOpenTabs, file])
  //   }
  // }
  
  return (
    <div className='flex'>
      <div className='absolute left-[52px] top-0 h-full w-[240px]'>
      <div className="text-gray-900 leading-[16px] m-0 bg-[#1C1C23] border-l-0 border-r-2 border-r-gray-900 border-l-2 border-l-gray-900 font-normal font-semibold w-[240px] min-w-[196px] max-w-[512px] flex flex-1 flex-col h-screen" style={{padding: 8}}>
        {/* <div className='cursor-pointer text-gray-100 text-xl' onClick={()=>{}}>+</div>
        <CreateWorkflow/> */}
        <div className='h-[66px] w-full '>
          <div className='w-full h-[32px] bg-[#25252E]'>
            <div className='h-[24px] m-[4px] absolute left-[4px] right-[4px] top-[4px]'>
              <input className='h-full rounded-[4px] bg-[#151515] gap-[10px] m-[5px] w-[210px] placeholder:p-1 placeholder:w-[47px] placeholder:h-[16px] placeholder:font-Roboto placeholder:font-normal placeholder:font-semibold placeholder:leading-[16px] placeholder:items-center placeholder:flex placeholder:text-[12px] focus:outline-none text-gray-100 text-[12px]' placeholder='Search...'/>
            </div>
          </div>
          <div className='h-[32px]'>
            <div></div>
            <div></div>
            <div></div>
          </div>
          
        </div>
        <div className='w-full'>
          {
            files?.map((item,index)=>(
              <Link to={`/projects/${item}`} key={item + index} className={`relative flex flex-row text-gray-100 h-[25px] items-center p-0 gap-[15px] m-1 ${item === tab ? 'bg-[#2D2763] w-full h-[25px]' : ''}`}>
                <div className='flex flex-row items-center gap-[4px] w-[71px] h-[16px]'>
                  <Svg.Workflow className='w-[16px] h-[16px]'/>
                  <span className='p-1 cursor-pointer flex flex-row items-center w-[51px] h-[16px] font-Roboto font-normal font-semibold text-[12px] leading-[16px] text-[#ECECEC]'>{item}</span>
                </div>
              </Link>
            ))
          }
        </div>
      </div>  
      </div>
    </div>
  )
}
export default Projects