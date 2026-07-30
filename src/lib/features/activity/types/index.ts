export interface Activity {
  id?: number;
  _id: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  level: number;
  planId: string;
  parentId?: string;
}

export type ActivityCreateData = Omit<Activity, 'id' | '_id' | 'createdAt' | 'updatedAt'>;
