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

const materials = [
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatStepperModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatPaginatorModule
]

@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule { }
