import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Crypto, CryptoPrice } from "../models/crypto.model";
import { CryptoService } from "./crypto.service";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class FavoritesService {
    private favoritesList: Crypto[] = [];
    private favoritesSubject = new BehaviorSubject<Crypto[]>(this.favoritesList);
    favorites$: Observable<Crypto[]> = this.favoritesSubject.asObservable();

    constructor(private cryptoService: CryptoService) {
        this.loadFavoritesFromStorage();
    }

    private loadFavoritesFromStorage(): void {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            this.favoritesList = JSON.parse(storedFavorites);
            this.favoritesSubject.next(this.favoritesList);
        }
    }

    private saveFavoritesToStorage(): void {
        localStorage.setItem("favorites", JSON.stringify(this.favoritesList));
    }

    updatePrices(): void {
        if (this.favoritesList.length > 0) {
            this.cryptoService
                .getCryptoPrices(this.favoritesList)
                .pipe(
                    catchError((err) => {
                        console.error(err);
                        return of({});
                    })
                )
                .subscribe((prices: Record<string, CryptoPrice> | {}) => {
                    this.favoritesList.forEach((crypto) => {
                        if (typeof prices === "object" && prices.hasOwnProperty(crypto.id)) {
                            crypto.price = (prices as Record<string, CryptoPrice>)[crypto.id];
                        }
                    });

                    this.favoritesSubject.next([...this.favoritesList]);
                    this.saveFavoritesToStorage();
                });
        }
    }

    addToFavorites(crypto: Crypto): void {
        this.favoritesList.push(crypto);
        this.favoritesSubject.next(this.favoritesList);
        this.saveFavoritesToStorage();
        this.updatePrices();
    }

    removeFromFavorites(cryptoId: string): void {
        this.favoritesList = this.favoritesList.filter((c) => c.id !== cryptoId);
        this.favoritesSubject.next(this.favoritesList);
        this.saveFavoritesToStorage();
    }

    getSingleFavorite(cryptoId: string): Observable<Crypto | null> {
        const foundCrypto = this.favoritesList.find((crypto) => crypto.id === cryptoId);
        return of(foundCrypto ?? null);
    }

    getFavorites(): Observable<Crypto[]> {
        return this.favorites$;
    }
}
