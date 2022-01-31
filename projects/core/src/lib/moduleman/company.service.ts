import { Injectable } from '@angular/core';
import { 
    BaseService, ServerService, IQuery, ICdRequest, 
    DEFAULT_ENVELOPE_CREATE, DEFAULT_ENVELOPE_GET, DEFAULT_ENVELOPE_GET_PAGED, 
    DEFAULT_ENVELOPE_GET_TYPE,DEFAULT_ENVELOPE_UPDATE, DEFAULT_ENVELOPE_DELETE 
} from '@corpdesk/core/src/lib/base';

@Injectable({
    providedIn: 'root',
})
export class CompanyService {
    b: BaseService;
    postData: ICdRequest;  
}
