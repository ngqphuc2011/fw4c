import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  Input,
  TemplateRef
} from "@angular/core";
import {
  ValidationService,
  ValidationOption,
  ClientValidator,
  CustomValidationRule,
  RequiredValidationRule,
  ValidationRuleResponse
} from "ngx-fw4c";
import { of } from "rxjs";
import {
  TableOption,
  ModalService,
  DataService,
  TemplateViewModel,
  TableComponent,
  ConfirmViewModel,
  TableConstant,
  TableMode,
  TableColumnType
} from "ngx-fw4c";
import { AddServiceComponent } from './add-service/add-service.component';
import { ServiceManagementService } from './service-management.service';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.scss']
})
export class ServiceManagementComponent implements OnInit {
  @ViewChild("formRef", { static: true }) public formRef: ElementRef;
  @ViewChild("tableTemplate", { static: true }) public tableTemplate: TableComponent;
  public option: TableOption;
  @ViewChild("imageTemplate", { static: true })
  public imageTemplate: TemplateRef<any>;

  constructor(
    private _modalService: ModalService,
    private _serviceManagementService: ServiceManagementService
  ) { }

  ngOnInit() {
    this.initTable();

  }
  private initTable() {
    this.option = new TableOption({
      inlineEdit: false,
      mode: TableMode.full,
      searchFields: ["name", "host"],
      // displayText: {
      //   pageTitle: 'test',
      //   allTitle: 'aaa'
      // },
      topButtons: [
        {
          icon: "fa fa-plus",
          customClass: "primary",
          title: () => "New",
          executeAsync: item => {
            this._modalService.showTemplateDialog(new TemplateViewModel({
              customSize: 'modal-lg',
              title: 'Add New Service',
              template: AddServiceComponent,
              btnAcceptTitle: 'Add',
              acceptCallback: () => {
                this.tableTemplate.reload().subscribe();
              }
            }));
          }
        },
        {
          icon: "fa fa-refresh",
          title: () => "Reload",
          executeAsync: item => {
            this.tableTemplate.reload();
          }
        }
      ],
      actions: [
        {
          icon: "fa fa-edit",
          executeAsync: () => {
            //call other api....
          }
        },
        {
          icon: "fa fa-remove",
          executeAsync: (item) => {
            this._modalService.showConfirmDialog(new ConfirmViewModel({
              btnAcceptTitle: 'Delete',
              message: 'Are you sure to delete this service?',
              acceptCallback: () => {
                this._serviceManagementService.deleteData(item.id).subscribe(() => {
                  this.tableTemplate.reload()
                });
              }
            }))

          }
        }
      ],
      mainColumns: [
        {
          type: TableColumnType.String,
          title: () => "Name",
          valueRef: () => "name",
          width: 500,
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => "Host",
          valueRef: () => "host",
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => "Tags",
          valueRef: () => "tags",
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => "Created",
          valueRef: () => "created_at",
          allowFilter: false
        }
      ],
      serviceProvider: {
        searchAsync: request => {

          return this._serviceManagementService.getData(request);
        }
      }
    });
  }
}
