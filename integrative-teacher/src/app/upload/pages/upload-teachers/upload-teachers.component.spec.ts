import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTeachersComponent } from './upload-teachers.component';

describe('UploadTeachersComponent', () => {
  let component: UploadTeachersComponent;
  let fixture: ComponentFixture<UploadTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTeachersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
