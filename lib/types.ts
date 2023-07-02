export type Image = {
    fileKey: string;
    fileUrl: string;
    itemId: number;
    createdAt: Date;
    updatedAt: Date;
};

export type Item = {
    id: number;
    name: string;
    description: string;
    rentPerDay: number;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    images: Image[];
};

export type CardType = {
    id: number;
    proposerId: string;
    applyerId: string | null;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    item: Item;
};
