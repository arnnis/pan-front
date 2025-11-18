import { BigintIsh, Token } from '@pancakeswap/sdk';
import { PermitSingle } from '../allowanceTransfer';
export interface Permit extends PermitSingle {
    sigDeadline: string;
}
export declare const toDeadline: (expiration: number) => number;
export declare const generatePermitTypedData: (token: Token, nonce: BigintIsh, spender: string) => Permit;
//# sourceMappingURL=utils.d.ts.map