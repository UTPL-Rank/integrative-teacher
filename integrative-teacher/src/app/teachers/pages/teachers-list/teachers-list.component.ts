import { Component, OnInit } from '@angular/core';
import { Faculty } from '../../../models/faculty';
import { FacultiesService } from '../../../core/services/faculties.service';
import {IntegrativeTeacher, IntegrativeTeacherV2} from '../../../models/integrative-teacher';
import { AcademicPeriod } from '../../../models/academic-period';
import { AcademicPeriodsService } from '../../../core/services/academic-period.service';
import { IntegrativeTeacherWithPlanning } from '../../../models/integrative-teacher-with-planning';
import { IntegrativeTeacherV2Service } from '../../../core/services/integrative-teacher-v2.service';
import { PlanningService } from '../../../core/services/planning.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {

  faculties!: Array<Faculty>;
  // filteredTeachers!: Array<IntegrativeTeacher>;
  // allTeachers!: Array<IntegrativeTeacher>;

  teachers!: Array<IntegrativeTeacherV2>;
  teachersWithPlanning: IntegrativeTeacherWithPlanning[] = [];
  teachersWithPlanningFiltered: IntegrativeTeacherWithPlanning[] = [];
  academicPeriod!: AcademicPeriod;

  constructor(
    private facultiesService: FacultiesService,
    private integrativeTeacherService: IntegrativeTeacherV2Service,
    private academicPeriodsService: AcademicPeriodsService,
    private planningService: PlanningService
  ) { }

  ngOnInit(): void {

    this.academicPeriodsService.current().subscribe(
      currents => {
        this.academicPeriod = currents[0];

        this.teachersWithPlanning = [];
        this.teachersWithPlanningFiltered = [];

        this.integrativeTeacherService.getIntegrativeTeachersOfPeriod(this.academicPeriod.id).subscribe(
          teachers => {
            this.teachers = teachers;
            this.teachers.map(
              teacher => {
                if (teacher.id){
                  this.planningService.getPlanningsOfTeacher(teacher.id).subscribe(
                    plannings => {
                      plannings.map(
                        planning => {
                          if (planning.id && teacher.id ) {
                            const teacherWithPlanning: IntegrativeTeacherWithPlanning = {
                              planningId: planning.id,
                              integrativeTeacherId: teacher.id,
                              email: teacher.email,
                              displayName: teacher.displayName,
                              degree: planning.degree,
                              faculty: planning.faculty,
                              cycle: planning.cycle,
                              planningStatus: planning.planningStatus,
                              period: teacher.period,
                              modality: planning.modality
                            };
                            this.teachersWithPlanning.push(teacherWithPlanning);
                            this.teachersWithPlanningFiltered.push(teacherWithPlanning);
                          }
                        }
                      );
                    }
                  );
                }
              }
            );
          }
        );

        // this.integrativeTeacherService.getIntegrativeTeachersOfPeriod(this.academicPeriod.id).subscribe(
        //   teachers => {
        //     this.filteredTeachers = teachers;
        //     this.allTeachers = teachers;
        //   }
        // );
      }
    );


    this.facultiesService.faculties().subscribe(
      faculties => this.faculties = faculties
    );
  }

  changeFilter(e: any): void {
    if (e.target.value !== 'all') {
      this.teachersWithPlanningFiltered = this.teachersWithPlanning.filter(teacher => teacher.faculty.reference.id === e.target.value);
    } else {
      this.teachersWithPlanningFiltered = this.teachersWithPlanning;
    }
  }

}
