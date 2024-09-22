import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../globalRedux/store';
import { ChartForSales, ChartForCustomers, ChartForOrders } from './chart';

const FirstRowMain: React.FC = () => {
  const { salesAnalysisArray, currentYear, currentMonth } = useSelector((state: RootState) => state.sales);
  const currentYearData = salesAnalysisArray.find(data => +data.YEAR === currentYear);

  return (
    <div className="flex flex-col sm:flex-row justify-between text-white w-full sm:h-32 p-2 sm:p-5 bg-[#553255] glass">
            <div className="flex px-2 sm:px-5 py-2 gap-5 flex-1">
              <div className="flex flex-col items-start">
                <p className='font-semibold text-sx sm:text-lg'>SALES</p>
                {salesAnalysisArray.length > 0 && salesAnalysisArray[salesAnalysisArray.length - 1].SALES ? (
                  <>
                    <p className='text-lg'>${salesAnalysisArray[salesAnalysisArray.length - 1].SALES.TOTAL.toLocaleString()}</p>
                    <p className="flex items-center text-sm">
                      {(() => {
                        
                        if (!currentYearData) return null;

                        const currentMonthSales = currentYearData.SALES.MONTH[currentMonth - 1];
                        const previousMonthSales = currentYearData.SALES.MONTH[currentMonth - 2] || 
                          (currentMonth === 1 && salesAnalysisArray[salesAnalysisArray.length - 2]?.SALES.MONTH[11]);

                        if (!previousMonthSales) return null;

                        const percentageChange = ((currentMonthSales - previousMonthSales) / previousMonthSales * 100).toFixed(2);
                        const isIncrease = currentMonthSales > previousMonthSales;

                        return (
                          <>
                            {isIncrease ? (
                              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            {percentageChange}%
                          </>
                        );
                      })()}
                    </p>
                  </>
                ) : (
                  <p>No sales data available</p>
                )}
              </div>
              <div className='flex-1'>
                <ChartForSales />
              </div>
            </div>
            <div className="border-2 border-r-0 opacity-30"></div>    
            <div className="flex px-2 sm:px-5 py-2 gap-5 flex-1">
              <div className="flex flex-col items-start">
                <p className='font-semibold text-sx sm:text-lg'>CUSTOMERS</p>
                {salesAnalysisArray.length > 0 && salesAnalysisArray[salesAnalysisArray.length - 1].CUSTOMERS ? (
                  <>
                    <p className='text-lg'>{salesAnalysisArray[salesAnalysisArray.length - 1].CUSTOMERS.TOTAL.toLocaleString()}</p>
                    <p className="flex items-center text-sm">
                      {(() => {
                        
                        if (!currentYearData) return null;

                        const currentMonthCustomers = currentYearData.CUSTOMERS.MONTH[currentMonth - 1];
                        const previousMonthCustomers = currentYearData.CUSTOMERS.MONTH[currentMonth - 2] || 
                          (currentMonth === 1 && salesAnalysisArray[salesAnalysisArray.length - 2]?.CUSTOMERS.MONTH[11]);

                        if (!previousMonthCustomers) return null;

                        const percentageChange = ((currentMonthCustomers - previousMonthCustomers) / previousMonthCustomers * 100).toFixed(2);
                        const isIncrease = currentMonthCustomers > previousMonthCustomers;

                        return (
                          <>
                            {isIncrease ? (
                              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            {percentageChange}%
                          </>
                        );
                      })()}
                    </p>
                  </>
                ) : (
                  <p>No customer data available</p>
                )}
              </div>
              <div className='flex-1'>
                <ChartForCustomers />
              </div>
            </div>
            <div className="border-2 border-r-0 opacity-30"></div>
            <div className="flex px-2 sm:px-5 py-2 gap-5 flex-1">
              <div className="flex flex-col items-start">
                <p className='font-semibold text-sx sm:text-lg'>ORDERS</p>
                {salesAnalysisArray.length > 0 && salesAnalysisArray[salesAnalysisArray.length - 1].ORDERS ? (
                  <>
                    <p>{salesAnalysisArray[salesAnalysisArray.length - 1].ORDERS.TOTAL.toLocaleString()}</p>
                    <p className="flex items-center text-sm">
                      {(() => {
                        
                        if (!currentYearData) return null;

                        const currentMonthOrders = currentYearData.ORDERS.MONTH[currentMonth - 1];
                        const previousMonthOrders = currentYearData.ORDERS.MONTH[currentMonth - 2] || 
                          (currentMonth === 1 && salesAnalysisArray[salesAnalysisArray.length - 2]?.ORDERS.MONTH[11]);

                        if (!previousMonthOrders) return null;

                        const percentageChange = ((currentMonthOrders - previousMonthOrders) / previousMonthOrders * 100).toFixed(2);
                        const isIncrease = currentMonthOrders > previousMonthOrders;

                        return (
                          <>
                            {isIncrease ? (
                              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            {percentageChange}%
                          </>
                        );
                      })()}
                    </p>
                  </>
                ) : (
                  <p>No order data available</p>
                )}
              </div>
              <div className='flex-1'>
                <ChartForOrders />
              </div>
            </div>
          </div>
  )
}

export default FirstRowMain
