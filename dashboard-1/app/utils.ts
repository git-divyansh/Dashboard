import { ImageLoader } from "next/image";

export interface ImageProps {
    src: string | undefined;
    alt?: string;
    width?: number | `${number}`;
    height?: number | `${number}`;
    fill?: boolean;
    loader?: ImageLoader;
    lazyRoot?: string;
  }

export interface data_element {
    ORDERNUMBER: string | number
    QUANTITYORDERED: number
    PRICEEACH: string | number
    ORDERLINENUMBER: string | number
    SALES: string | number
    ORDERDATE: string
    STATUS: string | number
    QTR_ID: string | number
    MONTH_ID: number
    YEAR_ID: string | number
    PRODUCTLINE: string | number
    MSRP: string | number
    PRODUCTCODE: string | number
    CUSTOMERNAME: string | number
    PHONE: number | string
    ADDRESSLINE1: string | number
    ADDRESSLINE2: string | number
    CITY: string | number
    STATE: string | number
    POSTALCODE: string | number
    COUNTRY: string | number
    TERRITORY: string | number
    CONTACTLASTNAME: string | number
    CONTACTFIRSTNAME: string | number
    DEALSIZE: string | number
}


export interface salesArrayType {
    YEAR : string | number
    SALES : {
        QTR : number[];
        MONTH : number[];
        TOTAL : number;
    }
    CUSTOMERS : {
        QTR : number[];
        MONTH : number[];
        TOTAL : number;
    },
    ORDERS : {
        QTR : number[];
        MONTH : number[];
        TOTAL : number;
    }

}

export interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      value: number | null;
      payload: {
        date: string;
      };
    }>;
  };