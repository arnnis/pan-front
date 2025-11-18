export declare enum EditingCurrency {
    TOKEN = 0,
    USD = 1
}
export declare enum CalculatorMode {
    ROI_BASED_ON_PRINCIPAL = 0,// User edits principal value and sees what ROI they get
    PRINCIPAL_BASED_ON_ROI = 1
}
export interface RoiCalculatorControlState {
    compounding: boolean;
    compoundingFrequency: number;
    activeCompoundingIndex: number;
    stakingDuration: number;
    mode: CalculatorMode;
    editingCurrency: EditingCurrency;
}
export interface RoiCalculatorDataState {
    principalAsToken: string;
    principalAsUSD: string;
    roiUSD: number;
    roiTokens: number;
    roiPercentage: number;
}
export interface RoiCalculatorReducerState {
    controls: RoiCalculatorControlState;
    data: RoiCalculatorDataState;
}
declare const useRoiCalculatorReducer: ({ stakingTokenPrice, earningTokenPrice, autoCompoundFrequency, }: {
    stakingTokenPrice: number;
    earningTokenPrice: number;
    autoCompoundFrequency: number;
}, initialState: any) => {
    state: RoiCalculatorReducerState;
    setPrincipalFromUSDValue: (amount: string) => void;
    setPrincipalFromTokenValue: (amount: string) => void;
    setStakingDuration: (stakingDurationIndex: number) => void;
    toggleCompounding: () => void;
    toggleEditingCurrency: () => void;
    setCompoundingFrequency: (index: number) => void;
    setCalculatorMode: (modeToSet: CalculatorMode) => void;
    setTargetRoi: (amount: string) => void;
    dispatch: import("react").Dispatch<{
        type: string;
        payload?: any;
    }>;
};
export default useRoiCalculatorReducer;
interface DefaultCompoundStrategyProps {
    state: any;
    apr?: number;
    earningTokenPrice: number;
    stakingTokenPrice: number;
    performanceFee: number;
    dispatch: any;
}
export declare function DefaultCompoundStrategy({ state, apr, earningTokenPrice, stakingTokenPrice, performanceFee, dispatch, }: DefaultCompoundStrategyProps): null;
