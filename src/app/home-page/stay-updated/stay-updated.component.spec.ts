import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayUpdatedComponent } from './stay-updated.component';

describe('StayUpdatedComponent', () => {
  let component: StayUpdatedComponent;
  let fixture: ComponentFixture<StayUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StayUpdatedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StayUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
