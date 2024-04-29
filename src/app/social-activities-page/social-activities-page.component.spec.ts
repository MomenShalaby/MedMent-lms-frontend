import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialActivitiesPageComponent } from './social-activities-page.component';

describe('SocialActivitiesPageComponent', () => {
  let component: SocialActivitiesPageComponent;
  let fixture: ComponentFixture<SocialActivitiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialActivitiesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocialActivitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
