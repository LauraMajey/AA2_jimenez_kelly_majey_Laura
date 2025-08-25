import { Routes } from '@angular/router';

// Importación de componentes standalone
import LayoutComponent from './layout/layout.component';
import HomeComponent from './pages/home/home.component';
import StoreComponent from './pages/store/store.component';
import DetailsComponent from './pages/details/details.component';
import ProductsComponent from './pages/products/products.component';
import { CrudProductsComponent } from './pages/crud-products/crud-products.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'store/:id', component: StoreComponent },
      { path: 'store', component: StoreComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'add-product', component: CrudProductsComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
