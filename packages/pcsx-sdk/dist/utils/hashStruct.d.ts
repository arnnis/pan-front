type MessageTypeProperty = {
    name: string;
    type: string;
};
export declare function hashStruct({ data, primaryType, types, }: {
    data: Record<string, unknown>;
    primaryType: string;
    types: Record<string, MessageTypeProperty[]>;
}): `0x${string}`;
export {};
//# sourceMappingURL=hashStruct.d.ts.map