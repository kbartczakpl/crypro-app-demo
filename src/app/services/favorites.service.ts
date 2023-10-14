import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, timer } from "rxjs";
import { Crypto, CryptoPrice } from "../models/crypto.model";
import { CryptoService } from "./crypto.service";
import { catchError, switchMap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: "root"
})
export class FavoritesService {
    private favoritesList: Crypto[] = [];
    private favoritesSubject = new BehaviorSubject<Crypto[]>(this.favoritesList);
    favorites$: Observable<Crypto[]> = this.favoritesSubject.asObservable();

    private isAutoRefreshSubject = new BehaviorSubject<boolean>(false);
    isAutoRefresh$: Observable<boolean> = this.isAutoRefreshSubject.asObservable();

    constructor(
        private cryptoService: CryptoService,
        private snackBar: MatSnackBar
    ) {
        this.loadFavoritesFromStorage();
        this.setupAutoRefresh();
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

    private setupAutoRefresh(): void {
        timer(0, 10000)
            .pipe(
                switchMap(() => {
                    if (this.favoritesList.length > 0) {
                        this.isAutoRefreshSubject.next(true);
                        this.snackBar.open("Price lists auto-refreshed", "Done", {
                            duration: 2000
                        });
                        return this.updatePrices().pipe(
                            catchError((err) => {
                                console.error(err);
                                return of();
                            })
                        );
                    } else {
                        return of();
                    }
                })
            )
            .subscribe(() => {
                this.isAutoRefreshSubject.next(false);
            });
    }

    updatePrices(): Observable<void> {
        if (this.favoritesList.length > 0) {
            return this.cryptoService.getCryptoPrices(this.favoritesList).pipe(
                catchError((err) => {
                    console.error(err);
                    return of({});
                }),
                switchMap((prices: Record<string, CryptoPrice> | {}) => {
                    this.favoritesList.forEach((crypto) => {
                        if (typeof prices === "object" && prices.hasOwnProperty(crypto.id)) {
                            crypto.price = (prices as Record<string, CryptoPrice>)[crypto.id];
                        }
                    });

                    this.favoritesSubject.next([...this.favoritesList]);
                    this.saveFavoritesToStorage();
                    return of();
                })
            );
        }
        return of();
    }

    addToFavorites(crypto: Crypto): void {
        this.favoritesList.push(crypto);
        this.favoritesSubject.next(this.favoritesList);
        this.saveFavoritesToStorage();
        this.updatePrices().subscribe();
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
