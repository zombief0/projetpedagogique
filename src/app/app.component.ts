import { Component } from '@angular/core';
import {Cycle} from "./models/cycle";
import {CycleService} from "./services/cycle/cycle.service";
import {ClasseService} from "./services/classe/classe.service";
import {Classe} from "./models/classe";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;

  constructor() { }



}
