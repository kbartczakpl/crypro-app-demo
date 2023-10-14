import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FavoritesService } from "../../services/favorites.service";
import { CryptoService } from "../../services/crypto.service";
import { Crypto } from "../../models/crypto.model";
import { MatSelectChange } from "@angular/material/select";
import { ChartType } from "angular-google-charts";
import { Subscription } from "rxjs";

@Component({
    selector: "app-crypto-details",
    templateUrl: "./crypto-details.component.html",
    styleUrls: ["./crypto-details.component.scss"]
})
export class CryptoDetailsComponent implements OnInit, OnDestroy {
    crypto: Crypto | null = null;
    chartData: any;
    selectedTimeframe: string = "24";

    chartProps = {
        title: "Crypto Price Change",
        type: ChartType.LineChart,
        columnNames: ["Time", "Price"],
        options: {
            legend: { position: "none" },
            chartArea: {
                width: "90%",
                height: "90%"
            }
        },
        height: 400,
        dynamicResize: true
    };

    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private favoritesService: FavoritesService,
        private cryptoService: CryptoService
    ) {}

    ngOnInit(): void {
        const routeSubscription = this.route.params.subscribe(({ id }) => {
            const favoriteSubscription = this.favoritesService.getSingleFavorite(id).subscribe((data) => {
                this.crypto = data;
            });

            this.subscriptions.push(favoriteSubscription);
            this.updateChartData(id, this.selectedTimeframe);
        });

        this.subscriptions.push(routeSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    updateChartData(id: string, timeframe: string): void {
        const chartSubscription = this.cryptoService.getCryptoChart(id, timeframe).subscribe(
            (data) => {
                this.chartData = data.prices.map((price: any[]) => [new Date(price[0]), price[1]]);
            },
            (error) => {
                console.error("Error fetching the crypto data", error);
            }
        );

        this.subscriptions.push(chartSubscription);
    }

    onTimeframeChange(event: MatSelectChange): void {
        this.selectedTimeframe = event.value;
        if (this.crypto) {
            this.updateChartData(this.crypto.id, this.selectedTimeframe);
        }
    }
}
