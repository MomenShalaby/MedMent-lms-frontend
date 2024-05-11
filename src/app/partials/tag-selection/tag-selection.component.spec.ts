import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSelectionComponent } from './tag-selection.component';

describe('TagSelectionComponent', () => {
  let component: TagSelectionComponent;
  let fixture: ComponentFixture<TagSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
