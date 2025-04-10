import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum CdNotifType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
}

@Injectable({
    providedIn: 'root', // Singleton service
})
export class CdNotifyService {
    constructor(private toastr: ToastrService) { }

    /**
     * Show a notification
     * @param message The message to display
     * @param type The type of notification (SUCCESS, ERROR, INFO, WARNING)
     * @param context Optional context for logging/debugging
     */
    notify(message: string, type: CdNotifType, context?: any): void {
        // Log context (if provided) for debugging purposes
        if (context) {
            console.debug(`Notification context:`, context);
        }

        // Trigger the appropriate toastr method based on notification type
        switch (type) {
            case CdNotifType.SUCCESS:
                this.toastr.success(message, 'Success');
                break;
            case CdNotifType.ERROR:
                this.toastr.error(message, 'Error');
                break;
            case CdNotifType.INFO:
                this.toastr.info(message, 'Info');
                break;
            case CdNotifType.WARNING:
                this.toastr.warning(message, 'Warning');
                break;
            default:
                this.toastr.info(message, 'Notification');
                break;
        }
    }
}
