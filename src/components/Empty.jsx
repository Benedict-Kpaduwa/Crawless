import React from 'react'
import CrawlessLog0 from '../Assets/crawless.png'
import {Hotkeys} from '@crawless/ui'

const EmptyContainer = () => {
  return (
    <div className='flex flex-col w-[192px] h-[224px] items-center gap-[64px] absolute top-[230px] left-[548px]'>
        <img src={CrawlessLog0} alt='logo' className='w-[192px] h-[48px] opacity-5'/>
        <div className='flex flex-row items-center gap-[16px] w-[170px] h-[112px] '>
            <div className='w-[98px] h-[112px] items-center space-y-1'>
                <div className='font-Roboto font-normal font-semibold text-[12px] leading-[16px] text-[#71717E]'>Show all comands</div>
                <div className='font-Roboto font-normal font-semibold text-[12px] leading-[16px] text-[#71717E]'>Start debugging</div>
                <div className='font-Roboto font-normal font-semibold text-[12px] leading-[16px] text-[#71717E]'>Toggle terminal</div>
                <div className='font-Roboto font-normal font-semibold text-[12px] leading-[16px] text-[#71717E]'>Start debugging</div>
            </div>
            <div className='flex flex-col items-center gap-[16px] w-[56px] h-[112px] p-0 -space-y-3'>
                <div className='flex flex-row items-center p-0 gap-[4px] w-[56px] h-[16px]'>
                    <Hotkeys keys={['command', 'shift', 'P']}  className='w-[16px] h-[16px] flex flex-row items-center fill-[#A3A3B1] text-[#A3A3B1]  border-1'/>
                </div>
                <div className='flex flex-row items-center p-0 gap-[4px] w-[36px] h-[16px]'>
                    <Hotkeys keys={['command', 'F']} className='w-[16px] h-[16px] flex flex-row items-center fill-[#A3A3B1] border-1 text-[#A3A3B1] '/>
                </div>
                <div className='flex flex-row items-center p-0 gap-[4px] w-[56px] h-[16px]'>
                    <Hotkeys keys={['command', 'shift', 'F']} className='w-[16px] h-[16px] flex flex-row items-center fill-[#A3A3B1] border-1 text-[#A3A3B1] '/>
                </div>
                <div className='flex flex-row items-center p-0 gap-[4px] w-[24px] h-[16px]'>
                    <Hotkeys keys={['F5']} className='w-[16px] h-[16px] flex flex-row items-center text-[#A3A3B1] border-1'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmptyContainer
