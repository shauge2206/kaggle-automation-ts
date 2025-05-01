# Step function for Kaggle & AWS automation flow

## Description
Step function for downlaod CSV from Kaggle, grooming data and modifying some data rows, uploading csv to S3 buckets, copy CSV information and insert into Heroku database within specific user)

### Step function
 YAML file sets up 3 step functions with neccessary IAM role accesses to S3 buckets and AWS Systems Manager. Each lambda has it`s own connection and upload responsibilty within the automation flow.

 Lambda 1. Downlaod CSV from Kaggle --> Upload to AWS S3 bucket
 Lamdba 2. Download CSV from S3 --> Groom/modify/clean data --> Uplaod to S3 bucket
 Lambda 3. Download modified CSV --> Upload to Heroku using API (copy insert)