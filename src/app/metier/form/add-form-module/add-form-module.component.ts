import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Specialite} from "../../../models/specialite";
import {SpecialiteService} from "../../../services/specialite/specialite.service";
import {Module} from "../../../models/module";
import {ModuleService} from "../../../services/module/module.service";
import {Trimestre} from "../../../models/trimestre";

@Component({
  selector: 'app-add-form-module',
  templateUrl: './add-form-module.component.html',
  styleUrls: ['./add-form-module.component.css']
})
export class AddFormModuleComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  module:Module = {
    scxLibelle:'',
    scxDescription:'',
    scxIdModule:null,
    scxProgression:0,
    scxIdTrimestre:null,
    scxNumero:null,
    scxStatut:'NON_TERMINE'
  };

  @Input() selectedTrimestre:Trimestre;
  @Output() newModule:EventEmitter<Module> = new EventEmitter<Module>();

  constructor(private fb: FormBuilder, private moduleService:ModuleService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'libelle': ['', [Validators.required]],
      'description':[''],
      'numero':[null,Validators.required]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOkAndSubmit(): void {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.module.scxLibelle = this.validateForm.value["libelle"];
    this.module.scxDescription = this.validateForm.value["description"];
    this.module.scxNumero = this.validateForm.value["numero"];
    this.module.scxIdTrimestre = this.selectedTrimestre.scxIdTrimestre;
    this.moduleService.saveModule(this.module).subscribe(
      res =>{
        this.module.scxIdModule = res.scxIdModule;
        this.newModule.emit(this.module);
        this.module ={
          scxLibelle:'',
          scxDescription:'',
          scxIdModule:null,
          scxProgression:0,
          scxIdTrimestre:null,
          scxNumero:null,
          scxStatut:'NON_TERMINE'
        };
      },
      error1 => {
        alert("Impossible d'ajouter un module");
        this.module ={
          scxLibelle:'',
          scxDescription:'',
          scxIdModule:null,
          scxProgression:0,
          scxIdTrimestre:null,
          scxNumero:null,
          scxStatut:'NON_TERMINE'
        };
      }
    );



    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1500);
    this.validateForm.reset();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
