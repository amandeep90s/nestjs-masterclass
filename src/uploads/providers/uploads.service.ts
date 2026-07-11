import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EFileType } from '../enums/file-types.enum';
import { IUploadFile } from '../interfaces/upload-file.interface';
import { Upload } from '../upload.entity';
import { UploadToAwsProvider } from './upload-to-aws.provider';

@Injectable()
export class UploadsService {
  constructor(
    /**
     * Inject uploadsRepository
     */
    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>,
    /**
     * Inject uploadToAwsProvider
     */
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    /**
     * Inject - configService
     */
    private readonly configService: ConfigService,
  ) {}

  public async uploadFile(file: Express.Multer.File): Promise<IUploadFile> {
    // Throw an error for unsupported MIME types
    const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`Unsupported MIME type: ${file.mimetype}`);
    }

    try {
      // Upload to the AWS S3 bucket
      const name = await this.uploadToAwsProvider.fileUpload(file);

      // Generate a new entry in the database
      const uploadFile: IUploadFile = {
        name,
        path: `https://${this.configService.get<string>('app.aws.cloudFrontUrl')}/${name}`,
        type: EFileType.IMAGE,
        mimetype: file.mimetype,
        size: file.size,
      };

      const upload = this.uploadsRepository.create(uploadFile);

      // Return the URL of the uploaded file
      return await this.uploadsRepository.save(upload);
    } catch (error: unknown) {
      throw new ConflictException(error);
    }
  }
}
