import * as functions from 'firebase-functions';
import {GeneralEmail} from '../shared/mail/general-email';
import {SaveEmail} from '../shared/mail/save-email';
import {NeverLoadPlanningEmail} from '../shared/mail/templates/load-planning-email/never-load-planning';
import {ListTeachersWithNoLoadPlanning} from '../utils/teachers-utils';
import {UsernameFromEmail} from '../utils/users-utils';
import {dbFirestore} from '../utils/utils';
import {BASE_URL} from '../utils/variables';

/**
 * At 10:00 on all-days-of-month  in April, October on Friday.
 * URL docs: https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules 
 */
const CRON_LOAD_PLANNIG = '0 10 * 4,10 5';

export const notifyTeachersLoadPlanning =
    functions
        .pubsub
        .schedule(CRON_LOAD_PLANNIG)
        .onRun(async _ => {
            const [listTeachersWithNoLoadPlanning] = await Promise.all([
                ListTeachersWithNoLoadPlanning(),
            ]);

            const batch = dbFirestore.batch();

            // Notify Teacher Load Planning 
            listTeachersWithNoLoadPlanning.forEach(teacher => {

                const username = UsernameFromEmail(teacher.email);

                const emailTemplate = new NeverLoadPlanningEmail({
                    redirectUrl: BASE_URL,
                    displayName: teacher.displayName.toUpperCase(),
                });

                const generalEmail = new GeneralEmail(
                    teacher.email,
                    'Recuerda registrar la planificación de Docente Integrador',
                    emailTemplate,
                );
                const saver = new SaveEmail(username, generalEmail);
                saver.saveSynced(batch);
            });
            
            return await batch.commit();
        });