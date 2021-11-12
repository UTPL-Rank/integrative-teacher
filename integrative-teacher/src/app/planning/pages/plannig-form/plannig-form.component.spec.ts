import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannigFormComponent } from './plannig-form.component';

describe('PlannigFormComponent', () => {
  let component: PlannigFormComponent;
  let fixture: ComponentFixture<PlannigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
