import { Component, OnInit } from '@angular/core';
import { IntegrativeTeacherV2} from '../../../models/integrative-teacher';
import {ATeacher} from '../../../models/a-teacher';
import {Activity} from '../../../models/activity';
import {IntegrativeTeacherService} from '../../../core/services/integrative-teacher.service';
import {TeacherService} from '../../../core/services/teacher.service';
import {ActivityService} from '../../../core/services/activity.service';
import {UserService} from '../../../core/services/user.service';
import {ActivatedRoute, Params} from '@angular/router';
import {PlanningService} from '../../../core/services/planning.service';
import {IntegrativeTeacherV2Service} from '../../../core/services/integrative-teacher-v2.service';
import {Planning} from '../../../models/planning';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.scss']
})
export class TeacherViewComponent implements OnInit {

  // public integrativeTeacher!: IntegrativeTeacher;
  public teachers: Array<ATeacher> = [];
  public activities: Array<Activity> = [];
  public integrativeTeacher!: IntegrativeTeacherV2;
  private integrativeTeacherId!: string;
  public planning!: Planning;
  private planningId!: string;

  constructor(
    private integrativeTeacherService: IntegrativeTeacherService,
    private planningService: PlanningService,
    private integrativeTeacherV2Service: IntegrativeTeacherV2Service,
    private teacherService: TeacherService,
    private activityService: ActivityService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.integrativeTeacherId = params.integrativeTeacherId;
      this.planningId = params.planningId;

      this.integrativeTeacherV2Service.integrativeTeacherById(this.integrativeTeacherId).
      subscribe(
        integrativeTeacher => this.integrativeTeacher = integrativeTeacher
      );

      this.planningService.planningById(this.planningId).subscribe(
        planning => this.planning = planning
      );

      this.teacherService.getTeachersOfPlanning(this.planningId)
        .subscribe(teachers => {
          this.teachers = teachers;
        });

      this.activityService.getActivitiesOfPlanning(this.planningId)
        .subscribe(activities => {
          this.activities = activities;
        });
    });
  }

}
