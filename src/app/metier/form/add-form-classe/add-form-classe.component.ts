import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cycle} from "../../../models/cycle";
import {CycleService} from "../../../services/cycle/cycle.service";
import {Classe} from "../../../models/classe";
import {ClasseService} from "../../../services/classe/classe.service";

@Component({
  selector: 'app-add-form-classe',
  templateUrl: './add-form-classe.component.html',
  styleUrls: ['./add-form-classe.component.css']
})
export class AddFormClasseComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  @Input() selectedCycle: Cycle;
  classe:Classe = {
    scxLibelle:'',
    scxIdCycle:null,
    scxIdClasse:null,
  };

  @Output() newClasse:EventEmitter<Classe> = new EventEmitter<Classe>();

  constructor(private fb: FormBuilder, private classeService:ClasseService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'libelle': ['', [Validators.required]],
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

    this.classe.scxLibelle = this.validateForm.value["libelle"];
    this.classe.scxIdCycle = this.selectedCycle.scxIdCycle;
    this.classeService.saveClasse(this.classe).subscribe(
      res =>{
        this.classe.scxIdClasse = res.scxIdClasse;
        this.newClasse.emit(this.classe);
        this.classe = {
          scxLibelle:'',
          scxIdCycle:null,
          scxIdClasse:null,
        };
      },
      error1 => {
        alert("Impossible d'ajouter une classe au cycle sélectionné");
        this.classe = {
          scxLibelle:'',
          scxIdCycle:null,
          scxIdClasse:null,
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
