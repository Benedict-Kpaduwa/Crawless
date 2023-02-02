import React from 'react'
import {NavLink} from "react-router-dom"
import {Svg} from '@crawless/ui'
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

const NavBar = () => {

  return (
    <div className='bg-[#151515] w-[52px] relative flex flex-col h-[100vh] pb-[10px]'>
      <NavLink to='/home' className={({isActive})=>(isActive ? 'w-full p-2 bg-[#2D2763] fill-[#5C53F3]' : 'w-full p-2 fill-[#a3a3b1]')}>
        <Tooltip placement='right' overlay='Home' arrowContent={<div className='rc-tooltip-arrow-inner'></div>}>
          <Svg.Crawless className="relative cursor-pointer m-[5px] w-[24px] h-[24px] hover:fill-gray-100 box-border left-0 top-0"/>
        </Tooltip>
      </NavLink>
      <NavLink to='/projects' className={({isActive})=>(isActive ? 'w-full p-2 bg-[#2D2763] fill-[#5C53F3]':'w-full p-2 fill-[#a3a3b1]')} >
        <Tooltip placement='right' overlay='Projects' arrowContent={<div className='rc-tooltip-arrow-inner'></div>}>
          <Svg.Projects className="relative cursor-pointer m-[5px] w-[24px] h-[24px] hover:fill-gray-100 box-border left-0 top-0"/>
        </Tooltip>
      </NavLink>
      <NavLink to='/store' className={({isActive})=>(isActive ? 'w-full p-2 bg-[#2D2763] fill-[#5C53F3]':'w-full p-2 fill-[#a3a3b1]')}>
        <Tooltip placement='right' overlay='Store' arrowContent={<div className='rc-tooltip-arrow-inner'></div>}>
          <Svg.Store className="relative cursor-pointer m-[5px] w-[24px] h-[24px] hover:fill-gray-100 box-border left-0 top-0"/>
        </Tooltip>
      </NavLink>
      <NavLink to='/documentation' className={({isActive})=>(isActive ? 'w-full p-2 bg-[#2D2763] fill-[#5C53F3]':'w-full p-2 fill-[#a3a3b1]')}>
        <Tooltip placement='right' overlay='Documentation' arrowContent={<div className='rc-tooltip-arrow-inner'></div>}>
          <Svg.Book className="relative cursor-pointer m-[5px] w-[24px] h-[24px] hover:fill-gray-100 box-border left-0 top-0"/>
        </Tooltip>
      </NavLink>
      <NavLink to='/settings' className={({isActive})=>(isActive ? 'w-full p-2 bg-[#2D2763] fill-[#5C53F3] absolute bottom-0': 'w-full p-2 absolute bottom-0 fill-[#a3a3b1]')}>
        <Tooltip placement='right' overlay='Settings' arrowContent={<div className='rc-tooltip-arrow-inner'></div>}>
          <Svg.Settings className="relative cursor-pointer m-[5px] w-[24px] h-[24px] hover:fill-gray-100 box-border left-0 top-0"/>
        </Tooltip> 
      </NavLink>
    </div>
  )
}

export default NavBar