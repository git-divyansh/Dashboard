import React from 'react'
import { CiCloudOn } from 'react-icons/ci'
import { IoBagOutline, IoPeopleOutline } from 'react-icons/io5'
import { MdOutlineDashboard, MdOutlineStorefront } from 'react-icons/md'

const SideBar = () => {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="text-white h-full p-2 flex-col gap-5 hidden sm:flex">
        <a href='/' className="flex justify-center p-1">
          <MdOutlineDashboard size={25} />
        </a>
        <div className="flex justify-center">
          <MdOutlineStorefront size={25} />
        </div>
        <div className="flex justify-center">
          <IoPeopleOutline size={25}/>
        </div>
        <div className="flex justify-center">
          <IoBagOutline size={25} />
        </div>
        <div className="flex justify-center">
          <CiCloudOn size={25} />
        </div>
      </div>

      {/* Mobile navbar */}
      <div className="fixed bottom-4 left-4 right-4 bg-opacity-80 backdrop-blur-md bg-[#270f36] text-white p-4 flex justify-around items-center sm:hidden rounded-xl z-50">
        
        <a href="/"><MdOutlineDashboard size={25} /></a>
        <a ><MdOutlineStorefront size={25} /></a>
        <a ><IoPeopleOutline size={25}/></a>
        <a ><IoBagOutline size={25} /></a>
        <a ><CiCloudOn size={25} /></a>
      </div>
    </>
  )
}

export default SideBar
