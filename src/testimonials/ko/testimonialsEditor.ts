import * as ko from "knockout";
import template from "./testimonialsEditor.html";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { TestimonialsModel } from "../testimonialsModel";

@Component({
    selector: "testimonials-editor",
    template: template,
    injectable: "testimonialsEditor"
})
export class TestimonialsEditor {
    public textContent: ko.Observable<string>;
    public starsCount: ko.Observable<number>;
    public allStarsCount: ko.Observable<number>;
    public author: ko.Observable<string>;
    public authorTitle: ko.Observable<string>;

    constructor() {
        this.textContent = ko.observable<string>(); 
        this.starsCount = ko.observable<number>(); 
        this.allStarsCount = ko.observable<number>();
        this.author = ko.observable<string>();
        this.authorTitle = ko.observable<string>();
    }

    @Param()
    public model: TestimonialsModel;

    @Event()
    public onChange: (model: TestimonialsModel) => void;

    @OnMounted()
    public initialize(): void {
        this.textContent(this.model.textContent);
        this.starsCount(this.model.starsCount);
        this.allStarsCount(this.model.allStarsCount);
        this.author(this.model.author);
        this.authorTitle(this.model.authorTitle);

        this.textContent.subscribe(this.applyChanges);
        this.starsCount.subscribe(this.applyChanges);
        this.allStarsCount.subscribe(this.applyChanges);
        this.author.subscribe(this.applyChanges);
        this.authorTitle.subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.textContent = this.textContent();
        this.model.starsCount = +this.starsCount();
        const count = +this.allStarsCount();
        this.model.allStarsCount = count <= 10 ? count : 10;
        this.model.author = this.author();
        this.model.authorTitle = this.authorTitle();
        this.onChange(this.model);
    }
}
