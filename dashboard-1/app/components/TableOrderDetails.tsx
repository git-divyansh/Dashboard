'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/globalRedux/store';
import Link from 'next/link';
import LoadingSign from './LoadingSign';
import { FaSearch, FaSort, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SideBar from './SideBar';
import TopBar from './TopBar';

const TableOrderDetails = ({ OderPageOpened }: { OderPageOpened: boolean }) => {
  const [orderDetails, setOrderDetails] = useState<any[]>([]); // eslint-disable-line
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const data = useSelector((state: RootState) => state.sales.data);

  useEffect(() => {
    if (data.length === 0) {
      setIsLoading(true);
      return;
    }

    const processedData = data.map(item => ({
      date: new Date(item.ORDERDATE),
      client: `${item.CONTACTFIRSTNAME} ${item.CONTACTLASTNAME}`,
      orderID: item.ORDERNUMBER,
      productCode: item.PRODUCTCODE,
      quantity: item.QUANTITYORDERED,
      amount: `$${item.SALES}`
    }));
    
    const formattedData = processedData.map(item => ({
      ...item,
      date: item.date.toLocaleDateString()
    }));
    
    setOrderDetails(formattedData);
    setIsLoading(false);
  }, [data]);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => {
      if (prevOrder === null) return 'asc';
      if (prevOrder === 'asc') return 'desc';
      return null;
    });
  };

  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orderDetails];

    if (searchTerm) {
      result = result.filter(order =>
        order.orderID.toString().includes(searchTerm) ||
        order.productCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder) {
      result.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    return result;
  }, [orderDetails, searchTerm, sortOrder]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <LoadingSign />;
  }

  if (!OderPageOpened) {
    return (
      <div className="bg-opacity-50 p-4 backdrop-blur-sm flex flex-col h-full">
        <h2 className="text-white text-lg font-semibold mb-4">Order details</h2>
        <div className="flex-grow overflow-x-auto overflow-y-auto custom-scrollbar">
          <div className="min-w-[600px]">
            <table className="w-full text-xs sm:text-sm lg:text-base text-left text-white">
              <thead className="text-xxs sm:text-xs rounded-lg uppercase bg-[#855285] sticky top-0 z-10">
                <tr className='rounded-lg'>
                  <th scope="col" className="px-2 sm:px-6 py-2 sm:py-3">Date</th>
                  <th scope="col" className="px-2 sm:px-6 py-2 sm:py-3">Client</th>
                  <th scope="col" className="px-2 sm:px-6 py-2 sm:py-3">Order ID</th>
                  <th scope="col" className="px-2 sm:px-6 py-2 sm:py-3">Product Code</th>
                  <th scope="col" className="px-2 sm:px-6 py-2 sm:py-3">Quantity</th>
                  <th scope="col" className="px-2 sm:px-6 py-2 sm:py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.slice(0, 10).map((order, index) => (
                  <tr key={index} className="border-b border-[#855285] hover:bg-[#855285] hover:bg-opacity-25 transition-colors duration-200">
                    <td className="px-2 sm:px-6 py-2 sm:py-3">{order.date}</td>
                    <td className="px-2 sm:px-6 py-2 sm:py-3">{order.client}</td>
                    <td className="px-2 sm:px-6 py-2 sm:py-3">{order.orderID}</td>
                    <td className="px-2 sm:px-6 py-2 sm:py-3">{order.productCode}</td>
                    <td className="px-2 sm:px-6 py-2 sm:py-3">{order.quantity}</td>
                    <td className="px-2 sm:px-6 py-2 sm:py-3">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/orderDetails" className="bg-[#855285] text-white text-xxs sm:text-xs px-4 sm:px-6 py-2 rounded-full hover:bg-opacity-80 transition-colors duration-200">
            View More Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='app h-fit xl:h-screen px-4 sm:px-0 sm:pr-8'>
      <TopBar />
      <div className='flex'>
        <SideBar />
        <div className='h-full w-full mb-24 sm:mb-5'>
          <div className="h-full p-8 flex flex-col glass">
            <h2 className="text-[#E0D8E3] text-xl sm:text-2xl font-semibold mb-3 tracking-wide">Order Details</h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-3 space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={toggleSortOrder}
                  className="bg-[#553255] text-[#E0D8E3] px-2 py-1 rounded-md text-sm flex items-center"
                >
                  <FaSort className="mr-1" />
                  {sortOrder === 'asc' ? 'Sort Ascending' : sortOrder === 'desc' ? 'Sort Descending' : 'Sort by Date'}
                </button>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Order ID/ Product Code"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#553255] text-[#E0D8E3] px-2 py-1 rounded-md text-sm w-full placeholder:text-slate-300 placeholder:text-xs"
                />
                <FaSearch className="text-[#E0D8E3]" />
              </div>
            </div>
            <div className="flex-grow overflow-x-auto overflow-y-auto">
              <table className="w-full text-xs sm:text-sm lg:text-base text-left text-[#E0D8E3]">
                <thead className="text-xxs sm:text-xs uppercase bg-[#855285] sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-2 sm:px-3 lg:px-4 py-2">Date</th>
                    <th scope="col" className="px-2 sm:px-3 lg:px-4 py-2">Client</th>
                    <th scope="col" className="px-2 sm:px-3 lg:px-4 py-2">Order ID</th>
                    <th scope="col" className="px-2 sm:px-3 lg:px-4 py-2">Product Code</th>
                    <th scope="col" className="px-2 sm:px-3 lg:px-4 py-2">Quantity</th>
                    <th scope="col" className="px-2 sm:px-3 lg:px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((order, index) => (
                    <tr key={index} className="border-b border-[#855285] hover:bg-[#855285] hover:bg-opacity-25 transition-colors duration-200">
                      <td className="px-2 sm:px-3 lg:px-4 py-2">{order.date}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2">{order.client}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2">{order.orderID}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2">{order.productCode}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2">{order.quantity}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-3">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1 || filteredAndSortedOrders.length === 0}
                className="bg-[#855285] text-[#E0D8E3] px-2 py-1 sm:px-3 sm:py-1 rounded-full disabled:opacity-50 text-sm sm:text-base"
              >
                <FaChevronLeft />
              </button>
              <span className="text-[#E0D8E3] text-sm sm:text-base">
                Page {currentPage} of {Math.max(1, Math.ceil(filteredAndSortedOrders.length / itemsPerPage))}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.max(1, Math.ceil(filteredAndSortedOrders.length / itemsPerPage)) || filteredAndSortedOrders.length === 0}
                className="bg-[#855285] text-[#E0D8E3] px-2 py-1 sm:px-3 sm:py-1 rounded-full disabled:opacity-50 text-sm sm:text-base"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOrderDetails;
