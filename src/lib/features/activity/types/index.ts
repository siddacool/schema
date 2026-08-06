export interface Activity {
  id?: number;
  _id: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  planId: string;
  expanded?: boolean;

  // Tree View params
  path: string;
  headerActivityId?: string;
}

export type ActivityCreateData = Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>;

export type ActivityCreateFormData = {
  description: string;
  path: string;
  _id: string;
  headerActivityId?: string;
};

export interface ActivityGroup extends Activity {
  activity: Activity[];
}
