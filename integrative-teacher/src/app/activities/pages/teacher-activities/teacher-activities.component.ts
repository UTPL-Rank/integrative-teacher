import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../core/services/activity.service';
import { Subscription } from 'rxjs';
import { Activity } from '../../../models/activity';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-teacher-activities',
  templateUrl: './teacher-activities.component.html',
  styleUrls: ['./teacher-activities.component.scss']
})
export class TeacherActivitiesComponent implements OnInit {

  public activities!: Array<Activity>;
  public teacherUsername!: string;

  private activitySubscription: Subscription | null = null;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.teacherUsername = params.teacherId;
      this.activitySubscription = this.activityService.getActivitiesOfATeacher(this.teacherUsername)
        .subscribe(activities => {
          this.activities = activities;
        });
    });
  }

}
