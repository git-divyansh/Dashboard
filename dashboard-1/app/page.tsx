'use client';

import { ReturnsTrendChart, RevenueChart, YearlyComparisonChart } from "./components/chart";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import FirstRowMain from "./components/FirstRowMain";
import TableOrderDetails from "./components/TableOrderDetails";


export default function Home() {

  return (
    <div className="app h-fit 2xl:h-screen w-full overflow-y-auto pb-20 sm:pb-5 px-4 sm:px-0 sm:pr-8 custom-scrollbar font-inter">
      {/* header */}
      <TopBar />
      {/* body */}
      <div className="flex w-full flex-row">
        {/* sidebar */}
        <SideBar />
        {/* main content */}
        <div className="flex flex-col w-full gap-5 mt-0 2xl:gap-8">
          {/* 1st row cards */}
          <FirstRowMain />
          {/* 2nd row cards */}
          <div className="flex flex-col lg:flex-row w-full gap-5 2xl:gap-8">
            <div className="lg:w-3/5 h-96 2xl:h-[32rem] glass py-2">
              <YearlyComparisonChart />
            </div>
            <div className="lg:w-2/5 h-96 2xl:h-[32rem] glass">
              <RevenueChart />
            </div>
          </div>
          {/* 3rd row cards */}
          <div className="flex flex-col xl:flex-row w-full gap-5 2xl:gap-8"> 
            <div className="xl:w-2/5 h-96 2xl:h-[32rem] glass">
              <ReturnsTrendChart />
            </div>
            <div className="xl:w-3/5 h-fit xl:h-96 2xl:h-[32rem] glass">
              <TableOrderDetails OderPageOpened={false}/> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
