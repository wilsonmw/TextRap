import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabFormComponent } from './collab-form.component';

describe('CollabFormComponent', () => {
  let component: CollabFormComponent;
  let fixture: ComponentFixture<CollabFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollabFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
