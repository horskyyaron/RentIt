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

export type CardInitData = {
  clerk_id: string;
  item_name: string;
  description: string;
  rent: number;
  startDate: string;
  endDate: string;
  uploadingthing_data: [
    {
      fileKey: string;
      fileUrl: string;
    }
  ];
};
