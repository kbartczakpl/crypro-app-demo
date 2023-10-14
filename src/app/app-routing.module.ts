import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { CryptoDetailsComponent } from "./pages/crypto-details/crypto-details.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "crypto/:id", component: CryptoDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
