'use client';

import React, { useLayoutEffect } from 'react'

import { FaRegBell } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import logo from "@/app/assets/portfolio.png";
import { useDispatch } from 'react-redux';
import { getSalesArray } from '../globalRedux/features/sales/salesSlice';
import Image from 'next/image';

const TopBar = () => {
//   const {salesAnalysisArray} = useSelector((state : RootState) => state.sales);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
      dispatch(getSalesArray());
  }, [dispatch])
  return (
    <div className="flex justify-between items-center text-white px-1 py-2 sm:py-0 mb-4 sm:mb-0">
      <div>
          <Image src={logo} alt="Logo" width={35} height={35} className="sm:w-[45px] sm:h-[45px]" />
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
          <div>
          <FaRegBell size={20} className="sm:w-6 sm:h-6"/>
          </div>
          <div>
          <CgProfile size={20} className="sm:w-6 sm:h-6"/>
          </div>
          <div className="text-sm sm:text-base">your name</div>
      </div>
    </div>
  )
}

export default TopBar
