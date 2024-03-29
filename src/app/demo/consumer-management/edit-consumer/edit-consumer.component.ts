import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Consumer } from '../consumer';
import { of } from 'rxjs';
import { EditConsumerService } from './edit-consumer.service';

@Component({
  selector: 'app-edit-consumer',
  templateUrl: './edit-consumer.component.html',
  styleUrls: ['./edit-consumer.component.scss']
})
export class EditConsumerComponent implements OnInit {

  @ViewChild("formRef", { static: true }) public formRef: ElementRef;
  @Input() public item = new Consumer;
  public body: string;

  public label = {
    username: "Username",
    custom_id: "Custom ID",
    tags: "Tags"
  }

  constructor(
    private _editConsumerService :EditConsumerService
  ) { }

  ngOnInit() {
  }

  isValid() {
    return true;
  }
  callback() {
    this.body = JSON.stringify(this.item);
    return this._editConsumerService.updateData(this.item.id, this.body);
  }
}
