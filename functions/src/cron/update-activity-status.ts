import * as functions from 'firebase-functions';
import {GeneralEmail} from '../shared/mail/general-email';
import {SaveEmail} from '../shared/mail/save-email';
import {NeverLoadPlanningEmail} from '../shared/mail/templates/load-planning-email/never-load-planning';
import {ListTeachersWithNoLoadPlanning} from '../utils/teachers-utils';
import {ListActivitiesByStatus} from '../utils/activity-utils';
import {UsernameFromEmail} from '../utils/users-utils';
import {dbFirestore} from '../utils/utils';
import {BASE_URL} from '../utils/variables';

/**
 * At 10:00 on all-days-of-month  in April, October on Friday.
 * URL docs: https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules 
 */
const CRON_UPDATE_ACTIVITY_STATUS = '30 20 * 1,2,4,5,6,7,8,10,11,12 0';

export const updateActivityStatus =
    functions
        .pubsub
        .schedule(CRON_UPDATE_ACTIVITY_STATUS)
        .onRun(async _ => {
            const [listActivitiesPlanned] = await Promise.all([
                ListActivitiesByStatus('planificada'),
            ]);

            const batch = dbFirestore.batch();
            const today = Date.now();

            listActivitiesPlanned.forEach(
                activity => {
                    // comparar endDate con today
                    activity.endDate
                }
            );
             
            /*/listTeachersWithNoLoadPlanning.forEach(teacher => {

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
            /*/
            return await batch.commit();
        });