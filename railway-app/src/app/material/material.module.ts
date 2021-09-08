import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatTabsModule} from '@angular/material/tabs'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatStepperModule} from '@angular/material/stepper'
import {MatButtonModule} from '@angular/material/button'

const materials = [
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatStepperModule,
  MatButtonModule
]

@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule { }