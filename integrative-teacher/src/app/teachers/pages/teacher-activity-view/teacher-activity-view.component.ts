import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ActivityService } from '../../../core/services/activity.service';
import { Activity } from '../../../models/activity';
import { Deliverable } from '../../../models/deliverable';
import { DeliverableService } from '../../../core/services/deliverable.service';

@Component({
  selector: 'app-teacher-activity-view',
  templateUrl: './teacher-activity-view.component.html',
  styleUrls: ['./teacher-activity-view.component.scss']
})
export class TeacherActivityViewComponent implements OnInit {

  public integrativeTeacherId!: string;
  public planningId!: string;
  public activity!: Activity;
  public activityId!: string;
  public activityNumber!: string;
  public deliverables: Deliverable[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private deliverableService: DeliverableService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (params: Params) => {

      // Get params
      this.integrativeTeacherId = params.integrativeTeacherId;
      this.planningId = params.planningId;
      this.activityId = params.activityId;
      this.activityNumber = params.activityNumber;

      // Get activity
      this.activityService.activityById(this.activityId)
        .subscribe(activity => this.activity = activity );

      // Get deliverables
      this.deliverableService.getDeliverablesOfActivity(this.activityId)
        .subscribe(deliverables => this.deliverables = deliverables );
    });
  }

}
