import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
    selector: "app-crypto-search",
    template: ""
})
class MockAppCryptoSearchComponent {}

@Component({
    selector: "app-crypto-list",
    template: ""
})
class MockAppCryptoListComponent {}

describe("HomeComponent", () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeComponent, MockAppCryptoSearchComponent, MockAppCryptoListComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should render app-crypto-search component", () => {
        const cryptoSearchElement = fixture.debugElement.query(By.css("app-crypto-search"));
        expect(cryptoSearchElement).toBeTruthy();
    });

    it("should render app-crypto-list component", () => {
        const cryptoListElement = fixture.debugElement.query(By.css("app-crypto-list"));
        expect(cryptoListElement).toBeTruthy();
    });
});
