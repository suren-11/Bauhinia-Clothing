import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { RouterLink, RouterModule } from '@angular/router';
import { SafePipe } from './product/product-registration/safe.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    ServerModule,
    RouterModule,
    RouterLink,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
