import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFacultiesComponent } from './upload-faculties.component';

describe('UploadFacultiesComponent', () => {
  let component: UploadFacultiesComponent;
  let fixture: ComponentFixture<UploadFacultiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFacultiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFacultiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
