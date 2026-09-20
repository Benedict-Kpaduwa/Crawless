import React from 'react'

const LEVEL_COLOR = {
  debug: 'text-[#A3A3B1]',
  info: 'text-[#81DED8]',
  warn: 'text-[#F0C674]',
  error: 'text-[#F87171]',
}

const Logs = ({ logs }) => {
  return (
    <div className='w-[373px] h-[728px] bg-[#1C1C23] flex flex-col'>
      <h1 className="font-bold text-xl text-[#ECECEC] p-2">
        Logs
      </h1>
      <div className="w-full h-full font-mono text-xs overflow-y-auto px-2 pb-2">
        {logs.length === 0 && (
          <div className='text-[#71717E]'>No logs yet. Run the workflow to see output here.</div>
        )}
        {logs.map((entry, index) => (
          <div key={index} className={`${LEVEL_COLOR[entry.level] || 'text-[#ECECEC]'} whitespace-pre-wrap`}>
            [{entry.level}] {entry.args.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ')}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Logs
