import { Dispatch, SetStateAction } from "react";
export declare enum PairDataTimeWindowEnum {
    HOUR = 0,
    DAY = 1,
    WEEK = 2,
    MONTH = 3,
    YEAR = 4
}
export declare enum PairPriceChartType {
    LINE = 0,
    CANDLE = 1
}
export type PairPriceChartNewProps = {
    data?: any[] | {
        time: Date;
        value: number;
    }[] | {
        time: Date;
        open: number;
        low: number;
        high: number;
        value: number;
    }[];
    type?: PairPriceChartType;
    setHoverValue?: Dispatch<SetStateAction<number | undefined>>;
    setHoverDate?: Dispatch<SetStateAction<string | undefined>>;
    isChangePositive: boolean;
    isChartExpanded: boolean;
    timeWindow: PairDataTimeWindowEnum;
    priceLineData?: {
        title: string;
        color: string;
        price: number;
    }[];
} & React.HTMLAttributes<HTMLDivElement>;
export declare const PairPriceChart: React.FC<PairPriceChartNewProps>;
export default PairPriceChart;
