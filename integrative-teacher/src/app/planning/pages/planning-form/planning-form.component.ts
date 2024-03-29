import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ATeacher } from '../../../models/a-teacher';
import { Activity } from '../../../models/activity';
import { TeacherService } from '../../../core/services/teacher.service';
import { ActivityService } from '../../../core/services/activity.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SigCanvasComponent } from '../../../shared/components/sig-canvas/sig-canvas.component';
import Swal from 'sweetalert2';
import { IntegrativeTeacherService } from '../../../core/services/integrative-teacher.service';
import { IntegrativeTeacherV2 } from '../../../models/integrative-teacher';
import { UserService } from '../../../core/services/user.service';
import { IntegrativeUser } from '../../../models/integrative-user';
import { ActivatedRoute, Params } from '@angular/router';
import { PlanningService } from '../../../core/services/planning.service';
import { IntegrativeTeacherV2Service } from '../../../core/services/integrative-teacher-v2.service';
import { Planning } from '../../../models/planning';

// @ts-ignore
import Html2Pdf from 'js-html2pdf';

@Component({
  selector: 'app-planning-form',
  templateUrl: './planning-form.component.html',
  styleUrls: ['./planning-form.component.scss']
})
export class PlanningFormComponent implements OnInit {

  public editPlanning!: boolean;
  public editATeacher!: boolean;
  public editAnActivity!: boolean;
  public teacherIsValid!: boolean;
  public activityIsValid!: boolean;

  public integrativeTeacher!: IntegrativeTeacherV2;
  public planning!: Planning;
  public teachers: Array<ATeacher> = [];
  public activities: Array<Activity> = [];

  private editTeacherId!: string | undefined;
  private editActivityId!: string | undefined;
  private integrativeTeacherId!: string;
  private planningId!: string;

  teacherForm: FormGroup;
  activityForm: FormGroup;

  constructor(
    private integrativeTeacherService: IntegrativeTeacherService,
    private teacherService: TeacherService,
    private activityService: ActivityService,
    private planningService: PlanningService,
    private integrativeTeacherV2Service: IntegrativeTeacherV2Service,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
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
      indicator: [''],
    });
  }

  @ViewChild(SigCanvasComponent)
  public sigCanvas!: SigCanvasComponent;

  @ViewChild('teacherNameAndJob') d1!: ElementRef;

  @ViewChild('cleanSignatureBtn') cleanSignatureBtn!: ElementRef;

  @ViewChild('cleanSignature') cleanSignature!: ElementRef;

  ngOnInit(): void {
    this.editPlanning = false;
    this.editATeacher = false;
    this.editAnActivity = false;
    this.teacherIsValid = false;
    this.activityIsValid = false;

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

  changeEditPlanning(e: any): void {
    if (e.target.checked) {
      this.editPlanning = true;
    } else {
      this.editPlanning = false;
    }
  }

  changeCompletedPlanning(e: any): void {
    if (e.target.checked) {
      this.planning.planningStatus = 'completa';
      this.planningService.updatePlanningStatus(this.integrativeTeacherId, this.planning.planningStatus)
        .then(
          success => {
            Swal.fire({title: 'Planificación marcada como completada', icon: 'success'}).then();
          },
          error => {
            Swal.fire({title: 'Ocurrió un error. Intenta nuevamente.', icon: 'error'}).then();
          }
      );
    } else {
      this.planning.planningStatus = 'incompleta';
      this.planningService.updatePlanningStatus(this.integrativeTeacherId, this.planning.planningStatus)
        .then(
          success => {
            Swal.fire({title: 'Planificación marcada como NO completada', icon: 'info'}).then();
          },
          error => {
            Swal.fire({title: 'Ocurrió un error. Intenta nuevamente.', icon: 'error'}).then();
          }
        );
    }
  }

  saveTeacher(): void {

    const newTeacher: ATeacher = {
      displayName: this.teacherForm.value.name,
      subject: this.teacherForm.value.subject,
      integrativeTeacher: this.integrativeTeacherId,
      planningId: this.planningId
    };

    if (!this.editATeacher) {
      this.teacherService.saveTeacher(newTeacher).subscribe(
        async createdActivity => {
          if (createdActivity) {
            await Swal.fire({title: 'Docente agregado correctamente', icon: 'success'});
            this.teacherForm.reset();
          } else {
            await Swal.fire({title: 'Ocurrió un error al guardar la información', icon: 'error'});
          }
        }
      );
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

    const newActivity: Activity = {
      description: this.activityForm.value.description,
      goal: this.activityForm.value.goal,
      startDate: this.activityForm.value.startDate,
      endDate: this.activityForm.value.endDate,
      evidence: this.activityForm.value.evidence,
      indicator: this.activityForm.value.indicator,
      integrativeTeacher: this.integrativeTeacherId,
      planningId: this.planningId
    };

    if (!this.editAnActivity) {
      this.activityService.saveActivity(newActivity).subscribe(
        async createdActivity => {
          if (createdActivity) {
            await Swal.fire({title: 'Todos los cambios están guardados', icon: 'success'});
            this.activityForm.reset();
          } else {
            await Swal.fire({title: 'Ocurrió un error al guardar la información', icon: 'error'});
          }
        }
      );
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

  exportToPDF(): void {

    this.cleanSignatureBtn.nativeElement.remove();
    this.d1?.nativeElement.insertAdjacentHTML('beforeend', `<p>${this.integrativeTeacher.displayName.toUpperCase() }<br><b>DOCENTE INTEGRADOR DE ${this.planning.degree!.name.toUpperCase()}</b></p>`);

    // Define optional configuration
    const options = {
      filename: this.integrativeTeacherId,
      jsPDF: {
        orientation: 'p',
        format: 'a4',
        floatPrecision: 'smart'
      }
    };

    // Get the element to print
    const element = document.getElementById('content');

    // Create instance of html2pdf class
    const exporter = new Html2Pdf(element, options);

    // Get the jsPDF object to work with it
    exporter.getPdf(false).then((pdf: { save: () => void; }) => {
      pdf.save();
    });
    this.d1.nativeElement.remove();
    this.cleanSignature?.nativeElement.insertAdjacentHTML('beforeend', '<div id="cleanSignatureBtn" #cleanSignatureBtn><div class="align-content-center">\n' +
      '            <button type="button" class="btn btn-primary btn-sm" (click)="sigCanvas.clearCanvas()">\n' +
      '              Limpiar firma\n' +
      '            </button>\n' +
      '          </div></div>');

  }

}
