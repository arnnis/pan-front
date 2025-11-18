import { type PermitTransferFrom, type PermitTransferFromData, type Witness } from '@pancakeswap/permit2-sdk';
import { type Address, type Hex } from 'viem';
import { type XSupportedChainId } from '../constants';
import { Order, type OrderInfo } from './Order';
export type DutchOutput = {
    readonly token: Address;
    readonly startAmount: bigint;
    readonly endAmount: bigint;
    readonly recipient: Address;
};
export type DutchInput = {
    readonly token: Address;
    readonly startAmount: bigint;
    readonly endAmount: bigint;
};
export type ExclusiveDutchOrderInfo = OrderInfo & {
    decayStartTime: bigint;
    decayEndTime: bigint;
    exclusiveFiller: Address;
    exclusivityOverrideBps: bigint;
    input: DutchInput;
    outputs: DutchOutput[];
};
type ChangeBigIntToString<T extends object> = {
    [key in keyof T]: T[key] extends bigint ? string : T[key];
};
export type ExclusiveDutchOrderInfoJSON = ChangeBigIntToString<ExclusiveDutchOrderInfo>;
export type WitnessInfo = {
    info: OrderInfo;
    decayStartTime: bigint;
    decayEndTime: bigint;
    exclusiveFiller: Address;
    exclusivityOverrideBps: bigint;
    inputToken: Address;
    inputStartAmount: bigint;
    inputEndAmount: bigint;
    outputs: DutchOutput[];
};
export declare class ExclusiveDutchOrder extends Order {
    readonly info: ExclusiveDutchOrderInfo;
    readonly chainId: XSupportedChainId;
    readonly _permit2Address?: Address | undefined;
    permit2Address: Address | undefined;
    constructor(info: ExclusiveDutchOrderInfo, chainId: XSupportedChainId, _permit2Address?: Address | undefined);
    static fromJSON(info: ExclusiveDutchOrderInfoJSON, chainId: number, _permit2Address?: Address): ExclusiveDutchOrder;
    static parse(encoded: Hex, chainId: number): ExclusiveDutchOrder;
    /**
     * @inheritdoc order
     */
    encode(): Hex;
    hash(): Hex;
    /**
     * @inheritdoc Order
     */
    permitData(): PermitTransferFromData;
    toPermit(): PermitTransferFrom;
    witnessInfo(): WitnessInfo;
    witness(): Omit<Witness, 'witness'> & {
        witness: WitnessInfo;
    };
    decayInput(timestamp: bigint): DutchInput & {
        currentAmount: bigint;
    };
    decayOutputs(timestamp: bigint): (DutchOutput & {
        currentAmount: bigint;
    })[];
    private decay;
}
export {};
//# sourceMappingURL=ExclusiveDutchOrder.d.ts.map