import React, { useState } from 'react'

const CreateWorkflow = ({ onCreated, onCancel }) => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        if (!name.trim()) {
            setError('Name is required')
            return
        }
        try {
            const workflow = await window.crawless.createWorkflow({ name: name.trim() })
            setName('')
            setError('')
            onCreated?.(workflow)
        } catch (err) {
            setError(err.message || String(err))
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 p-2 bg-[#25252E] text-[#ECECEC] text-[12px]'>
            <div className='flex flex-col'>
                <label>Name</label>
                <input
                    className='bg-[#151515] rounded-[4px] p-1'
                    type='text'
                    placeholder='Input Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            {error && <div className='text-[#F87171]'>{error}</div>}
            <div className='flex flex-row gap-2'>
                <input className='cursor-pointer' type='submit' value='Add Workflow'/>
                <button type='button' className='cursor-pointer' onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default CreateWorkflow
