import {Component, Input, OnInit} from '@angular/core';
import {Activite} from "../../models/activite";

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit {
  @Input() activite:Activite;
  radioValue:string ;

  constructor() { }

  ngOnInit() {
    this.radioValue = this.activite.scxStatut;
    console.log(this.activite);
  }


}
