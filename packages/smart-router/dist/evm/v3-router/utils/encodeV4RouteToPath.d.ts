import { Address } from 'viem';
import { BaseRoute } from '../types';
export type PathKey = {
    intermediateCurrency: Address;
    fee: number;
    hooks: Address;
    poolManager: Address;
    hookData: `0x${string}`;
    parameters: `0x${string}`;
};
/**
 * Converts a route to an array of path key
 * @param route the mixed path to convert to an encoded path
 * @returns the encoded path keys
 */
export declare function encodeV4RouteToPath(route: BaseRoute, exactOutput: boolean): PathKey[];
//# sourceMappingURL=encodeV4RouteToPath.d.ts.map