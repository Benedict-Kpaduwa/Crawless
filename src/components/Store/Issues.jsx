import React, { useState } from 'react'

const Issues = () => {
  const [issues, setIssues] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    setIssues((current) => [...current, { title, description, id: Date.now() }])
    setTitle('')
    setDescription('')
    setSubmitted(true)
  }

  return (
    <div className='p-4 text-[12px] text-[#ECECEC] flex flex-col gap-4'>
      {submitted ? (
        <div className='flex flex-col gap-2'>
          <div className='text-[#A9EF7B]'>Issue submitted successfully.</div>
          <button
            className='self-start px-2 py-1 rounded-[4px] bg-[#2D2763] cursor-pointer'
            onClick={() => setSubmitted(false)}
          >
            Submit another issue
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
          <label>Title</label>
          <input
            className='bg-[#151515] rounded-[4px] p-1'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Issue title'
          />
          <label>Description</label>
          <textarea
            className='bg-[#151515] rounded-[4px] p-1'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Describe the issue'
            rows={4}
          />
          <input type='submit' value='Submit Issue' className='self-start cursor-pointer px-2 py-1 rounded-[4px] bg-[#2D2763]'/>
        </form>
      )}

      <div className='flex flex-col gap-1'>
        {issues.map((issue) => (
          <div key={issue.id} className='px-2 py-1 rounded-[4px] bg-[#1C1C23]'>
            <div className='font-semibold'>{issue.title}</div>
            {issue.description && <div className='text-[#A3A3B1]'>{issue.description}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Issues
