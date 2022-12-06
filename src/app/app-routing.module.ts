import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./page/auth/sing-in/sign-in.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SignUpComponent} from "./page/auth/sing-up/sign-up.component";
import {DashboardComponent} from "./page/dashboard/dashboard.component";
import {ResetPasswordComponent} from "./page/auth/reset-password/reset-password.component";
import {MainAppComponent} from "./layout/main-app/main-app.component";
import {MainAuthComponent} from "./layout/main-auth/main-auth.component";
import {ArtigosComponent} from "./page/cadastros/artigos/artigos.component";
import {ClientesComponent} from "./page/cadastros/clientes/clientes.component";
import {ArmazemComponent} from "./page/cadastros/armazem/armazem.component";
import {FornecedorComponent} from "./page/cadastros/fornecedor/fornecedor.component";
import {ServicosComponent} from "./page/cadastros/servicos/servicos.component";
import {FormGeralComponent} from "./page/cadastros/artigos/form-geral/form-geral.component";
import {EansComponent} from "./page/cadastros/artigos/forms-eans/eans.component";
import {DataTablesComponent} from "./page/cadastros/artigos/data-tables/data-tables.component";
import {ArmazemFormGeralComponent} from "./page/cadastros/armazem/armazem-form-geral/armazem-form-geral.component";
import {ArmarioPrateleirasComponent} from "./page/cadastros/armazem/armario-prateleiras/armario-prateleiras.component";


const routes: Routes = [

  {
    path: '', component: MainAppComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
    ]
  },
  {
    path: 'auth',
    component: MainAuthComponent,
    children: [
      {path: 'sign-in', component: SignInComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
    ]
  },
  {
    path: 'cadastros',
    component: MainAppComponent,
    children: [
      {
        path: 'artigos', component: ArtigosComponent,
        children: [
          {path: 'geral', component: FormGeralComponent},
          {path: 'eans', component: EansComponent},
          {path: 'todos', component: DataTablesComponent}

        ]
      },
      {path: 'clientes', component: ClientesComponent},
      {
        path: 'armazem', component: ArmazemComponent,
        children:[
          {path: 'geral', component: ArmazemFormGeralComponent },
          {path: 'armarios', component: ArmarioPrateleirasComponent },
          {path: 'todos', component: ArmazemFormGeralComponent },
        ]
      },
      {path: 'fornecedor', component: FornecedorComponent},
      {path: 'servicos', component: ServicosComponent},
    ]
  },

  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

