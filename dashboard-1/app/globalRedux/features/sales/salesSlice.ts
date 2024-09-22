'use client';

import { data_element, salesArrayType } from "@/app/utils";
import { createSlice } from "@reduxjs/toolkit";
import sampleData from "@/app/sampledata.json"
import { add, getYear } from "@/app/helper";

export interface salesState {
    data : data_element[],
    total_sales : number,
    salesAnalysisArray : salesArrayType[],
    currentYear : number,
    currentMonth : number,
    exportCostPerItem : number
}


const initialState : salesState = {
    data : sampleData,
    total_sales : sampleData.reduce((total, val) => {return add(total, (typeof val.SALES !== 'number' ? parseInt(val.SALES) : val.SALES))!}, 0),
    salesAnalysisArray : [],
    currentYear : 2005,
    currentMonth : 5,
    exportCostPerItem : 10
}




export const salesSlice = createSlice({
    name : "sales",
    initialState,
    reducers : {
        getSales: (state) => {
            return state;
        },
        getSalesArray: (state) => {
            let obj : salesArrayType[] = [];
            const mpYearSales = new Map<string | number, number[]>();
            const mpCustomerYear = new Map<string | number, number[]>();
            const mpOrderYear = new Map<string | number, number[]>();
            state.data.map((item) => {
                const year = getYear(item.ORDERDATE);
                const monthIndex = item.MONTH_ID - 1;
                
                // For sales
                if (mpYearSales.has(year)) {
                    
                    const yearData = mpYearSales.get(year);
                    if (yearData) {
                        yearData[monthIndex] = add((yearData[monthIndex] || 0), (typeof item.SALES !== 'number' ? parseInt(item.SALES) : item.SALES))!; 
                        mpYearSales.set(year, yearData); 
                    }
                } else {
                    const newYearData = new Array(12).fill(0);
                    newYearData[monthIndex] = (typeof item.SALES !== 'number' ? parseInt(item.SALES) : item.SALES); 
                    mpYearSales.set(year, newYearData);
                }

                // For customers
                if (mpCustomerYear.has(year)) {
                    const yearData = mpCustomerYear.get(year);
                    if (yearData) {
                        yearData[monthIndex] = add((yearData[monthIndex] || 0), 1)!; 
                        mpCustomerYear.set(year, yearData); 
                    }
                } else {
                    const newYearData = new Array(12).fill(0);
                    newYearData[monthIndex] = 1; 
                    mpCustomerYear.set(year, newYearData);
                }

                // For orders
                if (mpOrderYear.has(year)) {
                    
                    const yearData = mpOrderYear.get(year);
                    if (yearData) {
                        yearData[monthIndex] = add((yearData[monthIndex] || 0), item.QUANTITYORDERED)!; 
                        mpOrderYear.set(year, yearData); 
                    }
                } else {
                    const newYearData = new Array(12).fill(0);
                    newYearData[monthIndex] = item.QUANTITYORDERED; 
                    mpOrderYear.set(year, newYearData);
                }
            
            })
            mpYearSales.forEach((value: number[], key: string | number) => {
                let count = 0;
                let qtrSales = 0;
                let qtrCustomer = 0;
                let qtrOrder = 0;
                const quaterSales: number[] = new Array(4).fill(0);
                const quaterCustomer: number[] = new Array(4).fill(0);
                const quaterOrder: number[] = new Array(4).fill(0);
            
                // For sales
                value.forEach((item, idx) => {
                    
                    if (idx % 3 === 0 && idx > 0) {
                        quaterSales[count] = qtrSales;
                        qtrSales = item;
                        count++;
                    } else {
                        qtrSales = add(qtrSales, item)!;  
                    }
                });

                // For customers
                count = 0;
                mpCustomerYear.get(key)?.forEach((item, idx) => {
                    if (idx % 3 === 0 && idx > 0) {
                        quaterCustomer[count] = qtrCustomer;
                        qtrCustomer =  item;
                        count++;
                    } else{
                        qtrCustomer = add(qtrCustomer, item)!;
                    }
                })
            
                // For orders
                count = 0;
                mpOrderYear.get(key)?.forEach((item, idx) => {
                    if (idx % 3 === 0 && idx > 0) {
                        quaterOrder[count] = qtrOrder;
                        qtrOrder =  item;
                        count++;
                    } else{
                        qtrOrder = add(qtrOrder, item)!;
                    }
                })
                    
                if (count < 4) {

                    quaterSales[count] = qtrSales;
                    quaterCustomer[count] = qtrCustomer;
                    quaterOrder[count] = qtrOrder;
                }
            

                obj = [...obj, { YEAR: key, 
                    SALES: { QTR: quaterSales, MONTH: value, TOTAL : 0 }, 
                    CUSTOMERS: {QTR : quaterCustomer, MONTH: mpCustomerYear.get(key)!, TOTAL : 0},
                    ORDERS: {QTR : quaterOrder, MONTH: mpOrderYear.get(key)!, TOTAL : 0}

                 }];
            });

            obj.forEach((item) => {
                item.SALES.TOTAL = item.SALES.QTR.reduce((total, val) => {return add(total, val)!}, 0);
                item.CUSTOMERS.TOTAL = item.CUSTOMERS.QTR.reduce((total, val) => {return add(total, val)!}, 0);
                item.ORDERS.TOTAL = item.ORDERS.QTR.reduce((total, val) => {return add(total, val)!}, 0);
            })
            


            console.log(obj);
            
            state.salesAnalysisArray = obj;
        }
    }
})

export const { getSales, getSalesArray } = salesSlice.actions;

export default salesSlice.reducer;