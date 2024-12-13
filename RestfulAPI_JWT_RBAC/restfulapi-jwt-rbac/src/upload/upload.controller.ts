import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { Express } from "express";

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {
    }

    @Post('multiple')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'images', maxCount: 10 },   // Tải lên tối đa 10 file hình ảnh
        { name: 'documents', maxCount: 10 } // Tải lên tối đa 10 tài liệu
    ]))
    uploadMultipleFiles(@UploadedFiles() files: { images?: Express.Multer.File[], documents?: Express.Multer.File[] }) {
        return this.uploadService.handleUpload(files);
    }
}
