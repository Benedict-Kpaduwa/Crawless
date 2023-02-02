import React,{useEffect, useState} from 'react'
import Split from 'react-split';
import { useParams } from "react-router-dom";
import { useStore } from "../../contexts/store";
import { useSelector, useDispatch } from 'react-redux'
import {fetchWorkflow} from '../../redux/features/workflowSlice'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import "react-toastify/dist/ReactToastify.css"
import Panel from '../Panel/Panel';
import {atomone} from '@uiw/codemirror-themes-all'
import './Editor.css'
import Control from '../Control/Control';
import Browser from '../Browser/Browser';
const { exec } = window.require('child_process');

const Editor = () => {
  const {workflows} = useSelector(state => state.workflow)
  const dispatch = useDispatch();
  const { openTabs, setOpenTabs, setTab, tab } = useStore();
  const { name } = useParams();

  useEffect(() => {
    dispatch(fetchWorkflow())
  },[])

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

  const task = workflows.tasks
  const getFileContent = (name) =>task?.find((item) => item.name === name)?.code
  const contents = getFileContent(name)
  const [compiledCode, setCompiledCode] = useState(''); 
  const [code, setCode] = useState(contents)
  const [stderrMessage, setStderrMessage] = useState('')

  function compile(jscode) {
    // Use the `exec` method to execute a command
    // to run the compiler program
    exec(`node -e "${jscode}"`, function(err, stdout, stderr) {
      if(err){
        console.log(`Error: ${err}`)
        // setErrorMessage(err)
        return
      }
      if(stderr){
        console.log(`Error: ${stderr}`)
        setStderrMessage(stderr)
        return;
      }
      setCompiledCode(stdout)
      console.log(stdout);
    });
  }

  // function onChange(e){
  //   setCode(e.target.value)
  // }

  return (
    <div className='w-full bg-[#151515]'>
      <Panel/>
      <div className='fixed left-[294px] top-[72px] h-full flex flex-row'>
        <Control compile={compile} code={code}/>
        <Split direction='horizontal' style={{height: 'calc(100vh - 4rem'}}>
          <CodeMirror 
            value={contents}
            extensions={[javascript({ jsx: true })]} 
            theme={atomone}
            onChange={(editor, data, value) => {
              setCode(value);
              compile(value);
            }}
            height='100vh'
            width='756px'
          />
          <Browser compiledCode={compiledCode} stderrMessage={stderrMessage}/>
        </Split>
      </div>
    </div>
  )
}

export default Editor