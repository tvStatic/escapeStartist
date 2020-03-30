import { Component, OnInit, Input } from '@angular/core';
import { Clue } from '../game';

@Component({
  selector: 'app-clue',
  templateUrl: './clue.component.html',
  styleUrls: ['./clue.component.scss']
})
export class ClueComponent implements OnInit {
  @Input() clue : Clue;

  constructor() { }

  ngOnInit(): void {
  }
}
