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
import {EansComponent} from './page/cadastros/artigos/forms-eans/eans.component';
import {DataTablesComponent} from './page/cadastros/artigos/data-tables/data-tables.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {environment} from "../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModelosComponent} from './page/cadastros/artigos/components/modelos/modelos.component';
import {CategoriasComponent} from './comuns/categorias/categorias.component';
import {TipoItemsComponent} from './page/cadastros/artigos/components/tipo-items/tipo-items.component';
import {UnidadeMedidaComponent} from './page/cadastros/artigos/components/unidade-medida/unidade-medida.component';
import {TabelaEanComponent} from './page/cadastros/artigos/tabela-ean/tabela-ean.component';
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
import {DevolucoesArtigoComponent} from './page/movimentos/devolucoes-artigo/devolucoes-artigo.component';
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

import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/compat/database';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { DatatableArnazemComponent } from './page/cadastros/armazem/datatable-arnazem/datatable-arnazem.component';
import { InfoArmazemComponent } from './page/cadastros/armazem/info-armazem/info-armazem.component';
import { ExistenciaArtigoComponent } from './page/movimentos/existencia-artigo/existencia-artigo.component';
import { TabelasExistenciasComponent } from './page/movimentos/existencia-artigo/tabelas-existencias/tabelas-existencias.component';
import { OcorenciasArtigoComponent } from './page/movimentos/ocorencias-artigo/ocorencias-artigo.component';
import { TabelaOcorrenciasComponent } from './page/movimentos/ocorencias-artigo/tabela-ocorrencias/tabela-ocorrencias.component';
import { MovimentosComponent } from './page/movimentos/movimentos/movimentos.component';

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
    EansComponent,
    DataTablesComponent,
    ModelosComponent,
    CategoriasComponent,
    TipoItemsComponent,
    UnidadeMedidaComponent,
    TabelaEanComponent,
    ArmazemFormGeralComponent,
    ArmarioPrateleirasComponent,
    TabelaArmarioComponent,
    GeralClientesFormsComponent,
    FormNifClEnderecoComponent,
    TabelasClientesComponent,
    FormsGeralFornecedoresComponent,
    FornecedorNifEnderecosComponent,
    DatatableFornecedoresComponent,
    DepartmentsComponent,
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
    DevolucoesArtigoComponent,
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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
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
