import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivityService } from '../../../core/services/activity.service';
import { Activity } from '../../../models/activity';
import { Subscription} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DeliverableService } from '../../../core/services/deliverable.service';
import { Deliverable } from '../../../models/deliverable';


@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit, OnDestroy {

  public activity!: Activity;
  public deliverables: Deliverable[] = [];
  public teacherUsername!: string;
  public activityId!: string;
  public activityNumber!: string;

  private activitySubscription: Subscription | null = null;
  private deliverablesSubscription: Subscription | null = null;
  private savingSubscription: Subscription | null = null;

  evidenceForm: FormGroup;

  files: File[] = [];
  isValidated!: boolean;
  isValid!: boolean;
  isSaving = false;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private deliverableService: DeliverableService,
  ) {
    this.evidenceForm = this.fb.group({
      file: ['', Validators.required],
      fileSource: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.isValid = false;
    this.isValidated = false;

    this.route.params.subscribe(async (params: Params) => {
      // Get params
      this.teacherUsername = params.teacherId;
      this.activityId = params.activityId;
      this.activityNumber = params.activityNumber;

      // Get activity
      this.activitySubscription = this.activityService.activityById(this.activityId)
        .subscribe(activity => this.activity = activity );

      // Get deliverables
      this.deliverablesSubscription = this.deliverableService.getDeliverablesOfActivity(this.activityId)
        .subscribe(deliverables => this.deliverables = deliverables );
    });
  }

  ngOnDestroy(): void {
    this.deliverablesSubscription?.unsubscribe();
    this.activitySubscription?.unsubscribe();
  }

  addEvidence(): void {
    this.isValidated = true;
    this.isSaving = true;
    if (!!this.savingSubscription) {
      this.isSaving = false;
      return;
    }

    if (!this.isValid) {
      Swal.fire(
        'No se puede realizar esta acción',
        'Por favor, asegúrese de seleccionar un archivo.',
        'info');
      this.isSaving = false;
      return;
    }

    const deliverable: Deliverable = {
      owner: this.teacherUsername,
      activityId: this.activity.id
    };

    const formData = new FormData();
    formData.append('file', this.evidenceForm.get('fileSource')?.value);

    this.deliverableService.saveDeliverable(formData, deliverable).then(
      async createdDeliverable => {
        if (createdDeliverable) {
          await Swal.fire({title: 'Todos los cambios están guardados', icon: 'success'});
          this.evidenceForm.reset();
          await this.updateState().then();
        } else {
          await Swal.fire({title: 'Ocurrió un error al guardar la información', icon: 'error'});
        }
        this.isSaving = false;
        this.isValidated = false;
      }
    );
  }

  deleteDeliverable(deliverable: Deliverable): void {
    this.deliverableService.deleteDeliverable(deliverable).then(
      async success => {
        await this.updateState().then();
        await Swal.fire({title: 'Archivo eliminado correctamente', icon: 'success'});
      },
      error => {
        Swal.fire({title: 'Ocurrió un error al eliminar el archivo', icon: 'error'});
      }
    );
  }

  detectFiles(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.evidenceForm.patchValue({
        fileSource: file
      });
    }
  }

  get formIsValid(): boolean {
    this.isValid = this.evidenceForm.valid;
    return this.isValid;
  }

  async updateState(): Promise<void> {
    const updatedStatus: string = await this.getUpdatedState().then();
    if (this.activity.status !== updatedStatus) {
      await this.activityService.updateActivityStatus(this.activityId, updatedStatus).then(
        success => {
          this.activity.status = updatedStatus;
        }
      );
    }
  }

  getUpdatedState(): Promise<string> {
    let status = 'planificada';
    if (this.deliverables.length !== 0) {
      status = 'realizada';
    } else {
      if (new Date(this.activity.endDate) < new Date()) {
        status = 'no realizada';
      }
    }
    return new Promise<string>(resolve => resolve(status));
}

}
