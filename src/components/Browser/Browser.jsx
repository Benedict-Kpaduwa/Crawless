import React from 'react'

const Browser = ({compiledCode, stderrMessage}) => {
  
  return (
    <div className='w-[373px] h-[728px] bg-[#1C1C23]'>
      <h1 className="font-bold text-xl ">
        Output
      </h1>
      <div className="w-full h-full bg-gray-100 rounded-md text-white font-normal text-sm text-gray-800 overflow-y-auto">
        {compiledCode}
        {stderrMessage}
      </div>
    </div>
  )
}

export default Browser