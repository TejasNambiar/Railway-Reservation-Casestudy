import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatTabsModule} from '@angular/material/tabs'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatStepperModule} from '@angular/material/stepper'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatTableModule} from '@angular/material/table'
import {MatMenuModule} from '@angular/material/menu'
import {MatSelectModule} from '@angular/material/select'
import {MatDialogModule} from '@angular/material/dialog'
import {MatSnackBarModule} from '@angular/material/snack-bar'

const materials = [
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatStepperModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatPaginatorModule,
  MatMenuModule,
  MatSelectModule,
  MatTableModule,
  MatDialogModule,
  MatSnackBarModule
]

@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule { }
