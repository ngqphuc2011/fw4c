import { OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FileViewModel } from './file.model';
import { FileService } from './file.service';
import { AuthenticationService } from '../../auth/auth.service';
import { ModalService } from '../modals/modal.service';
export declare class UploaderComponent implements OnInit, OnDestroy {
    protected modalService: ModalService;
    protected fileService: FileService;
    protected authenticationService: AuthenticationService;
    icon: string;
    title: string;
    multiple: boolean;
    cropImage: boolean;
    validationName: string;
    maxSize: number;
    fileType: 'doc' | 'image' | 'audio' | 'video' | 'default';
    cutRatio: number;
    resizeToWidth: number;
    maintainAspectRatio: boolean;
    changeLoading: EventEmitter<boolean>;
    changeProgress: EventEmitter<number>;
    fileUploaded: EventEmitter<FileViewModel>;
    loading: boolean;
    progress: number;
    private currentTypes;
    private subscriptions;
    constructor(modalService: ModalService, fileService: FileService, authenticationService: AuthenticationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onFileUploaded(files: File[], event: any): void;
    private execute;
    private initValidation;
    private initExtentionFile;
}
