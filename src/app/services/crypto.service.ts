import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Crypto } from "../models/crypto.model";

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
