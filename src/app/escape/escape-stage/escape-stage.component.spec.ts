import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscapeStageComponent } from './escape-stage.component';

describe('EscapeStageComponent', () => {
  let component: EscapeStageComponent;
  let fixture: ComponentFixture<EscapeStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscapeStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscapeStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
