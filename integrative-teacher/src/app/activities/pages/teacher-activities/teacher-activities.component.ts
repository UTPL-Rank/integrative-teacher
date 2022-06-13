import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../core/services/activity.service';
import { Activity } from '../../../models/activity';
import { ActivatedRoute, Params } from '@angular/router';
import { PlanningService } from '../../../core/services/planning.service';
import { Planning } from '../../../models/planning';


@Component({
  selector: 'app-teacher-activities',
  templateUrl: './teacher-activities.component.html',
  styleUrls: ['./teacher-activities.component.scss']
})
export class TeacherActivitiesComponent implements OnInit {

  public activities: Activity[][] = [];
  public plannings: Planning[] = [];
  public teacherId!: string;

  constructor(
    private activityService: ActivityService,
    private planningService: PlanningService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.teacherId = params.teacherId;

      this.planningService.getPlanningsOfTeacher(this.teacherId).subscribe(
        plannings => {
          this.plannings = plannings;
          this.plannings.map(
            planning => {
              if (planning.id) {
                this.activityService.getActivitiesOfPlanning(planning.id)
                  .subscribe(activities => {
                    this.activities.push(activities);
                  });
              }
            }
          );
        }
      );
    });
  }

}
