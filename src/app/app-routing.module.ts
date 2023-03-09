import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ProductsComponent } from './pages/products/products.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ServiceListsComponent } from './components/service-lists/service-lists.component';
import { RequestServiceComponent } from './components/request-service/request-service.component';

const routes: Routes = [
  { path: '', component: LandingComponent, data: { title: 'Home' } },
  { path: 'products', component: ProductsComponent, data: { title: 'Products' } },
  { path: 'product/:id', component: SingleProductComponent, data: { title: 'Services' } },
  { path: 'services', component: ServiceListsComponent },
  { path: 'request-service/:id', component: RequestServiceComponent, data: { title: 'Request Service' } },
  { path: '', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
