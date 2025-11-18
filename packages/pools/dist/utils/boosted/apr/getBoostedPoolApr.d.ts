import { Address, PublicClient } from 'viem';
interface GetBoostedPoolApr {
    client: PublicClient;
    contractAddress: Address;
    chainId: number | undefined;
}
export declare const getBoostedPoolApr: ({ client, contractAddress, chainId }: GetBoostedPoolApr) => Promise<number>;
export {};
//# sourceMappingURL=getBoostedPoolApr.d.ts.map