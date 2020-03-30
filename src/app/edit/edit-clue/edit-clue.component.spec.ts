import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClueComponent } from './edit-clue.component';

describe('EditClueComponent', () => {
  let component: EditClueComponent;
  let fixture: ComponentFixture<EditClueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
