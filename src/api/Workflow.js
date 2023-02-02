import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchWorkflow} from '../redux/features/workflowSlice'

export const Workflow = () => {
    const {workflows} = useSelector(state => state.workflow)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWorkflow())
    }, [])

    const workflow = workflows.task
    const getWorkFlowNames = () => workflow.map(({name}) => name)
    const getWorkFlowCode = (workFlowName) => workflow.find((item)=> item.workFlowName === workFlowName)?.code
    
  return (
    <div>Workflow</div>
  )
}

