import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../../../core/services/planning.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Planning} from '../../../models/planning';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  images: string[] = [
    'assets/images/professor-rafiki.png',
    'assets/images/teacher student-rafiki.png',
    'assets/images/teacher-rafiki.png'
  ];

  private integrativeTeacherId!: string;
  public plannings!: Planning[];

  constructor(
    private planningService: PlanningService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.integrativeTeacherId = params.integrativeTeacherId;
      console.log(this.integrativeTeacherId) ;

      this.planningService.getPlanningsOfTeacher(this.integrativeTeacherId).subscribe(
        plannings => this.plannings = plannings
      );
    });
  }

}
