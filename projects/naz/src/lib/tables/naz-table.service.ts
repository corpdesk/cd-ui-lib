import { Injectable } from '@angular/core';
import { $, HtmlCtx } from "@corpdesk/core/src/lib/guig";
import { from, Observable } from "rxjs";
import { bufferCount, map, mergeMap } from "rxjs/operators";

interface FieldInfo {
    title: string;
    name: string;
    type: string;
}

interface PageElement { elemId: string; pageNumber: number; valid: boolean; }

export enum TRenderMode {
    pgInit = 0,
    pgPrev = 1,
    pgNext = 2,
}

export interface TRenderCtx {
    renderMode: TRenderMode;
    startPage: number;
}

interface StatusField {
    value: string;
    class: string;
}
// TDS: Table Data Source
export interface TDS {
    fields: FieldInfo[];
    data: any[];
}

export interface Page {
    thisPage: number;
    displayPage: boolean | null;
    isActive: boolean;
    items: number[];
}

export interface TPD {          //////////////////////////////////////
    totalRows: number;          // total rows from a given query.
    totalPages: number | null;  // total pages posible
    pageRows: number;           // rows per page
    maxPages: number;           // max pages to display on paginator
    startPage: number;          // first page to display on paginator
    pages: Page[];              // array of every page and row items
    activePage: number;         // selected page
    //////////////////////////////////////
}
export const transactions2 = {
    fields: [
        { title: 'Order ID', name: 'orderid', type: 'string' },
        { title: 'Date', name: 'date', type: 'string' },
        { title: 'Billing Name', name: 'billingname', type: 'string' },
        { title: 'Total', name: 'total', type: 'string' },
        { title: 'Payment Status', name: 'paymentstatus', type: 'status' },
        { title: 'Action', name: 'action', type: 'action' }
    ],
    data: [
        {
            orderid: '#NZ1563',
            date: '28 Mar, 2020',
            billingname: 'Frank Dean',
            total: '$164',
            paymentstatus: { value: 'Unpaid', class: 'badge-soft-warning' },
            action: '',
        },
        {
            orderid: '#NZ1564',
            date: '28 Mar, 2020',
            billingname: 'Eddy Torres',
            total: '$141',
            paymentstatus: { value: 'Paid', class: 'badge-soft-success' },
            action: '',
        },
        {
            orderid: '#NZ1565',
            date: '29 Mar, 2020',
            billingname: 'Jamison Clark',
            total: '$123',
            paymentstatus: { value: 'Paid', class: 'badge-soft-success' },
            action: '',
        },
        {
            orderid: '#NZ1566',
            date: '30 Mar, 2020',
            billingname: 'Jewel Buckley',
            total: '$112',
            paymentstatus: { value: 'Paid', class: 'badge-soft-success' },
            action: '',
        },
        {
            orderid: '#NZ1567',
            date: '31 Mar, 2020',
            billingname: 'Jeffrey Waltz',
            total: '$105',
            paymentstatus: { value: 'Unpaid', class: 'badge-soft-warning' },
            action: '',
        },
        {
            orderid: '#NZ1568',
            date: '01 Apr, 2020',
            billingname: 'Jefferson Allen',
            total: '$160',
            paymentstatus: { value: 'Chargeback', class: 'badge-soft-danger' },
            action: '',
        }
    ]
};

@Injectable({
    providedIn: 'root'
})
export class NazTableService {
    tpData: TPD;
    constructor() {

    }

    htmlTableInit() {
        return `
        <div class="table-responsive">
            <table class="table table-centered">
                <thead id="th_cdModules" class="thead-light">
                    
                </thead>
                <tbody id="tb_cdModules">
                    
                </tbody>
            </table>
        </div>
        <row id="tp_cdModules">
        </row>
        `;
    }

    hTHead(dSource: TDS) {
        let hHead = `<tr>`;
        dSource.fields.forEach((f) => {
            hHead += `<th>${f.title}</th>`;
        });
        hHead += `</tr>`;
        return hHead;
    }

    hTBody(dSource: TDS) {
        let hR = ``;
        dSource.data.forEach((rD: any) => {
            hR += `<tr>`;
            dSource.fields.forEach((f: FieldInfo) => {
                if (f.type === 'string') {
                    hR += `<td>${rD[f.name]}</td>`;
                }
                if (f.type === 'status') {
                    hR += `<td><div class="badge font-size-12 ${rD[f.name].class}">${rD[f.name].value}</div></td>`;
                }
                if (f.type === 'action') {
                    hR += `<td>
                                <a href="javascript:void(0);" ngbtooltip="Edit" class="mr-3 text-primary"
                                    ng-reflect-ngb-tooltip="Edit"><i class="mdi mdi-pencil font-size-18"></i></a>
                                <a href="javascript:void(0);" ngbtooltip="Delete" class="text-danger"
                                    ng-reflect-ngb-tooltip="Delete"><i class="mdi mdi-trash-can font-size-18"></i></a>
                            </td>`;
                }
            });
            hR += `</tr>`;
        });
        return hR;
    }

    hTPagination(tpData: TPD): Promise<string> {
        return new Promise(resolve => {
            this.setPages(tpData)
                .subscribe((pages: Page[]) => {
                    pages = this.setDisplayPages(tpData, pages);
                    let hPg = `
                        <div class="d-flex justify-content-between p-2">
                            <ngb-pagination role="navigation">
                                <ul class="pagination">`;

                    hPg += `
                                            <li id="tp_li_prev_cdModules" class="page-item">
                                                <a id="tp_prev_cdModules" aria-label="Previous" href="javascript:void(0);" class="page-link" tabindex="-1" aria-disabled="true">
                                                    <span aria-hidden="true">«</span>
                                                </a>
                                            </li>
                                    `;
                    for (let page of pages) {
                        if (page.isActive && page.displayPage === true) {
                            hPg += `
                                                <li id="tp_li_${page.thisPage}_cdModules" class="page-item active" aria-current="page">
                                                    <a id="tp_pg_${page.thisPage}_cdModules" href="javascript:void(0);" class="page-link"> ${page.thisPage} <span class="sr-only">(current)</span>
                                    
                                                    </a>
                                                </li>
                                            `;
                        } else if (page.displayPage === true) {
                            hPg += `
                                                <li id="tp_li_${page.thisPage}_cdModules" class="page-item">
                                                    <a id="tp_pg_${page.thisPage}_cdModules" href="javascript:void(0);" class="page-link"> ${page.thisPage}
                                                    </a>
                                                </li>
                                            `;
                        } if (page.thisPage === tpData.startPage + tpData.maxPages) {
                            hPg += `
                                                <li id="tp_li_${page.thisPage}_cdModules" class="page-item">
                                                    <a id="tp_pg_${page.thisPage}_cdModules" href="javascript:void(0);" class="page-link"> ...
                                                    </a>
                                                </li>
                                            `;
                        }
                    }
                    hPg += `
                                                <li id="tp_li_next_cdModules" class="page-item">
                                                        <a id="tp_next_cdModules" aria-label="Next" href="javascript:void(0);" class="page-link"><span aria-hidden="true">»</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </ngb-pagination>
                                            <select class="custom-select ng-untouched ng-pristine ng-valid" style="width: auto;">
                                                <option value="0: 2">2 items per page</option>
                                                <option value="1: 4">4 items per page</option>
                                                <option value="2: 6">6 items per page</option>
                                            </select>
                                        </div>
                                        `;
                    resolve(hPg);
                });
        });

    }


    setPages(tpData: TPD): Observable<any> {
        tpData = this.setTotalPages(tpData);
        const arr = Array.from(Array(tpData.totalRows).keys());
        return from(arr)
            .pipe(
                map((n: number) => n),
                bufferCount(tpData.pageRows),
                mergeMap((m, i) => {
                    return [{ thisPage: i }, { items: m }];
                }),
                bufferCount(2),
                map((a) => {
                    a[0].thisPage = a[0].thisPage! + 1;
                    if (a[0].thisPage === tpData.activePage) {
                        const page: Page = {
                            thisPage: a[0].thisPage,
                            items: a[1].items!,
                            isActive: true,
                            displayPage: null,
                        };
                        return page;
                    } else {
                        const page: Page = {
                            thisPage: a[0].thisPage,
                            items: a[1].items!,
                            isActive: false,
                            displayPage: null,
                        };
                        return page;
                    }
                }),
                bufferCount(tpData.totalPages!),
            )

    }

    setTotalPages(tpData: TPD): TPD {
        let quotient = Math.floor(tpData.totalRows / tpData.pageRows);
        const remainder = tpData.totalRows % tpData.pageRows;
        if (remainder > 0) {
            quotient++;
        }
        tpData.totalPages = quotient;
        return tpData;
    }

    setDisplayPages(tpData: TPD, pages: Page[]) {
        return pages.map((p) => {
            if (p.thisPage >= tpData.startPage && p.thisPage <= tpData.startPage + (tpData.maxPages - 1)) {
                p.displayPage = true;
                return p;
            } else {
                return p;
            }
        })
    }

    async renderPagination(tpData: TPD, htmlCtx: HtmlCtx): Promise<boolean> {
        htmlCtx.srtHtml = await this.hTPagination(tpData);
        return await $.html(htmlCtx);
    }

    /**
     * after the pagination html is set,
     * go through display pages and activate
     * the links for fetching appropriate data
     */
    activateTLinks(token: string, instanceNazClient: any) {
        const startPage = this.tpData.startPage;
        let i = 0;
        while (i < this.tpData.maxPages) {
            const elem = document.querySelector(`#tp_pg_${startPage + i}_cdModules`);
            if (elem) {
                elem!.addEventListener('click', (e) => {
                    let pageNumber: number;
                    const strHead = 'tp_pg_';
                    const strTail = '_cdModules';
                    pageNumber = this.pgFromElem((e.target as HTMLElement).id, strHead, strTail);
                    const sess = localStorage.getItem(token);
                    if (sess) {
                        const jSess = JSON.parse(sess);
                        this.tpData.activePage = pageNumber;
                        instanceNazClient.renderNazTable(jSess, this.tpData);
                    }
                });
            }
            i++;
        }

        // activate Next
        const elemNext = document.querySelector(`#tp_next_cdModules`);
        console.log('activateTLinks()/001')
        if (elemNext) {
            console.log('activateTLinks()/002')
            elemNext!.addEventListener('click', (e) => {
                console.log('clicked next');
                this.shiftDisplay(TRenderMode.pgNext, instanceNazClient);
            });
        }

        // activate Prev
        console.log('activateTLinks()/003')
        const elemPrev = document.querySelector(`#tp_prev_cdModules`);
        console.log('activateTLinks()/004')
        if (elemPrev) {
            console.log('activateTLinks()/005')
            elemPrev!.addEventListener('click', (e) => {
                console.log('clicked prev');
                this.shiftDisplay(TRenderMode.pgPrev, instanceNazClient);
            });
        }
    }

    pgFromElem(id: string, strHead: string, strTail: string): number {
        // let id = (e.target as HTMLElement).id;
        console.log('pgFromElem()/id_01:', id)
        id = id.replace(strHead, '')
        id = id.replace(strTail, '')
        console.log('pgFromElem()/id_02:', id)
        const pageNumber: number = Number(id);
        return pageNumber;
    }

    shiftDisplay(renderMode: TRenderMode, instanceNazClient: any) {
        console.log('starting shiftDisplay()')
        // console.log('shiftDisplay()/this.tpData:', this.tpData)
        const diplayPages: number[] = [];
        if (renderMode === TRenderMode.pgNext && this.tpData.startPage < this.tpData.maxPages) {
            console.log('shiftDisplay()/before/this.tpData.startPage:', this.tpData.startPage)
            this.tpData.startPage++;
            console.log('shiftDisplay()/after/this.tpData.startPage:', this.tpData.startPage)
            // this.editPages(renderMode);
        }
        if (renderMode === TRenderMode.pgPrev && this.tpData.startPage > 0) {
            console.log('shiftDisplay()/before/this.tpData.startPage:', this.tpData.startPage)
            this.tpData.startPage--;
            console.log('shiftDisplay()/after/this.tpData.startPage:', this.tpData.startPage)
            // this.editPages(renderMode);
        }

        let htmlCtx: HtmlCtx = {
            elementRef: instanceNazClient.elementRef,
            position: 'beforeend',
            selector: `#tp_cdModules`,
            srtHtml: ''
        }
        // htmlCtx.selector = `#tp_cdModules`;
        this.renderPagination(this.tpData, htmlCtx).then((ret) => {
            if (ret) {
                // const instanceNazClient = this;
                this.activateTLinks(instanceNazClient.token, instanceNazClient);
            } else {
                console.log('something must have gone wrong');
            }
        });
    }

    // editPages(renderMode: TRenderMode) {
    //     const liCollection = document.querySelectorAll('.page-item');
    //     // console.log('editPages()/liCollection:', liCollection)
    //     for (let i = 0; i <= liCollection.length; i++) {
    //         const l = liCollection[i] as HTMLElement;
    //         if (l) {
    //             const lid = l.id;
    //             const pageEl = this.getPageElem(lid)
    //             if (pageEl.valid) {
    //                 console.log('scanPages()/elementId:', lid);
    //                 // get elements
    //                 const liElem = document.getElementById(pageEl.elemId) as HTMLElement;
    //                 const aElem = document.getElementById(`tp_pg_${pageEl.pageNumber}_cdModules`) as HTMLElement;
    //                 if(liElem && aElem){
    //                     if(renderMode === TRenderMode.pgNext){
    //                         liElem.id = `tp_li_${pageEl.pageNumber++}_cdModules`;
    //                         aElem.innerHTML = (pageEl.pageNumber++).toString();
    //                         aElem.id = `tp_pg_${pageEl.pageNumber++}_cdModules`;
    //                     }
    //                     if(renderMode === TRenderMode.pgPrev){
    //                         liElem.id = `tp_li_${pageEl.pageNumber--}_cdModules`;
    //                         aElem.innerHTML = (pageEl.pageNumber--).toString();
    //                         aElem.id = `tp_pg_${pageEl.pageNumber--}_cdModules`;
    //                     }
    //                 }

    //             }
    //         }
    //     }
    // }

    // getPageElem(id: string): PageElement {
    //     const strHead = 'tp_li_';
    //     const strTail = '_cdModules';
    //     const pgNumber = this.pgFromElem(id, strHead, strTail)
    //     console.log('isPageElem()/001')
    //     console.log('isPageElem()/pgNumber:', pgNumber);
    //     let ret: any;
    //     if (Number.isNaN(pgNumber)) {
    //         console.log('isPageElem()/002')
    //         ret = { elemId: id, pageNumber: pgNumber, valid: false };
    //     } else {
    //         console.log('isPageElem()/003')
    //         ret = { elemId: id, pageNumber: pgNumber, valid: true };
    //     }
    //     console.log('isPageElem()/ret:', ret);
    //     return ret;
    // }



}