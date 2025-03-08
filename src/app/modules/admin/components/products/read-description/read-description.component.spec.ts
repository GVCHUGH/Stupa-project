import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDescriptionComponent } from './read-description.component';

describe('ReadDescriptionComponent', () => {
  let component: ReadDescriptionComponent;
  let fixture: ComponentFixture<ReadDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
