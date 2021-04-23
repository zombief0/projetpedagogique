import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Module} from "../../models/module";
import {Chapitre} from "../../models/chapitre";
import {ModuleService} from "../../services/module/module.service";
import {ChapitreService} from "../../services/chapitre/chapitre.service";
import {ProjetPedagogique} from "../../models/projet-pedagogique";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  @Input() module: Module;
  @Input() selectedProjet:ProjetPedagogique;
  @Output() updatedModule: EventEmitter<Module> = new EventEmitter<Module>();
  @Output() deletedModule: EventEmitter<Module> = new EventEmitter<Module>();
  chapitres:Chapitre[] = [];

  constructor(private moduleService:ModuleService,
              private chapitreService: ChapitreService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.getAllChapitresByModule();
  }

  getAllChapitresByModule(){
    this.chapitreService.getAllChapitreByModule(this.module.scxIdModule).subscribe(
      res =>{
        this.chapitres = res;
      },
      error => {
        alert("Impossible de récupérer les chapitres");
      }
    )
  }

  calculProgression(chapitre:Chapitre){
    let indexOfChapitre = this.chapitres.findIndex(x => x.scxIdChapitre == chapitre.scxIdChapitre);
    this.chapitres[indexOfChapitre].scxProgression = chapitre.scxProgression;

    let progression:number = 0;
    for (let chap of this.chapitres){
      progression = progression + chap.scxProgression;
    }

    this.module.scxProgression = progression/this.chapitres.length;

    this.moduleService.updateModule(this.module).subscribe(
      res=>{
        this.updatedModule.emit(this.module);
      },
      error => {
        alert("Impossible de mettre à jour la progression du module");
      }
    )
  }

  refreshModuleAfterUpdate(module:Module){
    this.module.scxLibelle = module.scxLibelle;
    this.module.scxNumero = module.scxNumero;
    this.module.scxDescription = module.scxDescription;
  }

  addChapitreAfterCreate(chapitre:Chapitre){
    this.chapitres.push(chapitre);
  }

  removeChapitreAfterDelete(chapitre:Chapitre){
    let indexOfChapitre = this.chapitres.indexOf(chapitre);
    this.chapitres.splice(indexOfChapitre,1);
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: 'la suppression effacera tous les chapitres du module',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.moduleService.deleteModule(this.module.scxIdModule).subscribe(
        res =>{
          this.deletedModule.emit(this.module);
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }
}
