import { PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
export declare class CurrencyPipe extends DecimalPipe implements PipeTransform {
    transform(value: any, digits?: string, locale?: string): string | null;
}
