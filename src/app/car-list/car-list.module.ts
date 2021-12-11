import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarListPageRoutingModule } from './car-list-routing.module';

import { CarListPage } from './car-list.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarListPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [CarListPage]
})
export class CarListPageModule {}
