import * as functions from "firebase-functions";
//import { Change } from "firebase-functions";
import { QueryDocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { SendEvidenceEmail } from "../shared/mail/templates/send-evidence-email/send-evidence-email";
import { Activity } from "../models/activity.model";
//import { OneTeacher } from "../utils/teachers-utils";
//import { Teacher } from "../models/teacher.model";
import { GeneralEmail } from "../shared/mail/general-email";
import { SaveEmail } from "../shared/mail/save-email";
import { dbFirestore } from "../utils/utils";
import { OneTeacher } from "../utils/teachers-utils";

/**
 * Send user mails
 * ===============================================================
 *
 * @author Bruno Esparza
 *
 * Send mails to teachers, the mails are sended every time a teacher complete an activity
 *
 */
const _SendCompletedActivityEmails = async (
  payload: functions.Change<QueryDocumentSnapshot>,
  { params }: functions.EventContext
) => {
  const newActivity = payload.after.data() as Activity;
  const oldActivity = payload.before.data() as Activity;

  if (
    oldActivity.status !== "realizada" &&
    newActivity.status === "realizada"
  ) {
    const [teacher] = await Promise.all([
      OneTeacher(newActivity.integrativeTeacher),
    ]);

    const sendEvidenceTemplate = new SendEvidenceEmail({
      teacherName: teacher!.displayName.toUpperCase(),
      activityName: oldActivity.description,
    });
    const email = new GeneralEmail(
      teacher!.email,
      "Actividad ejecutada exitosamente en el Sistema de Gestión del Proyecto Docente Integrador",
      sendEvidenceTemplate
    );
    const saver = new SaveEmail(teacher!.email.split("@")[0], email);

    const batch = dbFirestore.batch();

    saver.saveSynced(batch);
    
    await batch.commit();
  }
};

export const SendCompletedActivityEmails = functions
  .runWith({ maxInstances: 2 })
  .firestore.document("activities/{id}")
  .onUpdate(_SendCompletedActivityEmails);
