import { EFileType } from '../enums/file-types.enum';

export interface IUploadFile {
  name: string;
  path: string;
  type: EFileType;
  mimetype: string;
  size: number;
}
