import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
// import * as _moment from 'moment-timezone';
import { format } from 'date-fns';
import {  toZonedTime, format as formatTZ } from 'date-fns-tz';
// tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment } from 'moment-timezone';

// const moment = _rollupMoment || _moment;

@Pipe({
  name: 'userDateFormat'
})
export class UserDateFormatPipe implements PipeTransform {

  transform(date: string | Date, timeFormat: string = ''): string | null {
    const defaultValues = { dateFormat: 'MM-dd-yyyy', language: 'en-US', timeZone: 'Eastern', canonicalName: 'America/New_York' };

    const userPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}') || defaultValues;
    // const timeZoneOffset = moment(new Date(date)).tz(defaultValues.canonicalName).format('Z');
    ////////////////
    // migrated from moment to date-fns:
    const timeZone = defaultValues.canonicalName; // your time zone

    const zonedDate = toZonedTime(date, timeZone);
    const timeZoneOffset = formatTZ(zonedDate, 'Z', { timeZone });
    ///////////////
    const datePipe = new DatePipe(userPrefs.language);
    const dateFormat = timeFormat ? `${userPrefs.dateFormat}  ${timeFormat}` : userPrefs.dateFormat;
    return datePipe.transform(date, dateFormat, timeZoneOffset, userPrefs.language);
  }

}
