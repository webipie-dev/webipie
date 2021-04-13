variable "env" {
  type = map(
    object({


      ecs = object({
        app_count                            = number
        instance_type = string
        ssh_pubkey_file = string
        autoscaling_policy_name              = string
        autoscaling_request_per_target_value = string
        health_check_path                    = string
        healthy_threshold                    = string
        unhealthy_threshold                  = string
        health_check_interval                = string
        health_check_timeout                 = string
        max_capacity                         = number
        min_capacity                         = number

      })

      network = object({
        route53_zone = string
      })

      task = object({
        ecs_task_execution_role_name = string
        registry_name                = string
        app_image                    = string
        cpu                  = string
        memory               = string

      })

      certificate_route53 = object({
        certificate_domain = string
      })

      website = object({
        bucket_name = string
        domain_name = string
      })

      app_port       = number
      aws_region     = string
      project_name   = string
      stage = string

    })
  )
}

variable "amis" {
    description = "Which AMI to spawn. Defaults to the AWS ECS optimized images."
    default = {
      us-east-1 = "ami-ddc7b6b7"
      eu-central-1 = "ami-9fc39c74"
      eu-west-1 = "ami-d65dfbaf"
    }
}
