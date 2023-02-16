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
import {RequisicaoArtigoComponent} from "./page/movimentos/requisicao-artigo/requisicao-artigo.component";
import {FormRequisicaoComponent} from "./page/movimentos/requisicao-artigo/form-requisicao/form-requisicao.component";
import {
  DatatableRequisicaoComponent
} from "./page/movimentos/requisicao-artigo/datatable-requisicao/datatable-requisicao.component";
import {TransfernciaArtigosComponent} from './page/movimentos/transferncia-artigos/transferncia-artigos.component';
import {
  FormularioArtigosComponent
} from "./page/movimentos/transferncia-artigos/formulario-artigos/formulario-artigos.component";
import {
  TabelaTransferenciasComponent
} from "./page/movimentos/transferncia-artigos/tabela-transferencias/tabela-transferencias.component";
import {DevolucaoArtigoComponent} from "./page/movimentos/devolucao-artigo/devolucao-artigo.component";
import {TabelaDevolucaoComponent} from "./page/movimentos/devolucao-artigo/tabela-devolucao/tabela-devolucao.component";
import {
  FormularioDevolucaoComponent
} from "./page/movimentos/devolucao-artigo/formulario-devolucao/formulario-devolucao.component";
import {InventarioComponent} from "./page/movimentos/inventario/inventario.component";
import {TabelaInventarioComponent} from "./page/movimentos/inventario/tabela-inventario/tabela-inventario.component";
import {DatatableArnazemComponent} from "./page/cadastros/armazem/datatable-arnazem/datatable-arnazem.component";
import {ExistenciaArtigoComponent} from "./page/movimentos/existencia-artigo/existencia-artigo.component";
import {
  TabelasExistenciasComponent
} from "./page/movimentos/existencia-artigo/tabelas-existencias/tabelas-existencias.component";
import {OcorenciasArtigoComponent} from "./page/movimentos/ocorencias-artigo/ocorencias-artigo.component";
import {
  TabelaOcorrenciasComponent
} from "./page/movimentos/ocorencias-artigo/tabela-ocorrencias/tabela-ocorrencias.component";
import {MovimentosComponent} from "./page/movimentos/movimentos/movimentos.component";
import {
  FormalarioInventarioComponent
} from "./page/movimentos/inventario/formalario-inventario/formalario-inventario.component";
import {
  RelatorioInventarioGeralComponent
} from "./page/movimentos/inventario/relatorio-inventario-geral/relatorio-inventario-geral.component";
import {BaixaArmazemComponent} from "./page/movimentos/baixa-armazem/baixa-armazem.component";
import {FormularioBaixaComponent} from "./page/movimentos/baixa-armazem/formulario-baixa/formulario-baixa.component";
import {TabelaBaixaComponent} from "./page/movimentos/baixa-armazem/tabela-baixa/tabela-baixa.component";
import { InserindoDadosComponent } from './page/movimentos/inserindo-dados/inserindo-dados.component';
import {
  JsonImportAndExpComponent
} from "./page/movimentos/inserindo-dados/json-import-and-exp/json-import-and-exp.component";


const routes: Routes = [
  {
    path: '', component: MainAppComponent,
    children: [
      {path: '', component: DashboardComponent},
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
          {path: 'todos', component: DatatableArnazemComponent},
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
      },    ]
  },
  {
    path: 'stock', component: MainAppComponent,
    children: [
      {
        path: 'existencias', component: ExistenciaArtigoComponent,
        children: [
          {path: 'tabela', component: TabelasExistenciasComponent}
        ]
      },
      {
        path: 'ocorrencias', component: OcorenciasArtigoComponent,
        children: [
          {path: 'tabela', component: TabelaOcorrenciasComponent}
        ]
      },
      {
        path: 'inventario', component: OcorenciasArtigoComponent,
        children: [
          {path: 'tabela', component: RelatorioInventarioGeralComponent},
        ]
      },
      {
        path: 'movimento', component: OcorenciasArtigoComponent,
        children: [
          {path: 'tabela', component: MovimentosComponent},
          {path: 'inventario', component: RelatorioInventarioGeralComponent},
        ]
      }
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
      },
      {
        path: 'inserir', component: OcorenciasArtigoComponent,
        children: [
          {path: 'tabela', component: InserindoDadosComponent},
          {path: 'json', component: JsonImportAndExpComponent}
        ]
      },
      {
        path: 'requisicao', component: RequisicaoArtigoComponent,
        children: [
          {path: 'tabela', component: DatatableRequisicaoComponent},
          {path: 'formulario', component: FormRequisicaoComponent}
        ]
      },
      {
        path: 'transferencia', component: TransfernciaArtigosComponent,
        children: [
          {path: 'tabela', component: TabelaTransferenciasComponent},
          {path: 'formulario', component: FormularioArtigosComponent}
        ]
      },
      {
        path: 'devolucao', component: DevolucaoArtigoComponent,
        children: [
          {path: 'tabela', component: TabelaDevolucaoComponent},
          {path: 'formulario', component: FormularioDevolucaoComponent}
        ]
      },
      {
        path: 'baixa', component: BaixaArmazemComponent,
        children: [
          {path: 'tabela', component: TabelaBaixaComponent},
          {path: 'formulario', component: FormularioBaixaComponent}
        ]
      },
      {
        path: 'inventario', component: InventarioComponent,
        children: [
          {path: 'formulario', component: FormalarioInventarioComponent},
          {path: 'tabela', component: TabelaInventarioComponent}
        ]
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

