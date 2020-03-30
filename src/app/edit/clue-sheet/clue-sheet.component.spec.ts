import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClueSheetComponent } from './clue-sheet.component';

describe('ClueSheetComponent', () => {
  let component: ClueSheetComponent;
  let fixture: ComponentFixture<ClueSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClueSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClueSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
