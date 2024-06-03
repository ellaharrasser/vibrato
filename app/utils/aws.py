import boto3
import botocore
import uuid
import os


BUCKET_NAME = os.environ.get('S3_BUCKET')
S3_LOCATION = f'http://{BUCKET_NAME}.s3.amazonaws.com/'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'gif'}


s3 = boto3.client(
   's3',
   aws_access_key_id=os.environ.get('S3_KEY'),
   aws_secret_access_key=os.environ.get('S3_SECRET')
)


def get_unique_filename(filename: str) -> str:
    ext = filename.rsplit('.', 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f'{unique_filename}.{ext}'


def upload_file_to_s3(file, acl='public-read') -> dict[str, str]:
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                'ACL': acl,
                'ContentType': file.content_type
            }
        )
    except Exception as e:
        return { 'errors': str(e) }

    return { 'url': f'{S3_LOCATION}{file.filename}' }


def remove_file_from_s3(file_url: str):
    # Split file name from the URL for AWS
    key = file_url.rsplit('/', 1)[1]

    try:
        s3.delete_object(
            Bucket=BUCKET_NAME,
            Key=key
        )
    except Exception as e:
        return { 'errors': str(e) }

    return True
