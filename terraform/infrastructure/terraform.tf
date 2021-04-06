terraform {
  backend "s3" {
    bucket = "terraform-webipie-bucket"
    key    = "global/s3/terraform.tfstate"
    region = "eu-central-1"

    dynamodb_table = "terraform-webipie-db"
    encrypt        = true
  }
}
