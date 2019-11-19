import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Consumer } from '../consumer';
import { ValidationService, ValidationOption, RequiredValidationRule, ClientValidator, CustomValidationRule } from 'ngx-fw4c';
import { of, Observable } from 'rxjs';
import { AddConsumerService } from './add-consumer.service';

@Component({
  selector: 'app-add-consumer',
  templateUrl: './add-consumer.component.html',
  styleUrls: ['./add-consumer.component.scss']
})
export class AddConsumerComponent implements OnInit, AfterViewInit {
  public item = new Consumer;
  public body: any;
  @ViewChild("formRef", { static: true }) public formRef: ElementRef;

  public label = {
    username: "Username",
    custom_id: "Custom ID",
    tags: "Tags"
  }

  ngAfterViewInit(): void {
    this.initValidations();
  }
  initValidations() {
    var options = [
      new ValidationOption({
        validationName: "Username",
        valueResolver: () => this.item.username,
        relevantFields: () => ["Custom_id"],
        rules: [
          new RequiredValidationRule(),
        ]
      }),
      new ValidationOption({
        validationName: "Custom_id",
        valueResolver: () => this.item.custom_id,
        rules: [
          new RequiredValidationRule()
        ]
      })
    ]

    var validator = new ClientValidator({
      formRef: this.formRef,
      options: options
    });

    this._validationService.init({ validator });
  }

  constructor(
    private _validationService: ValidationService,
    private _addConsumerService: AddConsumerService
  ) { }

  ngOnInit() {
  }


  isValid(): boolean {
    return this._validationService.isValid(false);
  }

  callback(): Observable<any> {
    this.body = JSON.stringify(this.item);
    return this._addConsumerService.createData(this.body);
  }
}
