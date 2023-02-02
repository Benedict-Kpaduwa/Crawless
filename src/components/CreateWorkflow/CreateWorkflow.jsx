import React, { useState } from 'react'

const CreateWorkflow = () => {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [lastRan, setLastRan] = useState('')
    const [codejs, setCodeJs] = useState('')
    const [isRunning, setIsRunning] = useState(false)
    //const [options, setOptions] = useState('')

  return (
    <form>
      <div className='flex flex-col'>
            <label>Name</label>
            <input type='text' placeholder='Input Name'/>
        </div>
        <div>
            <label>Set Date</label>
            <input type='text' placeholder='Date'/>
        </div>
        <div>
            <label>isRunning</label>
            <input type='checkbox'/>
        </div>

        <input type='submit' value='Add Workflow'/>
        
        {/* <label>Name</label>
        <input type='text' placeholder='Input Name'/> */}
      
    </form>
  )
}

export default CreateWorkflow
