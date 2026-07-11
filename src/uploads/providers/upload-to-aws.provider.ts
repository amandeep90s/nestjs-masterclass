/// <reference types="multer" />
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class UploadToAwsProvider {
  private readonly s3Client: S3Client;

  constructor(
    /**
     * Inject - configService
     */
    private readonly configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('app.aws.region'),
      credentials: {
        accessKeyId: this.configService.get<string>('app.aws.accessKeyId'),
        secretAccessKey: this.configService.get<string>('app.aws.secretAccessKey'),
      },
    });
  }

  public async fileUpload(file: Express.Multer.File): Promise<string> {
    const fileName = this.generateFileName(file);

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.get<string>('app.aws.publicBucketName'),
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        }),
      );

      return fileName;
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
