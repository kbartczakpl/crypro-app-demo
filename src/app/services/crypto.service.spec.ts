import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CryptoService } from "./crypto.service";
import { of, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Crypto, CryptoPrice } from "../models/crypto.model";

describe("CryptoService", () => {
    let service: CryptoService;
    let httpClientSpy: { get: jasmine.Spy };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CryptoService]
        });

        httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
        service = new CryptoService(httpClientSpy as any);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should retrieve cryptos on search", () => {
        const mockResponse = { coins: [{ id: "bitcoin", name: "Bitcoin" }] };

        httpClientSpy.get.and.returnValue(of(mockResponse));

        service.searchCryptos("bitcoin").subscribe((cryptos) => {
            expect(cryptos.length).toBe(1);
            expect(cryptos[0].name).toBe("Bitcoin");
        });

        expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
    });

    it("should handle error on searchCryptos", () => {
        httpClientSpy.get.and.returnValue(throwError(new HttpErrorResponse({})));

        service.searchCryptos("bitcoin").subscribe(
            () => fail("expected an error, not cryptos"),
            (error) => expect(error).toContain("Error Code:")
        );
    });

    it("should retrieve crypto prices", () => {
        const mockCryptos: Crypto[] = [
            { id: "bitcoin", api_symbol: "btc", name: "Bitcoin", symbol: "BTC" },
            { id: "ethereum", api_symbol: "eth", name: "Ethereum", symbol: "ETH" }
        ];
        const mockResponse: Record<string, CryptoPrice> = {
            bitcoin: { usd: 50000, usd_24h_change: 5 },
            ethereum: { usd: 4000, usd_24h_change: -2 }
        };

        httpClientSpy.get.and.returnValue(of(mockResponse));

        service.getCryptoPrices(mockCryptos).subscribe((prices) => {
            expect(prices["bitcoin"]["usd"]).toBe(50000);
            expect(prices["ethereum"]["usd"]).toBe(4000);
        });

        expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
    });

    it("should handle error on getCryptoPrices", () => {
        const mockCryptos: Crypto[] = [{ id: "bitcoin", api_symbol: "btc", name: "Bitcoin", symbol: "BTC" }];

        httpClientSpy.get.and.returnValue(throwError(new HttpErrorResponse({})));

        service.getCryptoPrices(mockCryptos).subscribe(
            () => fail("expected an error, not prices"),
            (error) => expect(error).toContain("Error Code:")
        );
    });

    it("should retrieve crypto chart data", () => {
        const mockResponse = [
            [1634270400000, 50000],
            [1634274000000, 50500]
        ];

        httpClientSpy.get.and.returnValue(of(mockResponse));

        service.getCryptoChart("bitcoin", "1").subscribe((data) => {
            expect(data.length).toBe(2);
            expect(data[0][1]).toBe(50000);
        });

        expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
    });

    it("should handle error on getCryptoChart", () => {
        const mockCryptos: Crypto[] = [{ id: "bitcoin", api_symbol: "btc", name: "Bitcoin", symbol: "BTC" }];

        httpClientSpy.get.and.returnValue(throwError(new HttpErrorResponse({}))); // Passing empty object

        service.getCryptoPrices(mockCryptos).subscribe(
            () => fail("expected an error, not prices"),
            (error) => expect(error).toContain("Error Code:")
        );
    });

    it("should handle ErrorEvent", () => {
        const errorEvent = new ErrorEvent("Network error", {
            message: "Network Error Message"
        });

        const result = service["handleError"](new HttpErrorResponse({ error: errorEvent }));

        result.subscribe(
            () => fail("expected an error, not success"),
            (error) => expect(error).toContain("Error: Network Error Message")
        );
    });

    it("should handle HttpErrorResponse", () => {
        const httpErrorResponse = new HttpErrorResponse({
            status: 404,
            statusText: "Not Found",
            url: "http://api.url"
        });

        const result = service["handleError"](httpErrorResponse);

        result.subscribe(
            () => fail("expected an error, not success"),
            (error) => expect(error).toContain("Error Code: 404")
        );
    });
});
