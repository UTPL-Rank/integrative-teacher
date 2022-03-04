import { Teacher } from "../models/teacher.model";
import { firestore } from "firebase-admin";
import { CurrentPeriodReference, PeriodDocument } from "./period-utils";
import { dbFirestore } from "./utils";
import { Activity } from "../models/activity.model";

/**
 * activities Firestore Collection
 * ==========================
 * 
 * @author Bruno Esparza
 * 
 * Get the firestore collection of activities
 */
function ActivitiesCollection() {
    return dbFirestore.collection('activities');
}

/**
 * Firestore Activity Document
 * ===============================================
 * 
 * @author Bruno Esparza
 * 
 * Get the firestore document of a Activity
 * 
 * @param id Identifier of the activity document 
 */
export function _ActivityDocument(id: string): firestore.DocumentReference<Activity> {
    return ActivitiesCollection().doc(id) as firestore.DocumentReference<Activity>;
}

/**
 * Activity Reference
 * ===============================================
 * 
 * @author Bruno Esparza
 * 
 * Get the reference to a Activity
 * 
 * @deprecated use `_ActivityDocument` instead
 * 
 * @param id identifier of the Activity
 */
export const ActivityReference = _ActivityDocument;

/**
 * List Activities Current Period
 * ==================================================
 * 
 * @author Bruno Esparza
 * 
 * @returns list of activities of the current academic period
 */
export async function ListActivitiesCurrentPeriod(): Promise<Array<Activity>> {
    const periodRef = await CurrentPeriodReference();
    const collection = ActivitiesCollection()
        .where('period.reference', '==', periodRef)

    const snap = await collection.get();

    const activities = snap.docs.map(doc => doc.data() as Activity);

    return activities;
}

/**
 * List Activities Period
 * ==================================================
 * 
 * @author Bruno Esparza
 * 
 * Get all the activities registered in an academic period
 * 
 * @param periodId identifier of the academic period
 * 
 * @returns list of Activities of the academic period
 */
export async function ListActivitiesPeriod(periodId: string): Promise<Array<Activity>> {
    const periodRef = PeriodDocument(periodId);
    const collection = ActivitiesCollection().where('period.reference', '==', periodRef)
    const snap = await collection.get();
    const activities = snap.docs.map(doc => doc.data() as Activity);

    return activities;
}


/**
 * List Activities With defined status
 * ====================================================
 * 
 * @author Bruno Esparza
 * @param status: activity status
 * Get a list of activities that has defined status
 */
export async function ListActivitiesByStatus(status: string): Promise<Array<Activity>> {
    const periodRef = await CurrentPeriodReference();
    
    const collection = ActivitiesCollection()
        .where('period.reference', '==', periodRef)
        .where('planningStatus', '==', status);

    const snap = await collection.get();
    const activities = snap.docs.map(doc => doc.data() as Activity);

    return activities;
}


export async function OneActivity(activityId: string): Promise<Activity | null> {
    const activityDoc = ActivitiesCollection().doc(activityId) as firestore.DocumentReference<Activity>;
    const snapshot = await activityDoc.get();
    const activity = snapshot.exists ? snapshot.data() as Activity : null;

    return activity;
}
