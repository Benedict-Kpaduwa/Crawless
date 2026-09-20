import React, { useEffect, useState } from 'react'
import { useStore } from "../contexts/store"
import { Link } from 'react-router-dom';
import { Svg } from '@crawless/ui'
import CreateWorkflow from '../components/CreateWorkflow/CreateWorkflow'

const Projects = () => {
  const { tab } = useStore();
  const [workflows, setWorkflows] = useState([])
  const [showCreate, setShowCreate] = useState(false)

  async function refresh() {
    if (!window.crawless) return
    setWorkflows(await window.crawless.listWorkflows())
  }

  useEffect(() => {
    refresh()
  }, [])

  async function handleDelete(name, event) {
    event.preventDefault()
    event.stopPropagation()
    await window.crawless.deleteWorkflow(name)
    refresh()
  }

  return (
    <div className='flex'>
      <div className='absolute left-[52px] top-0 h-full w-[240px]'>
      <div className="text-gray-900 leading-[16px] m-0 bg-[#1C1C23] border-l-0 border-r-2 border-r-gray-900 border-l-2 border-l-gray-900 font-normal font-semibold w-[240px] min-w-[196px] max-w-[512px] flex flex-1 flex-col h-screen" style={{padding: 8}}>
        <div className='h-[66px] w-full '>
          <div className='w-full h-[32px] bg-[#25252E] flex flex-row items-center'>
            <div className='h-[24px] m-[4px] flex-1'>
              <input className='h-full rounded-[4px] bg-[#151515] gap-[10px] m-[5px] w-[170px] placeholder:p-1 placeholder:font-Roboto placeholder:font-normal placeholder:font-semibold placeholder:leading-[16px] placeholder:items-center placeholder:flex placeholder:text-[12px] focus:outline-none text-gray-100 text-[12px]' placeholder='Search...'/>
            </div>
            <Svg.Workflow
              className='w-[16px] h-[16px] fill-[#A9EF7B] cursor-pointer mr-2'
              onClick={() => setShowCreate((v) => !v)}
            />
          </div>
        </div>
        {showCreate && (
          <CreateWorkflow
            onCancel={() => setShowCreate(false)}
            onCreated={() => { setShowCreate(false); refresh() }}
          />
        )}
        <div className='w-full'>
          {
            workflows.map((item) => (
              <Link to={`/projects/${item.name}`} key={item.name} className={`relative flex flex-row justify-between text-gray-100 h-[25px] items-center p-0 gap-[15px] m-1 ${item.name === tab ? 'bg-[#2D2763] w-full h-[25px]' : ''}`}>
                <div className='flex flex-row items-center gap-[4px] w-[71px] h-[16px]'>
                  <Svg.Workflow className='w-[16px] h-[16px]'/>
                  <span className='p-1 cursor-pointer flex flex-row items-center h-[16px] font-Roboto font-normal font-semibold text-[12px] leading-[16px] text-[#ECECEC]'>{item.name}</span>
                </div>
                <Svg.Danger
                  data-testid={`delete-${item.name}`}
                  className='w-[12px] h-[12px] fill-[#A3A3B1] hover:fill-[#F87171] cursor-pointer mr-2'
                  onClick={(e) => handleDelete(item.name, e)}
                />
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
