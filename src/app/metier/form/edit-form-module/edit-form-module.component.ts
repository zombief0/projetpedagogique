import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Module} from "../../../models/module";
import {Trimestre} from "../../../models/trimestre";
import {ModuleService} from "../../../services/module/module.service";

@Component({
  selector: 'app-edit-form-module',
  templateUrl: './edit-form-module.component.html',
  styleUrls: ['./edit-form-module.component.css']
})
export class EditFormModuleComponent implements OnInit {

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

  @Input() selectedModule:Module;
  @Output() updatedModule:EventEmitter<Module> = new EventEmitter<Module>();

  constructor(private fb: FormBuilder, private moduleService:ModuleService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'libelle': [this.selectedModule.scxLibelle, [Validators.required]],
      'description':[this.selectedModule.scxDescription],
      'numero':[this.selectedModule.scxNumero,Validators.required]
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
    this.module.scxProgression = this.selectedModule.scxProgression;
    this.module.scxIdTrimestre = this.selectedModule.scxIdTrimestre;
    this.module.scxIdModule = this.selectedModule.scxIdModule;
    this.moduleService.updateModule(this.module).subscribe(
      res =>{
        this.updatedModule.emit(this.module);
      },
      error1 => {
        alert("Impossible d'ajouter un module");
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
