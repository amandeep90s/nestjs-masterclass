import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';

@Injectable()
export class UploadToAwsProvider {
  constructor(
    /**
     * Inject - configService
     */
    private readonly configService: ConfigService,
  ) {}

  public async fileUpload(file: Express.Multer.File): Promise<string> {
    const s3 = new S3();

    try {
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get<string>('app.aws.publicBucketName'),
          Key: this.generateFileName(file),
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        })
        .promise();

      return uploadResult.Key;
    } catch (error: unknown) {
      throw new RequestTimeoutException(error);
    }
  }

  generateFileName(file: Express.Multer.File): string {
    // Extract file name
    const [name] = file.originalname.split('.');

    // Clean up file name
    const filename = name.replace(/\s/g, '').trim();

    // Extract file extension
    const extension = path.extname(file.originalname);

    // Generate timestamp and UUID
    const timestamp = new Date().getTime().toString().trim();

    return `${filename}-${timestamp}${extension}`;
  }
}
