provider "aws" {
    region = "us-east-1"
}

resource "aws_instance" "ci_pipeline" {
    ami = "var.ami_id"
    instance_type = "var.instance_type"
}

output "public_ip" {
    description = "Public IP of the EC2 instance"
    value = aws_instance.example_instance.public_ip
}
