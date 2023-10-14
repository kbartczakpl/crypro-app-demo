import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";

import { GoogleChartsModule } from "angular-google-charts";

import { HomeComponent } from "./pages/home/home.component";

import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CryptoListComponent } from "./components/crypto-list/crypto-list.component";
import { CryptoSearchComponent } from "./components/crypto-search/crypto-search.component";
import { CryptoDetailsComponent } from "./pages/crypto-details/crypto-details.component";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CryptoListComponent,
        HomeComponent,
        CryptoSearchComponent,
        CryptoDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatTooltipModule,
        MatDividerModule,
        MatCardModule,
        MatSelectModule,
        GoogleChartsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
