import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {

    handleUpload(files: { image?: Express.Multer.File[], documents?: Express.Multer.File[] }) {

        // Xử lý file
        console.log(files);

        return {
            message: 'Files uploaded successfully',
            files,
        };
    }
}
