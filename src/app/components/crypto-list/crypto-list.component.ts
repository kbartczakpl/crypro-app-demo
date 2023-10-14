import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { MatTableDataSource } from '@angular/material/table';
import { Crypto } from '../../models/crypto.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['thumb', 'name', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<Crypto>([]);
  private favoritesSubscription?: Subscription;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.favoritesSubscription = this.favoritesService.favorites$.subscribe(
      (favorites) => {
        this.dataSource.data = favorites;
      }
    );
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
