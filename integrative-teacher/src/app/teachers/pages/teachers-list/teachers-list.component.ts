import { Component, OnInit } from '@angular/core';
import { Faculty } from '../../../models/faculty';
import { FacultiesService } from '../../../core/services/faculties.service';
import { IntegrativeTeacherService } from '../../../core/services/integrative-teacher.service';
import { IntegrativeTeacher } from '../../../models/integrative-teacher';
import { AcademicPeriod } from '../../../models/academic-period';
import { AcademicPeriodsService } from '../../../core/services/academic-period.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {

  faculties!: Array<Faculty>;
  filteredTeachers!: Array<IntegrativeTeacher>;
  allTeachers!: Array<IntegrativeTeacher>;
  academicPeriod!: AcademicPeriod;

  constructor(
    private facultiesService: FacultiesService,
    private integrativeTeacherService: IntegrativeTeacherService,
    private academicPeriodsService: AcademicPeriodsService
  ) { }

  ngOnInit(): void {

    this.academicPeriodsService.current().subscribe(
      currents => {
        this.academicPeriod = currents[0];
        this.integrativeTeacherService.getIntegrativeTeachersOfPeriod(this.academicPeriod.id).subscribe(
          teachers => {
            this.filteredTeachers = teachers;
            this.allTeachers = teachers;
          }
        );
      }
    );


    this.facultiesService.faculties().subscribe(
      faculties => this.faculties = faculties
    );
  }

  changeFilter(e: any): void {
    if (e.target.value !== 'all') {
      this.filteredTeachers = this.allTeachers.filter(teacher => teacher.faculty.reference.id === e.target.value);
    } else {
      this.filteredTeachers = this.allTeachers;
    }
  }

}
