import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherActivityViewComponent } from './teacher-activity-view.component';

describe('TeacherActivityViewComponent', () => {
  let component: TeacherActivityViewComponent;
  let fixture: ComponentFixture<TeacherActivityViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherActivityViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherActivityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
