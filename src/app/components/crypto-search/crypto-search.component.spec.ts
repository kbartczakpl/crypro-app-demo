import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CryptoSearchComponent } from "./crypto-search.component";

describe("CryptoSearchComponent", () => {
    let component: CryptoSearchComponent;
    let fixture: ComponentFixture<CryptoSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CryptoSearchComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CryptoSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
