import React,{useEffect, useState} from 'react'
import Split from 'react-split';
import { useParams } from "react-router-dom";
import { useStore } from "../../contexts/store";
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import "react-toastify/dist/ReactToastify.css"
import Panel from '../Panel/Panel';
import {atomone} from '@uiw/codemirror-themes-all'
import './Editor.css'
import Control from '../Control/Control';
import Logs from '../Logs/Logs';

const Editor = () => {
  const { openTabs, setOpenTabs, setTab, tab } = useStore();
  const { name } = useParams();

  const [code, setCode] = useState('')
  const [logs, setLogs] = useState([])
  const [runId, setRunId] = useState(null)

  useEffect(() => {
    if (name && openTabs) {
      if (!openTabs.includes(name)) {
        setOpenTabs([...openTabs, name]);
      }
      if (tab !== name) {
        setTab(name);
      }
    }
  }, [name, openTabs]);

  useEffect(() => {
    if (!window.crawless || !name) return
    window.crawless.listWorkflows().then((workflows) => {
      const workflow = workflows.find((w) => w.name === name)
      setCode(workflow?.code_js || '')
    })
  }, [name])

  useEffect(() => {
    if (!window.crawless) return
    return window.crawless.onLog((payload) => {
      if (payload.runId !== runId) return
      setLogs((current) => [...current, payload])
    })
  }, [runId])

  async function run(jscode) {
    if (!window.crawless) return
    await window.crawless.updateWorkflow(name, { code_js: jscode })
    setLogs([])
    const id = await window.crawless.runWorkflow(name, jscode, {})
    setRunId(id)
  }

  async function stop() {
    if (!window.crawless || !runId) return
    await window.crawless.stopWorkflow(runId)
    setRunId(null)
  }

  return (
    <div className='w-full bg-[#151515]'>
      <Panel/>
      <div className='fixed left-[294px] top-[72px] h-full flex flex-row'>
        <Control onRun={() => run(code)} onStop={stop} isRunning={!!runId}/>
        <Split direction='horizontal' style={{height: 'calc(100vh - 4rem'}}>
          <CodeMirror
            value={code}
            extensions={[javascript({ jsx: true })]}
            theme={atomone}
            onChange={(value) => setCode(value)}
            height='100vh'
            width='756px'
          />
          <Logs logs={logs}/>
        </Split>
      </div>
    </div>
  )
}

export default Editor
