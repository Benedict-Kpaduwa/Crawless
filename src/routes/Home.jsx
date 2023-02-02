import React,{useState} from 'react'
import {Svg} from '@crawless/ui'
import {IoIosArrowForward} from "react-icons/io"

const Home = () => {
  const [show, setShow] = useState(false)
  const dashboard = [
    {
      id:1, name: 'Linkedin'
    },
    {
      id:2, name: 'psacard.com'
    },
    {
      id:3, name: 'USIM'
    },
    {
      id:4, name: 'mobile.de'
    }
  ]
  return (
    <div className='absolute left-[52px] top-0 h-full w-[243px]'>
      <div className="text-gray-400 leading-[16px] m-0 bg-[#1C1C23] border-r-2 border-r-gray-900 border-l-2 border-l-gray-900 font-normal font-semibold w-[240px] min-w-[196px] max-w-[512px] flex flex-1 flex-row h-screen" style={{padding: 8}}>
        <div className='flex flex-col items-start p-0 absolute h-[72px] left-0 right-0'>
          <div className='w-[100px] h-[24px]'>
            <div className='flex flex-row items-center p-0 gap-[4px] absolute w-[70px] h-[16px] left-[24px] top-[4px]'> 
              <Svg.Crawless className='fill-[#ECECEC] h-[16px] w-[16px] absolute left-[3px] top-[2px]'/>
              <p className='flex flex-row items-center p-0 w-[50px] h-[16px] font-Roboto font-normal font-semibold text-[12px] leading-[16px] text-[#ECECEC] absolute right-0'>Welcome</p>
            </div>
          </div>
          <div className='w-[100px] h-[24px]'>
            <div className='flex flex-row items-center p-0 gap-[4px] absolute w-[120px] h-[16px] left-[24px] top-[32px]'> 
              <Svg.Speedometer className='h-[16px] w-[16px] absolute left-[3px] top-[2px]'/>
              <p className='flex flex-row items-center p-0 w-[90px] h-[16px] font-Roboto font-normal font-semibold text-[12px] leading-[16px] text-[#ECECEC] absolute right-2'>Edge statistics</p>
            </div>
          </div>
          <div className='w-[237px] h-[35px] bg-[#25252E] absolute left-0 top-[65px] flex items-center'>
            <div className='flex flex-row items-center p-0 gap-[4px] absolute w-[105px] h-[16px] left-[24px]'>
              <IoIosArrowForward onClick={()=> setShow(!show)} className={`${show ? 'w-[10px] h-[10px] fill-[#A3A3B1] rotate-90': 'w-[10px] h-[10px] fill-[#A3A3B1]'}`}/>
              <Svg.Dashboard className='fill-[#81DED8] w-[20px] h-[20px]'/>
              <p className='flex flex-row items-center p-0 w-[65px] h-[16px] text-[#ECECEC] font-Roboto font-normal font-semibold text-[16px] leading-[16px]'>Dashboards</p>
            </div>
          </div>
          {
            show ? 
            <div className='flex flex-col items-start p-0 absolute w-[239px] h-[120px] left-[49px] top-[100px]'>
            {
              dashboard.map((i)=>(
                <div key={i.id}>
                  <div className='flex flex-row items-center p-0 gap-[4px] w-[75] h-[16px] cursor-pointer m-[1px] hover:bg-[#25252E]'>
                    <Svg.Dashboard className='h-[16px] w-[16px] fill-[#13C2C2]'/>
                    <p className='flex flex-row p-0 w-[80px] h-full font-Roboto font-normal font-semibold text-[12px] leading-[16px] text-[#ECECEC]'>{i.name}</p>
                  </div>
                </div>
              ))
            }
          </div> : null
          }
          
        </div>
      </div>
    </div>
  )
}

export default Home
