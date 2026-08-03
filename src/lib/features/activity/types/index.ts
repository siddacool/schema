export interface Activity {
  id?: number;
  _id: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  planId: string;

  // Tree View params
  path: string;
}

export type ActivityCreateData = Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>;

export type ActivityCreateFormData = {
  description: string;
  path: string;
  _id: string;
};
