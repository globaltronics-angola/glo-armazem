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
import {
  GeralClientesFormsComponent
} from "./page/cadastros/clientes/geral-clientes-forms/geral-clientes-forms.component";
import {
  FormNifClEnderecoComponent
} from "./page/cadastros/clientes/form-nif-cl-endereco/form-nif-cl-endereco.component";
import {TabelasClientesComponent} from "./page/cadastros/clientes/tabelas-clientes/tabelas-clientes.component";
import {
  FormsGeralFornecedoresComponent
} from "./page/cadastros/fornecedor/forms-geral-fornecedores/forms-geral-fornecedores.component";
import {
  DatatableFornecedoresComponent
} from "./page/cadastros/fornecedor/datatable-fornecedores/datatable-fornecedores.component";
import {
  FornecedorNifEnderecosComponent
} from "./page/cadastros/fornecedor/fornecedor-nif-enderecos/fornecedor-nif-enderecos.component";
import {FormGeralServicoComponent} from "./page/cadastros/servicos/form-geral-servico/form-geral-servico.component";
import {ReferenciaServisoComponent} from "./page/cadastros/servicos/referencia-serviso/referencia-serviso.component";
import {DatatableServicesComponent} from "./page/cadastros/servicos/datatable-services/datatable-services.component";
import {EntradaArtigosComponent} from "./page/movimentos/entrada-artigos/entrada-artigos.component";
import {LancamentoComponent} from "./page/movimentos/entrada-artigos/lancamento/lancamento.component";
import {
  FormularioLancamentoComponent
} from "./page/movimentos/entrada-artigos/formulario-lancamento/formulario-lancamento.component";


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
      {
        path: 'clientes', component: ClientesComponent,
        children: [
          {path: 'geral', component: GeralClientesFormsComponent},
          {path: 'nif-enderecos', component: FormNifClEnderecoComponent},
          {path: 'todos', component: TabelasClientesComponent}
        ]
      },
      {
        path: 'armazem', component: ArmazemComponent,
        children: [
          {path: 'geral', component: ArmazemFormGeralComponent},
          {path: 'armarios', component: ArmarioPrateleirasComponent},
          {path: 'todos', component: ArmazemFormGeralComponent},
        ]
      },
      {
        path: 'fornecedor', component: FornecedorComponent,
        children: [
          {path: 'geral', component: FormsGeralFornecedoresComponent},
          {path: 'nif-address', component: FornecedorNifEnderecosComponent},
          {path: 'todos', component: DatatableFornecedoresComponent},
        ]
      },
      {
        path: 'servicos', component: ServicosComponent,
        children: [
          {path: 'geral', component: FormGeralServicoComponent},
          {path: 'eans', component: ReferenciaServisoComponent},
          {path: 'todos', component: DatatableServicesComponent},
        ]
      },
    ]
  },
  {
    path: 'movimentos', component: MainAppComponent,
    children: [
      {
        path: 'entradas', component: EntradaArtigosComponent,
        children: [
          {path: 'tabela', component: LancamentoComponent},
          {path: 'entradas', component: FormularioLancamentoComponent}
        ]
      }
    ],
  },

  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

