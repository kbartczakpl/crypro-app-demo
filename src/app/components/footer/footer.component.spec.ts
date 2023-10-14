import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FooterComponent } from "./footer.component";
import { MatToolbarModule } from "@angular/material/toolbar";

describe("FooterComponent", () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FooterComponent],
            imports: [MatToolbarModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should display the current year", () => {
        const currentYear = new Date().getFullYear();
        expect(component.year).toEqual(currentYear);
    });

    it("should render the year in the footer", () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector("mat-toolbar small").textContent).toContain(component.year.toString());
    });
});
