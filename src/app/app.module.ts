import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SignInComponent } from './page/auth/sing-in/sign-in.component';
import { SignUpComponent } from './page/auth/sing-up/sign-up.component';
import { ResetPasswordComponent } from './page/auth/reset-password/reset-password.component';
import { MainAppComponent } from './layout/main-app/main-app.component';
import { MainAuthComponent } from './layout/main-auth/main-auth.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { MenuItemComponent } from './layout/side-bar/menu-item.component';
import { ArtigosComponent } from './page/cadastros/artigos/artigos.component';
import { ClientesComponent } from './page/cadastros/clientes/clientes.component';
import { FornecedorComponent } from './page/cadastros/fornecedor/fornecedor.component';
import { ServicosComponent } from './page/cadastros/servicos/servicos.component';
import { ArmazemComponent } from './page/cadastros/armazem/armazem.component';
import { TitleBarComponent } from './layout/title-bar/title-bar.component';
import { FormGeralComponent } from './page/cadastros/artigos/form-geral/form-geral.component';
import { EansComponent } from './page/cadastros/artigos/forms-eans/eans.component';
import { DataTablesComponent } from './page/cadastros/artigos/data-tables/data-tables.component';
import { AngularFireModule } from '@angular/fire/compat';
import {environment} from "../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModelosComponent } from './page/cadastros/artigos/components/modelos/modelos.component';
import { CategoriasComponent } from './page/cadastros/artigos/components/categorias/categorias.component';
import { TipoItemsComponent } from './page/cadastros/artigos/components/tipo-items/tipo-items.component';
import { UnidadeMedidaComponent } from './page/cadastros/artigos/components/unidade-medida/unidade-medida.component';
import { TabelaEanComponent } from './page/cadastros/artigos/forms-eans/tabela-ean/tabela-ean.component';



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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule {}
