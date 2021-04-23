import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cycle} from "../../../models/cycle";
import {CycleService} from "../../../services/cycle/cycle.service";
import {Classe} from "../../../models/classe";
import {ClasseService} from "../../../services/classe/classe.service";

@Component({
  selector: 'app-edit-form-classe',
  templateUrl: './edit-form-classe.component.html',
  styleUrls: ['./edit-form-classe.component.css']
})
export class EditFormClasseComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  classe:Classe = {
    scxLibelle:'',
    scxIdCycle:null,
    scxIdClasse:null
  };

  @Output() updatedClasse:EventEmitter<Classe> = new EventEmitter<Classe>();
  @Input() selectedClasse: Classe;
  constructor(private fb: FormBuilder, private classeService:ClasseService) {

  }

  ngOnInit() {

    this.validateForm = this.fb.group({
      'libelle': [this.selectedClasse.scxLibelle, [Validators.required]],
    });

  }

  ngOnChanges(){
    this.validateForm = this.fb.group({
      'libelle': [this.selectedClasse.scxLibelle, [Validators.required]],
    });

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOkAndSubmit(): void {

    this.classe.scxLibelle = this.validateForm.value["libelle"];
    this.classe.scxIdCycle = this.selectedClasse.scxIdCycle;
    this.classe.scxIdClasse = this.selectedClasse.scxIdClasse;
    this.classeService.updateClasse(this.classe).subscribe(
      res =>{
        this.updatedClasse.emit(this.classe);
      },
      error1 => {
        alert("Impossible de mettre à jour la classe");
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
