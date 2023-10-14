import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Crypto } from '../models/crypto.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesList: Crypto[] = [];
  private favoritesSubject = new BehaviorSubject<Crypto[]>(this.favoritesList);
  favorites$: Observable<Crypto[]> = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavoritesFromStorage();
  }

  private loadFavoritesFromStorage(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favoritesList = JSON.parse(storedFavorites);
      this.favoritesSubject.next(this.favoritesList);
    }
  }

  private saveFavoritesToStorage(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favoritesList));
  }

  addToFavorites(crypto: Crypto): void {
    this.favoritesList.push(crypto);
    this.favoritesSubject.next(this.favoritesList);
    this.saveFavoritesToStorage();
  }

  removeFromFavorites(cryptoId: string): void {
    this.favoritesList = this.favoritesList.filter(c => c.id !== cryptoId);
    this.favoritesSubject.next(this.favoritesList);
    this.saveFavoritesToStorage();
  }

  getFavorites(): Observable<Crypto[]> {
    return this.favorites$;
  }
}
