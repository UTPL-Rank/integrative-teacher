import { Component, OnInit } from '@angular/core';
import { Faculty } from '../../../models/faculty';
import { FacultiesService } from '../../../core/services/faculties.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {

  faculties!: Array<Faculty>;

  constructor(
    private facultiesService: FacultiesService
  ) { }

  ngOnInit(): void {
    this.facultiesService.faculties().subscribe(
      faculties => this.faculties = faculties
    );
  }

}
