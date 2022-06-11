import { Component, OnInit } from '@angular/core';
import {IntegrativeTeacher} from "../../../models/integrative-teacher";
import {ATeacher} from "../../../models/a-teacher";
import {Activity} from "../../../models/activity";
import {IntegrativeTeacherService} from "../../../core/services/integrative-teacher.service";
import {TeacherService} from "../../../core/services/teacher.service";
import {ActivityService} from "../../../core/services/activity.service";
import {UserService} from "../../../core/services/user.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.scss']
})
export class TeacherViewComponent implements OnInit {

  public integrativeTeacher!: IntegrativeTeacher;
  public teachers: Array<ATeacher> = [];
  public activities: Array<Activity> = [];

  constructor(
    private integrativeTeacherService: IntegrativeTeacherService,
    private teacherService: TeacherService,
    private activityService: ActivityService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const integrativeTeacherId = params.integrativeTeacherId;

      this.integrativeTeacherService.integrativeTeacherById(integrativeTeacherId).
      subscribe(
        integrativeTeacher => this.integrativeTeacher = integrativeTeacher
      );

      // this.teacherService.getTeachersOfAIntegrativeTeacher(integrativeTeacherId)
      //   .subscribe(teachers => {
      //     this.teachers = teachers;
      //   });

      // this.activityService.getActivitiesOfATeacher(integrativeTeacherId)
      //   .subscribe(activities => {
      //     this.activities = activities;
      //   });
    });
  }

}
