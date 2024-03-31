export interface CardItem {
  id: number;
  title: string;
  description: string;
  url: string;
  createdAt: string;
  imageSource: string;
}

export interface LinkBase {
  id: number;
  created_at: string;
  updated_at: string | null;
  url: string;
  title: string;
  description: string;
  image_source: string;
  folder_id: number;
}

export interface Link extends CardItem {
  updatedAt: string | null;
  folderId: number;
}
