import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'naz-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    term: any;
    @Input() cardTitle: string;
    @Input() cardBodyId: string;

    constructor() { }

    ngOnInit(): void {
    }

}
