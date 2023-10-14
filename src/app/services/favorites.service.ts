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

  addToFavorites(crypto: Crypto): void {
    this.favoritesList.push(crypto);
    this.favoritesSubject.next(this.favoritesList);
  }

  removeFromFavorites(cryptoId: string): void {
    this.favoritesList = this.favoritesList.filter(c => c.id !== cryptoId);
    this.favoritesSubject.next(this.favoritesList);
  }

  getFavorites(): Observable<Crypto[]> {
    return this.favorites$;
  }
}
