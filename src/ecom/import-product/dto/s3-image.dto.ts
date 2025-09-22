export class S3ImageDto {
    Key: string;
    LastModified: Date;
    ETag: string;
    ChecksumAlgorithm: string[];
    Size: number;
    StorageClass: string;
}
