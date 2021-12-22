import { Component, OnInit } from '@angular/core';
import { ATeacher } from '../../../models/a-teacher';
import { Activity } from '../../../models/activity';
import { Subscription } from 'rxjs';
import {TeacherService } from '../../../core/services/teacher.service';
import { ActivityService } from '../../../core/services/activity.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

const USERNAME_TEST = 'odmendoza';

@Component({
  selector: 'app-plannig-form',
  templateUrl: './planning-form.component.html',
  styleUrls: ['./planning-form.component.scss']
})
export class PlanningFormComponent implements OnInit {

  public editPlanning!: boolean;
  public editATeacher!: boolean;
  public editAnActivity!: boolean;
  public teacherIsValid!: boolean;
  public activityIsValid!: boolean;
  public teachers!: Array<ATeacher>;
  public activities!: Array<Activity>;
  private editTeacherId!: string | undefined;
  private editActivityId!: string | undefined;

  private teacherSubscription: Subscription | null = null;
  private activitySubscription: Subscription | null = null;
  private savingTeacherSubscription: Subscription | null = null;
  private savingActivitySubscription: Subscription | null = null;

  teacherForm: FormGroup;
  activityForm: FormGroup;

  constructor(
    private teacherService: TeacherService,
    private activityService: ActivityService,
    private formBuilder: FormBuilder,
  ) {
    this.teacherForm = this.formBuilder.group({
      name: ['', Validators.required],
      subject: ['', Validators.required]
    });
    this.activityForm = this.formBuilder.group({
      description: ['', Validators.required],
      goal: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      evidence: ['', Validators.required],
      indicator: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.editPlanning = false;
    this.editATeacher = false;
    this.editAnActivity = false;
    this.teacherSubscription = this.teacherService.getTeachersOfAIntegrativeTeacher(USERNAME_TEST)
      .subscribe(teachers => {
        this.teachers = teachers;
      });
    this.activitySubscription = this.activityService.getActivitiesOfATeacher(USERNAME_TEST)
      .subscribe(activities => {
        this.activities = activities;
      });
  }

  changeEditPlanning(e: any): void {
    if (e.target.checked) {
      this.editPlanning = true;
    } else {
      this.editPlanning = false;
    }
  }

  saveTeacher(): void {
    if (!!this.savingTeacherSubscription) {
      return;
    }

    const newTeacher: ATeacher = {
      displayName: this.teacherForm.value.name,
      subject: this.teacherForm.value.subject,
      integrativeTeacher: USERNAME_TEST
    };

    if (!this.editATeacher) {
      this.savingTeacherSubscription = this.teacherService.saveTeacher(newTeacher).subscribe(
        async createdActivity => {
          if (createdActivity) {
            await Swal.fire({title: 'Docente agregado correctamente', icon: 'success'});
            this.teacherForm.reset();
          } else {
            await Swal.fire({title: 'Ocurrió un error al guardar la información', icon: 'error'});
          }
          // @ts-ignore
          // this.savingTeacherSubscription.unsubscribe();
        }
      );
      this.savingTeacherSubscription.unsubscribe();
    } else {
      newTeacher.id = this.editTeacherId;
      this.teacherService.updateTeacher(newTeacher).then(
        success => {
          Swal.fire({title: 'Todos los cambios están guardados', icon: 'success'}).then();
          this.teacherForm.reset();
          this.editATeacher = false;
        },
        error => {
          Swal.fire({title: 'Ocurrió un error al guardar la información', icon: 'error'}).then();
        }
      );
    }
  }

  saveActivity(): void {
    if (!!this.savingActivitySubscription) {
      return;
    }

    const newActivity: Activity = {
      description: this.activityForm.value.description,
      goal: this.activityForm.value.goal,
      startDate: this.activityForm.value.startDate,
      endDate: this.activityForm.value.endDate,
      evidence: this.activityForm.value.evidence,
      indicator: this.activityForm.value.indicator,
    };

    if (!this.editAnActivity) {
      this.savingActivitySubscription = this.activityService.saveActivity(newActivity).subscribe(
        async createdActivity => {
          if (createdActivity) {
            await Swal.fire({title: 'Todos los cambios están guardados', icon: 'success'});
            this.activityForm.reset();
          } else {
            await Swal.fire({title: 'Ocurrió un error al guardar la información', icon: 'error'});
          }
        }
      );
      this.savingActivitySubscription.unsubscribe();
    } else {
      newActivity.id = this.editActivityId;
      this.activityService.updateActivity(newActivity).then(
        success => {
          Swal.fire({title: 'Todos los cambios están guardados', icon: 'success'});
          this.activityForm.reset();
          this.editAnActivity = false;
        },
        error => {
          Swal.fire({title: 'Ocurrió un error al guardar la información', icon: 'error'});
        }
      );
    }
  }

  deleteTeacher(id: string | undefined): void {
    this.teacherService.deleteTeacher(id).then();
  }

  deleteActivity(id: string | undefined): void {
    this.activityService.deleteActivity(id).then();
  }

  editTeacher(teacher: ATeacher): void {
    this.editTeacherId = teacher.id;
    this.teacherForm.setValue({
      name: teacher.displayName,
      subject: teacher.subject
    });
    this.editATeacher = true;
  }

  editActivity(activity: Activity): void {
    this.editActivityId = activity.id;
    this.activityForm.setValue({
      description: activity.description,
      goal: activity.goal,
      startDate: activity.startDate,
      endDate: activity.endDate,
      evidence: activity.evidence,
      indicator: activity.indicator
    });
    this.editAnActivity = true;
  }

  get teacherFormIsValid(): boolean {
    this.teacherIsValid = this.teacherForm.valid;
    return this.teacherIsValid;
  }

  get activityFormIsValid(): boolean {
    this.activityIsValid = this.activityForm.valid;
    return this.activityIsValid;
  }

  get dateEndValid(): boolean {
    const valid = this.activityForm.value.endDate >= this.activityForm.value.startDate;
    if (valid) {
      return true;
    } else {
      this.activityIsValid = false;
      return false;
    }
  }
}
