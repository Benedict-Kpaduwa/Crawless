import React from 'react'
import {Svg} from '@crawless/ui'

const Panel = () => {
  return (
    <div className='flex flex-row justify-between bg-[#2F2F3D] items-center fixed h-[40px] w-[1069px] top-[32px] left-[295px]'>
        <div className='flex flex-row items-center p-0 relative w-[185px] h-[40px] left-0'>
            <div className='flex flex-col items-center p-0 w-[91px] h-full'>
              <div className='flex flex-row items-center p-0 w-full h-full cursor-pointer'>
                <div className='flex flex-row items-center px-[11px] py-[12px] gap-[8px] w-full h-full'>
                  <Svg.Code className='w-[16px] h-[16px] fill-[#A3A3B1]'/>
                  <span className='hover:underline font-Roboto font-normal font-semibold leading-[16px] text-[12px] flex items-center text-[#a3a3b1]'>Editor</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center p-0 w-[91px] h-full'>
              <div className='flex flex-row items-center p-0 w-full h-full hover:fill-[#887DFF] cursor-pointer'>
                <div className='flex flex-row items-center px-[11px] py-[12px] gap-[8px] h-[38px]'>
                  <Svg.PC className='w-[16px] h-[16px] fill-[#A3A3B1]'/>
                  <span className='hover:underline font-Roboto font-normal font-semibold leading-[16px] text-[12px] flex items-center text-[#a3a3b1]'>Local</span>
                </div>
              </div>
            </div>
        </div>
        <div className='flex flex-row items-center p-0 relative w-[532px] h-[40px]'>
            <div className='flex flex-col items-center p-0 w-[130px] h-full'>
              <div className='flex flex-row items-center p-0 w-full h-full cursor-pointer hover:fill-[#887DFF]'>
                <div className='flex flex-row items-center w-full h-[38px] gap-[8px]'>
                  <Svg.Document className='w-[16px] h-[16px] fill-[#A3A3B1]' />
                  <span className='hover:underline font-Roboto font-normal font-semibold leading-[16px] text-[12px] flex items-center text-[#a3a3b1]'>Documentation</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center p-0 w-[120px] h-full'>
              <div className='flex flex-row items-center p-0 w-full h-full cursor-pointer hover:fill-[#887DFF]'>
                <div className='flex flex-row items-center gap-[8px] w-full h-[38px]'>
                  <Svg.Share className='w-[16px] h-[16px] fill-[#A3A3B1]' />
                  <span className='hover:underline font-Roboto font-normal font-semibold leading-[16px] text-[12px] flex items-center text-[#a3a3b1]'>Collaboration</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center p-0 w-[93px] h-full'>
              <div className='flex flex-row items-center p-0 w-full h-full cursor-pointer hover:fill-[#887DFF]'>
                <div className='flex flex-row items-center gap-[8px] w-full h-[38px]'>
                  <Svg.Download className='w-[16px] h-[16px] fill-[#A3A3B1]' />
                  <span className='hover:underline font-Roboto font-normal font-semibold leading-[16px] text-[12px] flex items-center text-[#a3a3b1]'>Updates</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center p-0 w-[97px] h-full'>
              <div className='flex flex-row items-center p-0 w-full h-full cursor-pointer hover:fill-[#887DFF]'>
                <div className='flex flex-row items-center gap-[8px] w-full h-[38px]'>
                  <Svg.BoxOpen className='w-[16px] h-[16px] fill-[#A3A3B1]' />
                  <span className='hover:underline font-Roboto font-normal font-semibold leading-[16px] text-[12px] flex items-center text-[#a3a3b1]'>Releases</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center p-0 w-[92px] h-full'>
              <div className='flex flex-row items-center p-0 w-full h-full cursor-pointer'>
                <div className='flex flex-row items-center gap-[8px] w-full h-[38px]'>
                  <Svg.Gear className='w-[16px] h-[16px] fill-[#A3A3B1] hover:fill-[#887DFF]' />
                  <span className='hover:text-[#887DFF] hover:underline font-Roboto font-normal font-semibold leading-[16px] text-[12px] flex items-center text-[#a3a3b1]'>Settings</span>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Panel