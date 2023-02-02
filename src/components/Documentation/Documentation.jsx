import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {fetchWorkflow} from '../../redux/features/workflowSlice'
import { useParams } from "react-router-dom";
import { useStore } from "../../contexts/store";

const Documentation = () => {
    const {workflows} = useSelector(state => state.workflow)
    const dispatch = useDispatch();
    const { openTabs, setOpenTabs, setTab, tab } = useStore();
    const { name } = useParams();

    useEffect(()=>{
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
    const getFileDoc = (name) =>task?.find((item)=> item.name === name)?.docs
    const docs = getFileDoc(name)
  return (
    <div>
      {docs}
    </div>
  )
}

export default Documentation
