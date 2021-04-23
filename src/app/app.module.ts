import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, fr_FR } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DatePipe, registerLocaleData} from '@angular/common';
import fr from '@angular/common/locales/fr';
import { SalleComponent } from './metier/salle/salle.component';
import { CycleComponent } from './metier/cycle/cycle.component';
import { ClasseComponent } from './metier/classe/classe.component';
import { FormCycleComponent } from './metier/form/form-cycle/form-cycle.component';
import { EditformCycleComponent } from './metier/form/editform-cycle/editform-cycle.component';
import { AddFormClasseComponent } from './metier/form/add-form-classe/add-form-classe.component';
import { EditFormClasseComponent } from './metier/form/edit-form-classe/edit-form-classe.component';
import { AddFormSalleComponent } from './metier/form/add-form-salle/add-form-salle.component';
import { EditFormSalleComponent } from './metier/form/edit-form-salle/edit-form-salle.component';
import { SpecialiteComponent } from './metier/specialite/specialite.component';
import { AddSpecialiteFormComponent } from './metier/form/add-specialite-form/add-specialite-form.component';
import { EditFormSpecialiteComponent } from './metier/form/edit-form-specialite/edit-form-specialite.component';
import { SerieComponent } from './metier/serie/serie.component';
import { AddFormSerieComponent } from './metier/form/add-form-serie/add-form-serie.component';
import { EditFormSerieComponent } from './metier/form/edit-form-serie/edit-form-serie.component';
import { MatiereComponent } from './metier/matiere/matiere.component';
import { CoursComponent } from './metier/cours/cours.component';
import { AddFormMatiereComponent } from './metier/form/add-form-matiere/add-form-matiere.component';
import { EditFormMatiereComponent } from './metier/form/edit-form-matiere/edit-form-matiere.component';
import { AddFormCoursComponent } from './metier/form/add-form-cours/add-form-cours.component';
import { EditFormCoursComponent } from './metier/form/edit-form-cours/edit-form-cours.component';
import { AnneeAcademiqueComponent } from './metier/annee-academique/annee-academique.component';
import { ProjetPedagogiqueComponent } from './metier/projet-pedagogique/projet-pedagogique.component';
import { SuiviProjetPedagogiqueComponent } from './metier/suivi-projet-pedagogique/suivi-projet-pedagogique.component';
import { TrimestreComponent } from './metier/trimestre/trimestre.component';
import { ModuleComponent } from './metier/module/module.component';
import { ChapitreComponent } from './metier/chapitre/chapitre.component';
import { CompetenceComponent } from './metier/competence/competence.component';
import { ActiviteComponent } from './metier/activite/activite.component';
import { ObjectifComponent } from './metier/objectif/objectif.component';
import { AddFormProjetComponent } from './metier/form/add-form-projet/add-form-projet.component';
import { EditFormProjetComponent } from './metier/form/edit-form-projet/edit-form-projet.component';
import { AddFormSuiviComponent } from './metier/form/add-form-suivi/add-form-suivi.component';
import { AddFormTrimestreComponent } from './metier/form/add-form-trimestre/add-form-trimestre.component';
import { EditFormTrimestreComponent } from './metier/form/edit-form-trimestre/edit-form-trimestre.component';
import { AddFormModuleComponent } from './metier/form/add-form-module/add-form-module.component';
import { EditFormModuleComponent } from './metier/form/edit-form-module/edit-form-module.component';
import { AddFormChapitreComponent } from './metier/form/add-form-chapitre/add-form-chapitre.component';
import { EditFormChapitreComponent } from './metier/form/edit-form-chapitre/edit-form-chapitre.component';
import { AddFormActiviteComponent } from './metier/form/add-form-activite/add-form-activite.component';
import { EditFormActiviteComponent } from './metier/form/edit-form-activite/edit-form-activite.component';
import { AddFormAnneeComponent } from './metier/form/add-form-annee/add-form-annee.component';
import { EditFormAnneeComponent } from './metier/form/edit-form-annee/edit-form-annee.component';
import { EnseignantComponent } from './metier/enseignant/enseignant.component';
import { AddFormEnseignantComponent } from './metier/form/add-form-enseignant/add-form-enseignant.component';
import { EditFormEnseignantComponent } from './metier/form/edit-form-enseignant/edit-form-enseignant.component';
import { AddFormEnseignerComponent } from './metier/form/add-form-enseigner/add-form-enseigner.component';
import { EnseignerComponent } from './metier/enseigner/enseigner.component';
import { EditFormSuiviComponent } from './metier/form/edit-form-suivi/edit-form-suivi.component';
import { AddFormCompetenceComponent } from './metier/form/add-form-competence/add-form-competence.component';
import { AddFormObjectifComponent } from './metier/form/add-form-objectif/add-form-objectif.component';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    SalleComponent,
    CycleComponent,
    ClasseComponent,
    FormCycleComponent,
    EditformCycleComponent,
    AddFormClasseComponent,
    EditFormClasseComponent,
    AddFormSalleComponent,
    EditFormSalleComponent,
    SpecialiteComponent,
    AddSpecialiteFormComponent,
    EditFormSpecialiteComponent,
    SerieComponent,
    AddFormSerieComponent,
    EditFormSerieComponent,
    MatiereComponent,
    CoursComponent,
    AddFormMatiereComponent,
    EditFormMatiereComponent,
    AddFormCoursComponent,
    EditFormCoursComponent,
    AnneeAcademiqueComponent,
    ProjetPedagogiqueComponent,
    SuiviProjetPedagogiqueComponent,
    TrimestreComponent,
    ModuleComponent,
    ChapitreComponent,
    CompetenceComponent,
    ActiviteComponent,
    ObjectifComponent,
    AddFormProjetComponent,
    EditFormProjetComponent,
    AddFormSuiviComponent,
    AddFormTrimestreComponent,
    EditFormTrimestreComponent,
    AddFormModuleComponent,
    EditFormModuleComponent,
    AddFormChapitreComponent,
    EditFormChapitreComponent,
    AddFormActiviteComponent,
    EditFormActiviteComponent,
    AddFormAnneeComponent,
    EditFormAnneeComponent,
    EnseignantComponent,
    AddFormEnseignantComponent,
    EditFormEnseignantComponent,
    AddFormEnseignerComponent,
    EnseignerComponent,
    EditFormSuiviComponent,
    AddFormCompetenceComponent,
    AddFormObjectifComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    IconsProviderModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
