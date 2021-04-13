provider "aws" {
  version = "~> 2.0"
  region  = local.vars.aws_region
  profile = "webipie"
}
