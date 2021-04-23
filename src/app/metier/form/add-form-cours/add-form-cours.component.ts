import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Matiere} from "../../../models/matiere";
import {CoursService} from "../../../services/cours/cours.service";
import {Cours} from "../../../models/cours";
import {Cycle} from "../../../models/cycle";
import {Classe} from "../../../models/classe";
import {ClasseService} from "../../../services/classe/classe.service";
import {CycleService} from "../../../services/cycle/cycle.service";

@Component({
  selector: 'app-add-form-cours',
  templateUrl: './add-form-cours.component.html',
  styleUrls: ['./add-form-cours.component.css']
})
export class AddFormCoursComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  selectedCycle:Cycle;
  classes:Classe[] = [];
  cycles:Cycle[] = [];
  @Input() selectedMatiere: Matiere;
  cours:Cours={
    scxLibelle:'',
    scxIdMatiere:null,
    scxIdCours:null,
    scxIdClasse:null,
    scxNature: '',
    scxDescription: '',
    scxCoefficient: null
  };


  @Output() newCours:EventEmitter<Cours> = new EventEmitter<Cours>();

  constructor(private fb: FormBuilder,
              private coursService:CoursService,
              private classeService:ClasseService,private cycleService:CycleService) {

  }

  ngOnInit() {
    this.getAllCycles();
    this.validateForm = this.fb.group({
      'libelle': [null, [Validators.required]],
      'description': [null],
      'nature': [null, [Validators.required]],
      'coefficient': [null, [Validators.required]],
      'classe':[null,[Validators.required]]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  getAllCycles(){
    this.cycleService.getAllCycle().subscribe(
      res =>{
        this.cycles = res;
      },
      error => {
        alert("Impossible de récupérer les cycles")
      }
    )
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
    this.cours.scxIdClasse = this.validateForm.value["classe"].scxIdClasse;
    this.cours.scxIdMatiere = this.selectedMatiere.scxIdMatiere;


    this.coursService.saveCours(this.cours).subscribe(
      res =>{
        this.cours.scxIdCours = res.scxIdCours;
        this.newCours.emit(this.cours);
        this.cours={
          scxLibelle:'',
          scxIdMatiere:null,
          scxIdCours:null,
          scxNature: '',
          scxIdClasse:null,
          scxDescription: '',
          scxCoefficient: null
        };
      },
      error1 => {
        alert("Impossible d'ajouter un cours à la matière sélectionnée");
        this.cours={
          scxLibelle:'',
          scxIdMatiere:null,
          scxIdCours:null,
          scxIdClasse:null,
          scxNature: '',
          scxDescription: '',
          scxCoefficient: null
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
