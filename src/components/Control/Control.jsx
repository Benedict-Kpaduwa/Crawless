import React from 'react'
import {Svg} from '@crawless/ui'
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

const Control = ({compile, code}) => {
  return (
    <div className='h-[100vh] w-[40px] bg-[#2f2f3d]'>
      <div className='flex flex-col items-center p-0 w-full h-[242px]'>
        <div className='flex flex-col items-center p-0 w-[40px] h-[82px]'>
          <div className='flex flex-col items-center p-[12px] w-[40px] h-[40px] bg-[#1c1c23] cursor-pointer'>
            <Svg.Run className='w-[16px] h-[16px] fill-[#A9EF7B]' onClick={()=>compile(code)}/>
          </div>
          <div className='h-[40px] w-[40px] flex flex-col items-center p-[12px] bg-[#1c1c23] cursor-pointer'>
            <Svg.Stop className='w-[16px] h-[16px] fill-[#464753]'/>
          </div>
        </div>
        <div className='w-[40px] h-[40px] flex flex-row items-center p-0 cursor-pointer'>
          <Tooltip placement='right' overlay='Summary' arrowContent={<div className='rc-tooltip-arrow-inner'></div>}>
            <div className='flex flex-col items-center w-[38px] h-[39px] p-[11px] gap-[8px]'>
              <Svg.Charts className='w-[16px] h-[16px] fill-[#A3A3B1] hover:fill-[#887DFF]'/>
            </div>
          </Tooltip>
        </div>
        <div className='w-[40px] h-[40px] flex flex-row items-center p-0 cursor-pointer'>
          <Tooltip placement='right' overlay='Tasks queue' arrowContent={<div className='rc-tooltip-arrow-inner'></div>}>
            <div className='flex flex-col items-center w-[38px] h-[39px] p-[11px] gap-[8px]'>
              <Svg.Queue className='w-[16px] h-[16px] fill-[#A3A3B1] hover:fill-[#887DFF]'/>
            </div>
          </Tooltip>
        </div>
        <div className='w-[40px] h-[40px] flex flex-row items-center p-0 cursor-pointer'>
          <Tooltip placement='right' overlay='Logs' arrowContent={<div className='rc-tooltip-arrow-inner'></div>}>
            <div className='flex flex-col items-center w-[38px] h-[39px] p-[11px] gap-[8px]'>
              <Svg.Danger className='w-[16px] h-[16px] fill-[#A3A3B1] hover:fill-[#887DFF]'/>
            </div>
          </Tooltip>
        </div>
        <div className='w-[40px] h-[40px] flex flex-row items-center p-0 cursor-pointer'>
          <Tooltip placement='right' overlay='Key/Value' arrowContent={<div className='rc-tooltip-arrow-inner'></div>}>
            <div className='flex flex-col items-center w-[38px] h-[39px] p-[11px] gap-[8px]'>
              <Svg.KeyValue className='w-[16px] h-[16px] fill-[#A3A3B1] hover:fill-[#887DFF]'/>
            </div>
          </Tooltip>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Control