import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Deliverable {
  id?: string;
  owner: string;
  activityId?: string;
  filename?: string;
  path?: string;
  url?: string;
  createdAt?: Timestamp;
}
