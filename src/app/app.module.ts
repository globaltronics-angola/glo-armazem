import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import {SignInComponent} from './page/auth/sing-in/sign-in.component';
import {SignUpComponent} from './page/auth/sing-up/sign-up.component';
import {ResetPasswordComponent} from './page/auth/reset-password/reset-password.component';
import {MainAppComponent} from './layout/main-app/main-app.component';
import {MainAuthComponent} from './layout/main-auth/main-auth.component';
import {SideBarComponent} from './layout/side-bar/side-bar.component';
import {MenuItemComponent} from './layout/side-bar/menu-item.component';
import {ArtigosComponent} from './page/cadastros/artigos/artigos.component';
import {ClientesComponent} from './page/cadastros/clientes/clientes.component';
import {FornecedorComponent} from './page/cadastros/fornecedor/fornecedor.component';
import {ServicosComponent} from './page/cadastros/servicos/servicos.component';
import {ArmazemComponent} from './page/cadastros/armazem/armazem.component';
import {TitleBarComponent} from './layout/title-bar/title-bar.component';
import {FormGeralComponent} from './page/cadastros/artigos/form-geral/form-geral.component';
import {DataTablesComponent} from './page/cadastros/artigos/data-tables/data-tables.component';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from "../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InserindoDadosComponent} from "./page/movimentos/inserindo-dados/inserindo-dados.component"
import {CategoriasComponent} from './comuns/categorias/categorias.component';
import {ArmazemFormGeralComponent} from './page/cadastros/armazem/armazem-form-geral/armazem-form-geral.component';
import {ArmarioPrateleirasComponent} from './page/cadastros/armazem/armario-prateleiras/armario-prateleiras.component';
import {TabelaArmarioComponent} from './page/cadastros/armazem/tabela-armario/tabela-armario.component';
import {
  GeralClientesFormsComponent
} from './page/cadastros/clientes/geral-clientes-forms/geral-clientes-forms.component';
import {
  FormNifClEnderecoComponent
} from './page/cadastros/clientes/form-nif-cl-endereco/form-nif-cl-endereco.component';
import {TabelasClientesComponent} from './page/cadastros/clientes/tabelas-clientes/tabelas-clientes.component';
import {
  FormsGeralFornecedoresComponent
} from './page/cadastros/fornecedor/forms-geral-fornecedores/forms-geral-fornecedores.component';
import {
  FornecedorNifEnderecosComponent
} from './page/cadastros/fornecedor/fornecedor-nif-enderecos/fornecedor-nif-enderecos.component';
import {
  DatatableFornecedoresComponent
} from './page/cadastros/fornecedor/datatable-fornecedores/datatable-fornecedores.component';
import {DepartmentsComponent} from './page/components/departments/departments.component';
import {TabelasNifAddressComponent} from './comuns/tabelas-nif-address/tabelas-nif-address.component';
import {FormGeralServicoComponent} from './page/cadastros/servicos/form-geral-servico/form-geral-servico.component';
import {ReferenciaServisoComponent} from './page/cadastros/servicos/referencia-serviso/referencia-serviso.component';
import {DatatableServicesComponent} from './page/cadastros/servicos/datatable-services/datatable-services.component';
import {TiposComponent} from './comuns/tipos/tipos.component';
import {ReferenciasServicosComponent} from './comuns/referencias-servicos/referencias-servicos.component';
import {EntradaArtigosComponent} from './page/movimentos/entrada-artigos/entrada-artigos.component';
import {PedidosServicosComponent} from './page/movimentos/pedidos-servicos/pedidos-servicos.component';
import {TransfernciaArtigosComponent} from './page/movimentos/transferncia-artigos/transferncia-artigos.component';
import {RequisicaoArtigoComponent} from './page/movimentos/requisicao-artigo/requisicao-artigo.component';
import {RequisicaoServicoComponent} from './page/movimentos/requisicao-servico/requisicao-servico.component';
import {FluxoCaixaComponent} from './page/movimentos/fluxo-caixa/fluxo-caixa.component';
import {LancamentoComponent} from './page/movimentos/entrada-artigos/lancamento/lancamento.component';
import {
  FormularioLancamentoComponent
} from './page/movimentos/entrada-artigos/formulario-lancamento/formulario-lancamento.component';
import {
  TabelaItemEntradaComponent
} from './page/movimentos/entrada-artigos/tabela-item-entrada/tabela-item-entrada.component';
import {QRCodeModule} from "angularx-qrcode";
import {FormRequisicaoComponent} from './page/movimentos/requisicao-artigo/form-requisicao/form-requisicao.component';
import {
  DatatableRequisicaoComponent
} from './page/movimentos/requisicao-artigo/datatable-requisicao/datatable-requisicao.component';
import {ItemRequisicaoComponent} from './page/movimentos/requisicao-artigo/item-requisicao/item-requisicao.component';
import {RequisicaoTypeComponent} from './comuns/requisicao-type/requisicao-type.component';
import {
  DatatablePedidosEmCursoComponent
} from './page/movimentos/requisicao-artigo/datatable-requisicao/datatable-pedidos-em-curso/datatable-pedidos-em-curso.component';
import {
  NewProductComponent
} from './page/movimentos/entrada-artigos/formulario-lancamento/new-product/new-product.component';
import {
  NewLocalizacaoComponent
} from './page/movimentos/entrada-artigos/formulario-lancamento/new-localizacao/new-localizacao.component';
import {
  NewFornecedorComponent
} from './page/movimentos/entrada-artigos/formulario-lancamento/new-fornecedor/new-fornecedor.component';

import {
  FormularioArtigosComponent
} from './page/movimentos/transferncia-artigos/formulario-artigos/formulario-artigos.component';
import {
  TabelaTransferenciasComponent
} from './page/movimentos/transferncia-artigos/tabela-transferencias/tabela-transferencias.component';
import {
  ItensTransferenciaComponent
} from './page/movimentos/transferncia-artigos/itens-transferencia/itens-transferencia.component';
import {DevolucaoArtigoComponent} from './page/movimentos/devolucao-artigo/devolucao-artigo.component';
import {
  FormularioDevolucaoComponent
} from './page/movimentos/devolucao-artigo/formulario-devolucao/formulario-devolucao.component';
import {ItemsDevolucaoComponent} from './page/movimentos/devolucao-artigo/items-devolucao/items-devolucao.component';
import {TabelaDevolucaoComponent} from './page/movimentos/devolucao-artigo/tabela-devolucao/tabela-devolucao.component';
import {InventarioComponent} from './page/movimentos/inventario/inventario.component';
import {TabelaInventarioComponent} from './page/movimentos/inventario/tabela-inventario/tabela-inventario.component';

import {HttpClientModule} from "@angular/common/http";

import { DatatableArnazemComponent } from './page/cadastros/armazem/datatable-arnazem/datatable-arnazem.component';
import { InfoArmazemComponent } from './page/cadastros/armazem/info-armazem/info-armazem.component';
import { ExistenciaArtigoComponent } from './page/movimentos/existencia-artigo/existencia-artigo.component';
import { TabelasExistenciasComponent } from './page/movimentos/existencia-artigo/tabelas-existencias/tabelas-existencias.component';
import { OcorenciasArtigoComponent } from './page/movimentos/ocorencias-artigo/ocorencias-artigo.component';
import { TabelaOcorrenciasComponent } from './page/movimentos/ocorencias-artigo/tabela-ocorrencias/tabela-ocorrencias.component';
import { MovimentosComponent } from './page/movimentos/movimentos/movimentos.component';
import { FormalarioInventarioComponent } from './page/movimentos/inventario/formalario-inventario/formalario-inventario.component';
import { RelatorioInventarioGeralComponent } from './page/movimentos/inventario/relatorio-inventario-geral/relatorio-inventario-geral.component';
import { BaixaArmazemComponent } from './page/movimentos/baixa-armazem/baixa-armazem.component';
import { FormularioBaixaComponent } from './page/movimentos/baixa-armazem/formulario-baixa/formulario-baixa.component';
import { TabelaBaixaComponent } from './page/movimentos/baixa-armazem/tabela-baixa/tabela-baixa.component';
import { HomePageComponent } from './page/Comuns/home-page.component';
import { UsersListComponent } from './page/Comuns/users-list/users-list.component';
import { UsersRulesComponent } from './page/Comuns/users-rules/users-rules.component';
import { SearchingComponent } from './page/movimentos/inventario/components/searching.component';
import { ItemInventarioComponent } from './page/movimentos/inventario/formalario-inventario/item-inventario/item-inventario.component';
import { ItemsBaixaComponent } from './page/movimentos/baixa-armazem/items-baixa/items-baixa.component';
import { WdgetStorageComponent } from './page/dashboard/wdget-storage/wdget-storage.component';
import { WdgetCounterComponent } from './page/dashboard/wdget-counter/wdget-counter.component';
import { WdgetCounter2Component } from './page/dashboard/wdget-counter2/wdget-counter2.component';
import { WdgetCounter3Component } from './page/dashboard/wdget-counter3/wdget-counter3.component';
import { ImportAndExpComponent } from './page/dashboard/import-and-exp/import-and-exp.component';
import { WdgetChartComponent } from './page/dashboard/wdget-chart/wdget-chart.component';
import { WdgetTableComponent } from './page/dashboard/wdget-table/wdget-table.component';
import { JsonImportAndExpComponent } from './page/movimentos/inserindo-dados/json-import-and-exp/json-import-and-exp.component';






@NgModule({
  declarations: [

    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ResetPasswordComponent,
    MainAppComponent,
    MainAuthComponent,
    SideBarComponent,
    MenuItemComponent,
    ArtigosComponent,
    ClientesComponent,
    FornecedorComponent,
    ServicosComponent,
    ArmazemComponent,
    TitleBarComponent,
    FormGeralComponent,
    DataTablesComponent,
    CategoriasComponent,
    ArmazemFormGeralComponent,
    ArmarioPrateleirasComponent,
    TabelaArmarioComponent,
    GeralClientesFormsComponent,
    FormNifClEnderecoComponent,
    TabelasClientesComponent,
    FormsGeralFornecedoresComponent,
    FornecedorNifEnderecosComponent,
    DatatableFornecedoresComponent,
    InserindoDadosComponent,
    TabelasNifAddressComponent,
    FormGeralServicoComponent,
    ReferenciaServisoComponent,
    DatatableServicesComponent,
    TiposComponent,
    ReferenciasServicosComponent,
    EntradaArtigosComponent,
    PedidosServicosComponent,
    TransfernciaArtigosComponent,
    RequisicaoArtigoComponent,
    RequisicaoServicoComponent,
    FluxoCaixaComponent,
    LancamentoComponent,
    FormularioLancamentoComponent,
    TabelaItemEntradaComponent,
    FormRequisicaoComponent,
    DatatableRequisicaoComponent,
    ItemRequisicaoComponent,
    RequisicaoTypeComponent,
    DatatablePedidosEmCursoComponent,
    NewProductComponent,
    NewLocalizacaoComponent,
    NewFornecedorComponent,
    FormularioArtigosComponent,
    TabelaTransferenciasComponent,
    ItensTransferenciaComponent,
    DevolucaoArtigoComponent,
    FormularioDevolucaoComponent,
    ItemsDevolucaoComponent,
    TabelaDevolucaoComponent,
    InventarioComponent,
    TabelaInventarioComponent,
    DatatableArnazemComponent,
    InfoArmazemComponent,
    ExistenciaArtigoComponent,
    TabelasExistenciasComponent,
    OcorenciasArtigoComponent,
    TabelaOcorrenciasComponent,
    MovimentosComponent,
    FormalarioInventarioComponent,
    RelatorioInventarioGeralComponent,
    BaixaArmazemComponent,
    FormularioBaixaComponent,
    TabelaBaixaComponent,
    HomePageComponent,
    UsersListComponent,
    UsersRulesComponent,
    SearchingComponent,
    ItemInventarioComponent,
    ItemsBaixaComponent,
    WdgetStorageComponent,
    WdgetCounterComponent,
    WdgetCounter2Component,
    WdgetCounter3Component,
    ImportAndExpComponent,
    WdgetChartComponent,
    WdgetTableComponent,
    JsonImportAndExpComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    QRCodeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
 //   { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
    /*{ provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9000] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 3001] : undefined },*/
  ],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule {
}
