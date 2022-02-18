import { Teacher } from "../models/teacher.model";
import { firestore } from "firebase-admin";
import { CurrentPeriodReference, PeriodDocument } from "./period-utils";
import { dbFirestore } from "./utils";

/**
 * integrative-teachers Firestore Collection
 * ==========================
 * 
 * @author Bruno Esparza
 * 
 * Get the firestore collection of integrative-teachers
 */
function TeachersCollection() {
    return dbFirestore.collection('integrative-teachers');
}

/**
 * Firestore Teacher Document
 * ===============================================
 * 
 * @author Bruno Esparza
 * 
 * Get the firestore document of a Teacher
 * 
 * @param id Identifier of the teacher document 
 */
export function _TeacherDocument(id: string): firestore.DocumentReference<Teacher> {
    return TeachersCollection().doc(id) as firestore.DocumentReference<Teacher>;
}

/**
 * Teacher Reference
 * ===============================================
 * 
 * @author Bruno Esparza
 * 
 * Get the reference to a Teacher
 * 
 * @deprecated use `_TeacherDocument` instead
 * 
 * @param id identifier of the Teacher
 */
export const TeacherReference = _TeacherDocument;

/**
 * List Teachers Current Period
 * ==================================================
 * 
 * @author Bruno Esparza
 * 
 * @returns list of teachers of the current academic period
 */
export async function ListTeachersCurrentPeriod(): Promise<Array<Teacher>> {
    const periodRef = await CurrentPeriodReference();
    const collection = TeachersCollection()
        .where('period.reference', '==', periodRef)

    const snap = await collection.get();

    const teachers = snap.docs.map(doc => doc.data() as Teacher);

    return teachers;
}

/**
 * List Teachers Period
 * ==================================================
 * 
 * @author Bruno Esparza
 * 
 * Get all the teachers registered in an academic period
 * 
 * @param periodId identifier of the academic period
 * 
 * @returns list of Teachers of the academic period
 */
export async function ListTeachersPeriod(periodId: string): Promise<Array<Teacher>> {
    const periodRef = PeriodDocument(periodId);
    const collection = TeachersCollection().where('period.reference', '==', periodRef)
    const snap = await collection.get();
    const teachers = snap.docs.map(doc => doc.data() as Teacher);

    return teachers;
}


/**
 * List Teachers With no Load Planning
 * ====================================================
 * 
 * @author Bruno Esparza
 * 
 * Get a list of teachers that hasn't loaded planning a week later start academic period
 */
export async function ListTeachersWithNoLoadPlanning(): Promise<Array<Teacher>> {
    const periodRef = await CurrentPeriodReference();
    
    const collection = dbFirestore.collection('integrative-teachers')
        .where('period.reference', '==', periodRef)
        .where('planningStatus', '==', 'incompleta');

    const snap = await collection.get();
    const teachers = snap.docs.map(doc => doc.data() as Teacher);

    return teachers;
}


export async function OneTeacher(teacherId: string): Promise<Teacher | null> {
    const teacherDoc = TeachersCollection().doc(teacherId) as firestore.DocumentReference<Teacher>;
    const snapshot = await teacherDoc.get();
    const teacher = snapshot.exists ? snapshot.data() as Teacher : null;

    return teacher;
}
export async function FindOneTeacherFromPeriod(teacherEmail: string, periodId: string): Promise<Teacher | null> {
    
    const periodRef = PeriodDocument(periodId)
    const teachersQuery = TeachersCollection().where('email', '==', teacherEmail).where('period.reference', '==', periodRef) as firestore.CollectionReference<Teacher>;
    const snaps = await teachersQuery.get();

    if (snaps.size !== 1)
        return null

    return snaps.docs[0].data();
}