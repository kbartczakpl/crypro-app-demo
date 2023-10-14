import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { FavoritesService } from "../../services/favorites.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { Crypto } from "../../models/crypto.model";
import { Subscription } from "rxjs";

@Component({
    selector: "app-crypto-list",
    templateUrl: "./crypto-list.component.html",
    styleUrls: ["./crypto-list.component.scss"]
})
export class CryptoListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ["thumb", "name", "symbol", "price_usd", "price_usd_24h_change", "actions"];
    dataSource = new MatTableDataSource<Crypto>([]);
    private favoritesSubscription?: Subscription;

    @ViewChild(MatSort, { static: true }) sort!: MatSort;

    constructor(private favoritesService: FavoritesService) {}

    ngOnInit(): void {
        this.favoritesSubscription = this.favoritesService.favorites$.subscribe((favorites) => {
            this.dataSource.data = favorites;
            this.dataSource.sort = this.sort;

            this.dataSource.sortingDataAccessor = (crypto, header) => {
                switch (header) {
                    case "price_usd":
                        return crypto.price?.usd;
                    case "price_usd_24h_change":
                        return crypto.price?.usd_24h_change;
                    default:
                        return crypto[header];
                }
            };
        });
    }

    ngOnDestroy(): void {
        if (this.favoritesSubscription) {
            this.favoritesSubscription.unsubscribe();
        }
    }

    removeFromFavorites(cryptoId: string): void {
        this.favoritesService.removeFromFavorites(cryptoId);
    }
}
