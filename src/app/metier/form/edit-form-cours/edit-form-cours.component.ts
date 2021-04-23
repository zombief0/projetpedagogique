import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Matiere} from "../../../models/matiere";
import {Cours} from "../../../models/cours";
import {CoursService} from "../../../services/cours/cours.service";
import {Classe} from "../../../models/classe";
import {Cycle} from "../../../models/cycle";
import {ClasseService} from "../../../services/classe/classe.service";
import {CycleService} from "../../../services/cycle/cycle.service";

@Component({
  selector: 'app-edit-form-cours',
  templateUrl: './edit-form-cours.component.html',
  styleUrls: ['./edit-form-cours.component.css']
})
export class EditFormCoursComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  @Input() selectedCours: Cours;
  @Input() classe:Classe;
  cours:Cours={
    scxLibelle:'',
    scxIdMatiere:null,
    scxIdCours:null,
    scxNature: '',
    scxIdClasse:null,
    scxDescription: '',
    scxCoefficient: null
  };

  selectedCycle:Cycle;
  classes:Classe[] = [];
  cycles:Cycle[] = [];

  @Output() updateCours:EventEmitter<Cours> = new EventEmitter<Cours>();

  constructor(private fb: FormBuilder,
              private coursService:CoursService,
              private classeService:ClasseService,
              private cycleService:CycleService) {

  }

  ngOnInit() {
    this.getAllCycles();
    this.validateForm = this.fb.group({
      'libelle': [this.selectedCours.scxLibelle, [Validators.required]],
      'description': [this.selectedCours.scxDescription],
      'nature': [this.selectedCours.scxNature, [Validators.required]],
      'coefficient': [this.selectedCours.scxCoefficient, [Validators.required]],
      'classe': [this.classe, [Validators.required]]
    });
  }

  getAllCycles(){
    this.cycleService.getAllCycle().subscribe(
      res =>{
        this.cycles = res;
        this.selectedCycle = this.cycles.find(x=> x.scxIdCycle == this.classe.scxIdCycle)
        this.classeService.getAllClassesByCycle(this.selectedCycle.scxIdCycle).subscribe(
          res =>{
            this.classes = res;
          },
          error => {
            alert("Impossible de récupérer les classes du cycle");
          }
        )
      },
      error => {
        alert("Impossible de récupérer les cycles")
      }
    )
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOkAndSubmit(): void {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.cours.scxLibelle = this.validateForm.value["libelle"];
    this.cours.scxDescription = this.validateForm.value["description"];
    this.cours.scxNature = this.validateForm.value["nature"];
    this.cours.scxCoefficient = this.validateForm.value["coefficient"];
    this.cours.scxIdClasse = this.validateForm.value["classe"];
    this.cours.scxIdMatiere = this.selectedCours.scxIdMatiere;
    this.cours.scxIdCours = this.selectedCours.scxIdCours;

    this.coursService.updateCours(this.cours).subscribe(
      res =>{
        this.updateCours.emit(this.cours);
      },
      error1 => {
        alert("Impossible de mettre à jour le cours");
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

  selectCycle(cycle: Cycle) {
    this.selectedCycle = cycle;
    this.classeService.getAllClassesByCycle(cycle.scxIdCycle).subscribe(
      res =>{
        this.classes = res;
      },
      error => {
        alert("Impossible de récupérer les classes du cycle");
      }
    )
  }

  compareClasse = (c1:any,c2:any) => (c1 && c2? c1.scxIdClasse == c2.scxIdClasse:c1 == c2);
}
