import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of, catchError } from "rxjs";
import { map, startWith, debounceTime, switchMap } from "rxjs/operators";
import { CryptoService } from "../../services/crypto.service";
import { FavoritesService } from "../../services/favorites.service";
import { Crypto } from "../../models/crypto.model";

@Component({
    selector: "app-crypto-search",
    templateUrl: "./crypto-search.component.html",
    styleUrls: ["./crypto-search.component.scss"]
})
export class CryptoSearchComponent implements OnInit {
    cryptoSearch = new FormControl();
    options: Crypto[] = [];
    filteredOptions: Observable<Crypto[]> = of([]);
    selectedCrypto?: Crypto;

    constructor(
        private cryptoService: CryptoService,
        private favoritesService: FavoritesService
    ) {}

    ngOnInit(): void {
        this.filteredOptions = this.cryptoSearch.valueChanges.pipe(
            startWith(""),
            debounceTime(300),
            switchMap((value) => this._filter(value)),
            catchError((err) => {
                console.error(err);
                return of([]);
            })
        );
        this.cryptoSearch.valueChanges.subscribe((value) => {
            if (typeof value === "object" && value !== null) {
                this.selectedCrypto = value;
            } else {
                this.selectedCrypto = undefined;
            }
        });
    }

    private _filter(value: string): Observable<Crypto[]> {
        return this.cryptoService.searchCryptos(value).pipe(
            switchMap((cryptos: Crypto[]) => {
                return this.favoritesService.getFavorites().pipe(
                    map((favorites: Crypto[]) => {
                        const favoriteIds = favorites.map((f) => f.id);
                        return cryptos.filter((crypto) => !favoriteIds.includes(crypto.id)).slice(0, 25);
                    })
                );
            })
        );
    }

    displayFn(crypto: Crypto): string {
        return crypto && crypto.name ? crypto.name : "";
    }

    addToFavorites(crypto: Crypto): void {
        this.favoritesService.addToFavorites(crypto);
        this.cryptoSearch.setValue("");
    }
}
