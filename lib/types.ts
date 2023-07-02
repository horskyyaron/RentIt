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
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  images: Image[];
};

export type CardType = {
  id: number;
  proposerId: string;
  applyerId: string | null;
  rentPerDay: number,
  RentingDays: RentingDay[]
  type: "OFFER" | "ASK";
  createdAt: Date;
  updatedAt: Date;
  item: Item;

};

export type RentingDay = {
  id: number;
  date: Date;
  rentingCardId: number;
  rentingStatus: "AVAILABLE" | "TAKEN";
  createdAt: Date;
  updatedAt: Date;
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
