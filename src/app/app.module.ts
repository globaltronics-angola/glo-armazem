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
import {environment} from "../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModelosComponent} from './page/cadastros/artigos/components/modelos/modelos.component';
import {CategoriasComponent} from './comuns/categorias/categorias.component';
import {TipoItemsComponent} from './page/cadastros/artigos/components/tipo-items/tipo-items.component';
import {UnidadeMedidaComponent} from './page/cadastros/artigos/components/unidade-medida/unidade-medida.component';
import {TabelaEanComponent} from './comuns/tabela-ean/tabela-ean.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    QRCodeModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule {
}
