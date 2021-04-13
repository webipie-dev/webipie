env = {
  default = {

    ecs = {
      app_count                            = 1
      instance_type = "t2.micro"
      ssh_pubkey_file = "id_rsa.pub"
      autoscaling_policy_name              = "ecs_autoscaling"
      autoscaling_request_per_target_value = "250"
      health_check_path                    = "/health_check/"
      healthy_threshold                    = "5"
      unhealthy_threshold                  = "2"
      health_check_interval                = "300"
      health_check_timeout                 = "5"
      min_capacity                         = 1
      max_capacity                         = 3

    }

    network = {
      route53_zone = "webipie.com"
    }

    task = {
      ecs_task_execution_role_name = "EcsTaskExecutionRole"
      registry_name                = "webipieecr"
      app_image                    = "latest"
      cpu                  = "256"
      memory               = "256"
    }

    certificate_route53 = {
      certificate_domain = "api.webipie.com"
    }

    website = {
      bucket_name = "webipie.com"
      domain_name = "webipie.com"
    }

    app_port       = 8000
    aws_region     = "eu-central-1"
    project_name   = "webipie"
    stage = "dev"

  }

  master = {

    ecs = {
      app_count                            = 1
      instance_type = "t2.micro"
      ssh_pubkey_file = "id_rsa.pub"
      autoscaling_policy_name              = "ecs_autoscaling"
      autoscaling_request_per_target_value = "250"
      health_check_path                    = "/health_check/"
      healthy_threshold                    = "5"
      unhealthy_threshold                  = "2"
      health_check_interval                = "300"
      health_check_timeout                 = "5"
      min_capacity                         = 1
      max_capacity                         = 3

    }

    network = {
      route53_zone = "webipie.com"
    }

    task = {
      ecs_task_execution_role_name = "EcsTaskExecutionRole"
      registry_name                = "webipieecr"
      app_image                    = "latest"
      cpu                  = "256"
      memory               = "256"
    }

    certificate_route53 = {
      certificate_domain = "api.webipie.com"
    }

    website = {
      bucket_name = "webipie.com"
      domain_name = "webipie.com"
    }

    app_port       = 8000
    aws_region     = "eu-central-1"
    project_name   = "webipie"
    stage = "prod"

  }
}
