import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Crypto, CryptoPrice } from "../models/crypto.model";

@Injectable({
    providedIn: "root"
})
export class CryptoService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    searchCryptos(query: string): Observable<Crypto[]> {
        return this.http
            .get<{ coins: Crypto[] }>(`${this.apiUrl}/search`, {
                params: { query: query }
            })
            .pipe(
                map((response) => response.coins),
                catchError(this.handleError)
            );
    }

    getCryptoPrices(cryptos: Crypto[]): Observable<Record<string, CryptoPrice>> {
        const cryptoIds = cryptos.map((crypto) => crypto.id).join(",");
        return this.http
            .get<Record<string, CryptoPrice>>(`${this.apiUrl}/simple/price`, {
                params: {
                    ids: cryptoIds,
                    vs_currencies: "usd",
                    precision: "2",
                    include_24hr_change: "true"
                }
            })
            .pipe(catchError(this.handleError));
    }

    getCryptoChart(id: string, timeframe: string): Observable<any> {
        const to = Math.floor(Date.now() / 1000);
        const from = to - parseFloat(timeframe) * 3600;

        return this.http
            .get<any>(`${this.apiUrl}/coins/${id}/market_chart/range`, {
                params: {
                    vs_currency: "usd",
                    from: from.toString(),
                    to: to.toString()
                }
            })
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = "Unknown error!";

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }
}
