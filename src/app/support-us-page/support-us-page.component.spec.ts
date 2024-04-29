import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportUsPageComponent } from './support-us-page.component';

describe('SupportUsPageComponent', () => {
  let component: SupportUsPageComponent;
  let fixture: ComponentFixture<SupportUsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportUsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportUsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
