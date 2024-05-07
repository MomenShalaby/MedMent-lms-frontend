import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseVideoComponent } from './course-video.component';

describe('CourseVideoComponent', () => {
  let component: CourseVideoComponent;
  let fixture: ComponentFixture<CourseVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
