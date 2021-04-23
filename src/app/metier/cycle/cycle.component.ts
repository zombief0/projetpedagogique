import { Component, OnInit } from '@angular/core';
import {CycleService} from "../../services/cycle/cycle.service";
import {Cycle} from "../../models/cycle";
import {Classe} from "../../models/classe";
import {ClasseService} from "../../services/classe/classe.service";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {
  cycles:Cycle[] = [];
  selectedCycle:Cycle;
  classes:Classe[] = [];

  constructor(private cycleService:CycleService,
              private classeService:ClasseService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.getAllCycle();
  }

  public getAllCycle():Cycle[]{
    this.cycleService.getAllCycle().subscribe(
      res =>{
        this.cycles = res;
      },
      error1 => {
        alert("Une erreur est survenue");
      }
    );

    return this.cycles;
  }

  public addCycleAfterCreate(cycle:Cycle){
    this.cycles.push(cycle);
  }

  public addCycleAfterUpdate(cycle:Cycle){
    this.cycles.find(x => x.scxIdCycle == cycle.scxIdCycle).scxLibelle = cycle.scxLibelle;
  }

  public addClasseAfterCreate(classe:Classe){
    this.classes.push(classe);
  }

  public removeClasseAfterDelete(classe:Classe){
    let indexOfClasse = this.classes.indexOf(classe);
    this.classes.splice(indexOfClasse,1);
  }

  public selectCycle(cycle:Cycle) {
    this.selectedCycle = cycle;
    this.classeService.getAllClassesByCycle(this.selectedCycle.scxIdCycle).subscribe(
      res => {
        this.classes = res;
      },
      error => {
        alert("Une erreur est survenue");
      }
    )
  }


  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: 'la suppression effacera toutes les classes du cycle sélectionné',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.cycleService.deleteCycle(this.selectedCycle.scxIdCycle).subscribe(
        res =>{
          let indexOfSelectedCycle = this.cycles.indexOf(this.selectedCycle);
          this.cycles.splice(indexOfSelectedCycle,1);
          this.selectedCycle = null;
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }
}
