import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWorkflow } from '../redux/features/workflowSlice'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { atomone } from '@uiw/codemirror-themes-all'
import Documentation from '../components/Store/Documentation'
import SettingsTable from '../components/Store/SettingsTable'
import Releases from '../components/Store/Releases'
import Issues from '../components/Store/Issues'

const TABS = ['Documentation', 'Source', 'Settings', 'Releases', 'Issues']

const Store = () => {
  const dispatch = useDispatch()
  const { workflows: workflow, loading } = useSelector((state) => state.workflow)
  const [activeTab, setActiveTab] = useState('Documentation')

  useEffect(() => {
    dispatch(fetchWorkflow())
  }, [])

  const primaryTask = workflow?.tasks?.[0]
  const code = workflow?.code || primaryTask?.code || ''
  const docs = workflow?.docs || primaryTask?.docs || ''
  const options = workflow?.options || primaryTask?.options || {}

  return (
    <div className='absolute left-[52px] top-0 h-full w-[calc(100vw-52px)] bg-[#151515]'>
      <div className='flex flex-row bg-[#2F2F3D] h-[40px]'>
        {TABS.map((t) => (
          <div
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex items-center px-4 h-full cursor-pointer text-[12px] font-Roboto font-semibold ${activeTab === t ? 'bg-[#1C1C23] text-[#887DFF]' : 'text-[#A3A3B1] hover:text-[#ECECEC]'}`}
          >
            {t}
          </div>
        ))}
      </div>

      {loading && <div className='text-[#71717E] text-[12px] p-4'>Loading workflow...</div>}

      {!loading && activeTab === 'Documentation' && <Documentation docs={docs} />}
      {!loading && activeTab === 'Source' && (
        <CodeMirror value={code} extensions={[javascript({ jsx: true })]} theme={atomone} editable={false} height='calc(100vh - 40px)' />
      )}
      {!loading && activeTab === 'Settings' && <SettingsTable options={options} />}
      {!loading && activeTab === 'Releases' && <Releases />}
      {!loading && activeTab === 'Issues' && <Issues />}
    </div>
  )
}

export default Store
