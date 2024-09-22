'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis, BarChart, Bar, Cell, Area, ComposedChart, LabelList } from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/globalRedux/store';
import { divide, subtract } from '../helper';
import LoadingSign from '@/app/components/LoadingSign';
import { TooltipProps } from '@/app/utils';

export const ChartForSales: React.FC = () => {
  const salesAnalysisArray = useSelector((state: RootState) => state.sales.salesAnalysisArray);
  const { currentYear, currentMonth } = useSelector((state: RootState) => state.sales);

  const chartData = useMemo(() => {
    const sortedData = [...salesAnalysisArray].sort((a, b) => +a.YEAR - +b.YEAR);
    return sortedData.flatMap((yearData) => 
      yearData.SALES.MONTH.map((sales, monthIndex) => ({
        date: `${yearData.YEAR}-${monthIndex + 1}`,
        sales: +yearData.YEAR < currentYear || (+yearData.YEAR === currentYear && monthIndex < currentMonth) ? sales : null
      }))
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [salesAnalysisArray, currentYear, currentMonth]);

  const isDownwardTrend = useMemo(() => {
    const validData = chartData.filter(item => item.sales !== null);
    if (validData.length < 2) return false;
    return (validData[validData.length - 1].sales ?? 0) < (validData[0].sales ?? 0);
  }, [chartData]);

  

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length && payload[0].value !== null) {
      return (
        <div className="bg-[#553255] p-1 rounded-md text-xs sm:text-sm">
          <p className="text-white">{`Sales: ${payload[0].value}`}</p>
          <p className="text-white">{`Date: ${payload[0].payload.date}`}</p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return <LoadingSign />;
  }

  return (
    <div className="flex flex-col h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="sales"
            stroke={isDownwardTrend ? "#FF6B6B" : "#4ECDC4"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ChartForCustomers: React.FC = () => {
  const salesAnalysisArray = useSelector((state: RootState) => state.sales.salesAnalysisArray);
  const { currentYear, currentMonth } = useSelector((state: RootState) => state.sales);

  const chartData = useMemo(() => {
    const sortedData = [...salesAnalysisArray].sort((a, b) => +a.YEAR - +b.YEAR);
    return sortedData.flatMap((yearData) => 
      yearData.CUSTOMERS.MONTH.map((customers, monthIndex) => ({
        date: `${yearData.YEAR}-${monthIndex + 1}`,
        customers: +yearData.YEAR < currentYear || (+yearData.YEAR === currentYear && monthIndex < currentMonth) ? customers : null
      }))
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [salesAnalysisArray, currentYear, currentMonth]);

  const isDownwardTrend = useMemo(() => {
    const validData = chartData.filter(item => item.customers !== null);
    if (validData.length < 2) return false;
    return (validData[validData.length - 1].customers ?? 0) < (validData[0].customers ?? 0);
  }, [chartData]);

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length && payload[0].value !== null) {
      return (
        <div className="bg-[#553255] p-1 rounded-md text-xs sm:text-sm">
          <p className="text-white">{`Customers: ${payload[0].value}`}</p>
          <p className="text-white">{`Date: ${payload[0].payload.date}`}</p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return <LoadingSign />;
  }

  return (
    <ResponsiveContainer  width="100%" height="100%">
      <LineChart data={chartData}>
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="customers"
          stroke={isDownwardTrend ? "#FF6B6B" : "#4ECDC4"}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const ChartForOrders: React.FC = () => {
  const salesAnalysisArray = useSelector((state: RootState) => state.sales.salesAnalysisArray);
  const { currentYear, currentMonth } = useSelector((state: RootState) => state.sales);

  const chartData = useMemo(() => {
    const sortedData = [...salesAnalysisArray].sort((a, b) => +a.YEAR - +b.YEAR);
    return sortedData.flatMap((yearData) => 
      yearData.ORDERS.MONTH.map((orders, monthIndex) => ({
        date: `${yearData.YEAR}-${monthIndex + 1}`,
        orders: +yearData.YEAR < currentYear || (+yearData.YEAR === currentYear && monthIndex < currentMonth) ? orders : null
      }))
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [salesAnalysisArray, currentYear, currentMonth]);

  const isDownwardTrend = useMemo(() => {
    const validData = chartData.filter(item => item.orders !== null);
    if (validData.length < 2) return false;
    return (validData[validData.length - 1].orders ?? 0) < (validData[0].orders ?? 0);
  }, [chartData]);

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length && payload[0].value !== null) {
      return (
        <div className="bg-[#553255] p-1 rounded-md text-xs sm:text-sm">
          <p className="text-white">{`Orders: ${payload[0].value}`}</p>
          <p className="text-white">{`Date: ${payload[0].payload.date}`}</p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return <LoadingSign />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="orders"
          stroke={isDownwardTrend ? "#FF6B6B" : "#4ECDC4"}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Yearly Comparison Chart
export const YearlyComparisonChart: React.FC = () => {
  const salesAnalysisArray = useSelector((state: RootState) => state.sales.salesAnalysisArray);
  const { currentYear, currentMonth } = useSelector((state: RootState) => state.sales);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    if (salesAnalysisArray.length > 0 && selectedYear === null) {
      const availableYears = salesAnalysisArray.map(data => +data.YEAR);
      setSelectedYear(Math.max(...availableYears));
    }
  }, [salesAnalysisArray, selectedYear]);

  const chartData = useMemo(() => {
    if (!selectedYear) return [];

    const yearData = salesAnalysisArray.find(data => +data.YEAR === selectedYear);

    if (!yearData) return [];

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return yearData.SALES.MONTH.map((sales, index) => ({
      month: monthNames[index],
      sales: selectedYear < currentYear || (selectedYear === currentYear && index < currentMonth) ? +(sales / 1000).toFixed(1) : null,
      customers: selectedYear < currentYear || (selectedYear === currentYear && index < currentMonth) ? yearData.CUSTOMERS.MONTH[index] : null
    }));
  }, [salesAnalysisArray, selectedYear, currentYear, currentMonth]);

  const availableYears = useMemo(() => 
    salesAnalysisArray.map(data => +data.YEAR).sort((a, b) => b - a),
    [salesAnalysisArray]
  );

  const formatYAxis = (value: number) => `${value}K`;

  const maxSales = useMemo(() => Math.max(...chartData.map(data => data.sales || 0)), [chartData]);
  const maxCustomers = useMemo(() => Math.max(...chartData.map(data => data.customers || 0)), [chartData]);

  const yAxisTicks = useMemo(() => {
    const maxValue = Math.max(maxSales, maxCustomers);
    const step = Math.ceil(maxValue / 6);
    return Array.from({ length: 7 }, (_, i) => i * step);
  }, [maxSales, maxCustomers]);

  if (!selectedYear || chartData.length === 0) {
    return <LoadingSign />;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center py-2 px-4">
        <h2 className="text-[#E0D8E3] text-lg sm:text-xl font-semibold mb-2 sm:mb-0 tracking-wide">Customers and Sales Trend</h2>
        <div className="flex items-center mb-2 sm:mb-0">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 bg-[#FF6B6B] rounded-full mr-2"></div>
            <span className="text-white text-sm">Sales</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#4ECDC4] rounded-full mr-2"></div>
            <span className="text-white text-sm">Customers</span>
          </div>
        </div>
        <div className="relative inline-block">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(+e.target.value)}
            className="appearance-none bg-[#553255] bg-opacity-50 text-white text-xs px-2 py-1 pr-6 rounded-full border border-[#855285] outline-none shadow-md transition-all duration-300 hover:bg-opacity-70 focus:ring-2 focus:ring-[#855285] backdrop-blur-sm cursor-pointer w-full"
          >
            {availableYears.map(year => (
              <option key={year} value={year} className="bg-[#553255] rounded-lg outline-none  text-white py-1 px-2 my-1 hover:bg-[#7B5A7B] transition-colors duration-200">{year}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-white">
            <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-grow sm:px-4">
        <ResponsiveContainer width="100%" height="100%" style={{padding: '0px'}}>
          <ComposedChart data={chartData}>
            <XAxis dataKey="month" stroke="#A79CAA" tick={{fontSize: 10}} />
            <YAxis 
              yAxisId="left"
              tickFormatter={formatYAxis} 
              stroke="#A79CAA" 
              ticks={yAxisTicks}
              tick={{fontSize: 10}}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#A79CAA" 
              ticks={yAxisTicks}
              tick={{fontSize: 10}}
            />
            <Tooltip 
              formatter={(value, name) => [name === 'sales' ? `${value}K` : value, name === 'sales' ? 'Sales' : 'Customers']}
              contentStyle={{ backgroundColor: '#553255', border: 'none', padding: '5px', fontSize: '12px' }}
              labelStyle={{ color: '#E0D8E3', fontSize: '10px' }}
            />
            <Area
              yAxisId="left" 
              type="monotone" 
              dataKey="sales" 
              name="sales" 
              stroke="#FF6B6B" 
              strokeWidth={2} 
              fill="#FF6B6B" 
              fillOpacity={0.3}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="customers"
              name="customers"
              stroke="#4ECDC4"
              strokeWidth={2}
              fill="#4ECDC4"
              fillOpacity={0.3}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      </div>
  );
};

export const RevenueChart: React.FC = () => {
  const salesAnalysisArray = useSelector((state: RootState) => state.sales.salesAnalysisArray);
  const [selectedYear, setSelectedYear] = useState<number>(0);

  useEffect(() => {
    if (salesAnalysisArray.length > 0) {
      const latestYear = Math.max(...salesAnalysisArray.map(item => +item.YEAR));
      setSelectedYear(latestYear);
    }
  }, [salesAnalysisArray]);

  const chartData = useMemo(() => {
    if (!selectedYear) return [];
    const yearData = salesAnalysisArray.find(item => +item.YEAR === selectedYear);
    if (!yearData) return [];
    return yearData.SALES.QTR.map((sales, index) => ({
      quarter: `Q${index + 1}`,
      sales: divide(sales, 1000) // Convert to thousands for easier reading
    }));
  }, [salesAnalysisArray, selectedYear]);

  const availableYears = useMemo(() => 
    salesAnalysisArray.map(item => +item.YEAR).sort((a, b) => subtract(b, a)),
    [salesAnalysisArray]
  );

  const formatYAxis = (tickItem: number) => `$${tickItem}K`;

  // Calculate the maximum sales value for setting up the domain
  const maxSales = useMemo(() => {
    return Math.max(...chartData.map(item => item.sales));
  }, [chartData]);

  // Calculate ticks for Y-axis
  const yAxisTicks = useMemo(() => {
    const tickCount = 6;
    const step = Math.ceil(maxSales / (tickCount - 1));
    return Array.from({ length: tickCount }, (_, i) => i * step);
  }, [maxSales]);

  // Find the quarter with the highest revenue
  const highestRevenueQuarter = useMemo(() => {
    return chartData.reduce((max, item) => item.sales > max.sales ? item : max, chartData[0]);
  }, [chartData]);

  if (chartData.length === 0) {
    return <LoadingSign />;
  }

  return (
    <div className="flex flex-col h-full py-2 sm:p-4 bg-transparent">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-white text-lg font-semibold">Revenue</h2>
        <div className="relative inline-block">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(+e.target.value)}
            className="appearance-none bg-[#553255] bg-opacity-50 text-white text-xs px-2 py-1 pr-6 rounded-full border border-[#855285] outline-none shadow-md transition-all duration-300 hover:bg-opacity-70 focus:ring-2 focus:ring-[#855285] backdrop-blur-sm cursor-pointer w-full"
          >
            {availableYears.map(year => (
              <option key={year} value={year} className="bg-[#553255] text-white py-1 px-2 my-1 hover:bg-[#7B5A7B] transition-colors duration-200">{year}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-white">
            <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="quarter" stroke="#A79CAA" tick={{fontSize: 10}} />
            <YAxis 
              tickFormatter={formatYAxis} 
              stroke="#A79CAA" 
              domain={[0, maxSales * 1.1]} // Set the domain to be slightly higher than the max value
              ticks={yAxisTicks} // Use the calculated ticks
              tick={{fontSize: 10}}
            />
            <Tooltip
              formatter={(value) => `$${value}K`}
              contentStyle={{ backgroundColor: '#553255', border: 'none', padding: '5px', fontSize: '12px' }}
              labelStyle={{ color: '#E0D8E3', fontSize: '10px' }}
              cursor={{fill: 'transparent'}}
            />
            <Bar 
              dataKey="sales" 
              fill="#855285" 
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.quarter === highestRevenueQuarter.quarter ? '#4ECDC4' : '#855285'}
                  opacity={entry.quarter === highestRevenueQuarter.quarter ? 1 : 0.3}
                />
              ))}
              <LabelList
                dataKey="sales"
                position="top"
                content={(props) => {
                  const { x, y, width, value, index } = props;
                  if (index !== undefined && chartData[index]?.quarter === highestRevenueQuarter.quarter) {
                    return (
                      <text 
                        x={x !== undefined && width !== undefined ? Number(x) + Number(width) / 2 : 0} 
                        y={y !== undefined ? Number(y) - 10 : 0} 
                        fill="#4ECDC4" 
                        textAnchor="middle" 
                        fontSize={10}
                      >
                        ${value}K
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const ReturnsTrendChart: React.FC = () => {
  const { data, salesAnalysisArray, currentYear, currentMonth, exportCostPerItem } = useSelector((state: RootState) => state.sales);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const availableYears = useMemo(() => {
    return Array.from(new Set(data.map(item => new Date(item.ORDERDATE).getFullYear()))).sort((a, b) => b - a);
  }, [data]);

  const chartData = useMemo(() => {
    const yearData = salesAnalysisArray.find(item => item.YEAR === selectedYear);
    if (!yearData) return [];

    return yearData.SALES.MONTH.map((sales, index) => ({
      month: new Date(0, index).toLocaleString('default', { month: 'short' }),
      revenue: Math.max(0, sales - (yearData.ORDERS.MONTH[index] * exportCostPerItem)),
    }));
  }, [salesAnalysisArray, selectedYear, exportCostPerItem]);

  const maxRevenue = Math.max(...chartData.map(item => item.revenue));
  const minRevenue = Math.min(...chartData.map(item => item.revenue));
  const yAxisTicks = Array.from({ length: 6 }, (_, i) => Math.round(maxRevenue * i / 5));

  const formatYAxis = (value: number) => `$${(value / 1000).toFixed(0)}K`;

  if (chartData.length === 0) {
    return <LoadingSign />;
  }
  return (
    <div className="flex flex-col h-full py-2 sm:p-4 bg-transparent">
      <div className="flex justify-between items-center mb-4 px-4 sm:px-0">
        <h2 className="text-lg font-semibold text-white">Return Trend</h2>
        <div className="relative inline-block">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(+e.target.value)}
            className="appearance-none bg-[#553255] bg-opacity-50 text-white text-xs px-2 py-1 pr-6 rounded-full border border-[#855285] outline-none shadow-md transition-all duration-300 hover:bg-opacity-70 focus:ring-2 focus:ring-[#855285] backdrop-blur-sm cursor-pointer w-full"
          >
            {availableYears.map(year => (
              <option key={year} value={year} className="bg-[#553255] text-white py-1 px-2 my-1 hover:bg-[#7B5A7B] transition-colors duration-200">{year}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-white">
            <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" stroke="#A79CAA" tick={{ fontSize: 10 }} />
            <YAxis 
              tickFormatter={formatYAxis} 
              stroke="#A79CAA" 
              domain={[0, maxRevenue * 1.1]}
              ticks={yAxisTicks}
              tick={{ fontSize: 10 }}
            />
            <Tooltip
              formatter={(value: number | string) => `$${typeof value === 'number' ? value.toFixed(2) : value}`}
              contentStyle={{ backgroundColor: '#553255', border: 'none', padding: '5px', fontSize: '12px' }}
              labelStyle={{ color: '#E0D8E3', fontSize: '10px' }}
              cursor={{fill: 'transparent'}}
            />
            <Bar 
              dataKey="revenue" 
              fill="#855285" 
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.revenue === maxRevenue ? '#4ECDC4' : entry.revenue === minRevenue ? '#FF6B6B' : '#855285'}
                  opacity={(entry.revenue !== minRevenue && entry.revenue !== maxRevenue) ? 0.35 : 1}
                />
              ))}

              <LabelList
                dataKey="revenue"
                position="top"
                content={(props) => {
                  const { x, y, width, value, index } = props;
                  if (index === undefined) return null;
                  if (selectedYear > currentYear || (selectedYear === currentYear && index >= currentMonth)) {
                    return null;
                  }
                  let prevValue;
                  if (index === 0) {
                    const prevYearData = salesAnalysisArray.find(item => item.YEAR === selectedYear - 1);
                    prevValue = prevYearData ? prevYearData.SALES.MONTH[11] - (prevYearData.ORDERS.MONTH[11] * exportCostPerItem) : 0;
                  } else {
                    prevValue = chartData[index - 1].revenue;
                  }
                  const percentChange = prevValue !== 0 ? ((Number(value) - prevValue) / prevValue * 100).toFixed(2) : '100.00';
                  const isIncrease = Number(value) > prevValue;
                  return (
                    <g className='invisible sm:visible'> 
                      {
                        <text 
                          x={x !== undefined && width !== undefined ? Number(x) + Number(width) / 2 : 0} 

                        y={y !== undefined ? Number(y) - 10 : 0} 
                        fill={isIncrease ? '#4ECDC4' : '#FF6B6B'} 
                        textAnchor="middle" 
                        fontSize={10}
                      >
                        {isIncrease ? '▲' : '▼'} {Math.abs(Number(percentChange))}%
                      </text>
                      }
                    </g>
                  );
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
