import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";


import { HomeComponent } from "./pages/home/home.component";

import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CryptoListComponent } from "./components/crypto-list/crypto-list.component";
import { CryptoSearchComponent } from './components/crypto-search/crypto-search.component';

@NgModule({
    declarations: [AppComponent, HeaderComponent, FooterComponent, CryptoListComponent, HomeComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatToolbarModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
