import { Currency } from '@pancakeswap/sdk';
import { FeeAmount } from '@pancakeswap/v3-sdk';
export interface PoolMeta {
    currencyA: Currency;
    currencyB: Currency;
    id: `0x${string}`;
}
export interface V3PoolMeta extends PoolMeta {
    fee: FeeAmount;
}
//# sourceMappingURL=internalTypes.d.ts.map