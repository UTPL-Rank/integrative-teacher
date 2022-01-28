import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDegreesComponent } from './upload-degrees.component';

describe('UploadDegreesComponent', () => {
  let component: UploadDegreesComponent;
  let fixture: ComponentFixture<UploadDegreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDegreesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDegreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
