import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollabComponent } from './create-collab.component';

describe('CreateCollabComponent', () => {
  let component: CreateCollabComponent;
  let fixture: ComponentFixture<CreateCollabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCollabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
