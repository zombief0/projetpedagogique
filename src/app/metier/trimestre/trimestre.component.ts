import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Trimestre} from "../../models/trimestre";
import {TrimestreService} from "../../services/trimestre/trimestre.service";
import {ProjetPedagogique} from "../../models/projet-pedagogique";
import {Module} from "../../models/module";
import {ModuleService} from "../../services/module/module.service";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-trimestre',
  templateUrl: './trimestre.component.html',
  styleUrls: ['./trimestre.component.css']
})
export class TrimestreComponent implements OnInit {

  @Input() trimestre:Trimestre;
  @Input() selectedProjet:ProjetPedagogique;
  @Output() updatedTrimestre: EventEmitter<Trimestre> = new EventEmitter<Trimestre>();
  @Output() deletedTrimestre: EventEmitter<Trimestre> = new EventEmitter<Trimestre>();
  modules : Module[] = [];
  isVisible = false;
  isConfirmLoading = false;
  constructor(private trimestreService:TrimestreService,
              private moduleService:ModuleService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.getAllSequencesByTrimestre();
  }

  getAllSequencesByTrimestre(){
    this.moduleService.getAllModuleByTrimestre(this.trimestre.scxIdTrimestre).subscribe(
      res =>{
        this.modules = res;
      },
      error => {
        alert("Impossible de récupérer les modules");
      }
    )
  }

  calculerProgression(module:Module){
    let indexOfModule = this.modules.findIndex(x => x.scxIdModule == module.scxIdModule);
    this.modules[indexOfModule].scxProgression = module.scxProgression;

    let progression:number = 0;
    for(let mod of this.modules){
      progression = progression + mod.scxProgression;
    }

    this.trimestre.scxProgression = progression/this.modules.length;
    this.trimestreService.updateTrimestre(this.trimestre).subscribe(
      res =>{
        this.updatedTrimestre.emit(this.trimestre);
      },
      error => {
        alert("Impossible de mettre à jour la progression du trimestre");
      }
    );
  }

  showModalChangerStatut(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  changerStatut() {
    this.trimestreService.updateTrimestre(this.trimestre).subscribe(
      res =>{

      },
      error => {
        alert("Impossible de changer le statut")
      }
    );

    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1500);
  }

  refreshTrimestreAfterUpdate(updatedTrimestre:Trimestre){
    this.trimestre.scxNumero = updatedTrimestre.scxNumero;
    this.trimestre.scxDateFin = updatedTrimestre.scxDateFin;
    this.trimestre.scxDateDebut = updatedTrimestre.scxDateDebut;
  }

  addModuleAfterCreate(module:Module){
    this.modules.push(module);
  }

  removeModuleAfterDelete(module:Module){
    let indexOfModule = this.modules.indexOf(module);
    this.modules.splice(indexOfModule,1);
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: 'la suppression effacera tous les modules du trimestre',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.trimestreService.deleteTrimestre(this.trimestre.scxIdTrimestre).subscribe(
        res =>{
          this.deletedTrimestre.emit(this.trimestre);
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }
}
