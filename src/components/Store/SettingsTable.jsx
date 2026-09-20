import React from 'react'

const SettingsTable = ({ options }) => {
  const entries = Object.entries(options || {})

  if (entries.length === 0) {
    return <div className='text-[#71717E] text-[12px] p-4'>No settings for this workflow.</div>
  }

  return (
    <table className='w-full text-[12px] text-[#ECECEC] m-4'>
      <thead>
        <tr className='text-left text-[#A3A3B1] border-b border-[#2f2f3d]'>
          <th className='py-1 pr-4'>Setting</th>
          <th className='py-1'>Value</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([key, value]) => (
          <tr key={key} className='border-b border-[#1C1C23]'>
            <td className='py-1 pr-4 text-[#A3A3B1]'>{key}</td>
            <td className='py-1'>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SettingsTable
