import type { Activity } from '$lib/features/activity/types';
import type { Plan } from '$lib/features/plan/types';
import { Dexie, type EntityTable } from 'dexie';

const db = new Dexie('schema') as Dexie & {
  plans: EntityTable<
    Plan,
    'id' // primary key "id" (for the typings only)
  >;
  activity: EntityTable<
    Activity,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  plans: '++id, _id', // primary key "id" (for the runtime!)
  activity: '++id, _id, planId, parentId', // primary key "id" (for the runtime!)
});

export { db };
