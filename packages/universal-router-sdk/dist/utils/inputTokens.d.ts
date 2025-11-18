import { Permit2Signature } from '../entities/types';
import { RoutePlanner } from './routerCommands';
export type ApproveProtocol = {
    token: string;
    protocol: string;
};
export type Permit2TransferFrom = {
    token: string;
    amount: string;
    recipient?: string;
};
export type InputTokenOptions = {
    approval?: ApproveProtocol;
    permit2Permit?: Permit2Signature;
    permit2TransferFrom?: Permit2TransferFrom;
};
export declare function encodePermit(planner: RoutePlanner, permit2: Permit2Signature): void;
export declare function encodeInputTokenOptions(planner: RoutePlanner, options: InputTokenOptions): void;
//# sourceMappingURL=inputTokens.d.ts.map