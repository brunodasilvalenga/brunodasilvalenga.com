---
title: Configuring Traefik DNS Challenge with Route53 in Dokploy for Private Home Lab SSL
date: '2025-09-28'
tags: ['traefik', 'dokploy', 'ssl', 'route53', 'homelab']
draft: false
summary: How to configure SSL certificates for private applications in Dokploy using Traefik's DNS challenge with Route53 when HTTP challenge isn't possible.
images: []
layout: PostLayout
authors: ['default']
---

Setting up a home lab with [Dokploy](https://dokploy.com/) is an excellent way to self-host applications in your own environment. However, when it comes to securing your private applications with SSL certificates, you might face some challenges, especially when your server isn't publicly accessible.

In this post, I'll walk you through how I solved the SSL certificate issue for my private home lab setup using Traefik's DNS challenge with Route53.

## The Problem

I have a mini computer running Debian with Dokploy installed in my home lab. Since security is crucial, I wanted to configure SSL certificates for all my internal applications. Dokploy uses Traefik by default, which is great because it's highly configurable.

The default Traefik configuration in Dokploy uses the HTTP challenge via Let's Encrypt. However, since my applications are private and not publicly accessible, the HTTP challenge validation fails because Let's Encrypt can't reach my server via HTTP requests to validate domain ownership.

## The Solution: DNS Challenge with Route53

Instead of making my server public just for SSL validation, I decided to use the DNS challenge method. This approach validates domain ownership by creating DNS TXT records, which works perfectly for private servers.

Since my DNS is managed by Route53 (even though it's for public domains, I didn't want to set up a private DNS server just for this), I configured Traefik to use Route53 for the DNS challenge validation. The plan was to access my home lab via VPN anyway, so this setup made perfect sense. So on my Route53 I created a normal RECORD and point it to my internal private IP address.

## Step 1: Configure Traefik for DNS Challenge

First, you need to modify the Traefik configuration to use the DNS challenge instead of the HTTP challenge. In Dokploy, go to "Traefik File System" and update the configuration "traefik.yml" to include:

```yaml
certificatesResolvers:
  letsencrypt:
    acme:
      email: your@mail.com
      storage: /etc/dokploy/traefik/dynamic/acme.json
      dnsChallenge:
        provider: route53 #Define the provider here
```

This configuration tells Traefik to use Route53 as the DNS provider for the ACME challenge.

## Step 2: Create an IAM Policy for Route53 Access

To allow Traefik to create and manage DNS records in Route53, you need to create an IAM user with specific permissions. First, create an IAM policy with the following content:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowChangeTXTForSpecificRecordInHostedZone",
            "Effect": "Allow",
            "Action": "route53:ChangeResourceRecordSets",
            "Resource": "arn:aws:route53:::hostedzone/<your_hosted_zone_id>",
            "Condition": {
                "ForAllValues:StringEquals": {
                    "route53:ChangeResourceRecordSetsRecordTypes": "TXT",
                    "route53:ChangeResourceRecordSetsNormalizedRecordNames": "_acme-challenge.<your-domain.com>"
                }
            }
        },
        {
            "Sid": "AllowGetChangeStatus",
            "Effect": "Allow",
            "Action": "route53:GetChange",
            "Resource": "arn:aws:route53:::change/*"
        },
        {
            "Sid": "AllowListHostedZonesReadOnlyOptional",
            "Effect": "Allow",
            "Action": [
                "route53:ListHostedZonesByName",
                "route53:ListHostedZones",
                "route53:ListResourceRecordSets"
            ],
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "aws:CalledViaFirst": "route53.amazonaws.com"
                }
            }
        }
    ]
}
```

This policy is designed with the principle of least privilege, allowing only the necessary permissions for ACME DNS challenges:

- **TXT record management**: Only allows creating/updating TXT records for the specific ACME challenge subdomain
- **Change status monitoring**: Allows checking the status of DNS record changes
- **Read-only access**: Limited read access to hosted zones for discovery

## Step 3: Create IAM User and Generate Credentials

After creating the policy:

1. Create a new IAM user
2. Attach the policy you just created to this user
3. Generate access keys for programmatic access
4. Save the credentials securely

## Step 4: Configure Environment Variables in Dokploy

Now you need to provide the AWS credentials to Traefik through Dokploy. Navigate to "Web Server" > "Traefik" > "Modify Environment" and add the following environment variables:

```bash
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_HOSTED_ZONE_ID=...
```

Make sure to replace the values with your actual AWS credentials and hosted zone ID.

## Step 5: Restart Traefik

After configuring everything, restart Traefik to apply the changes. You can do this through the Dokploy interface or by restarting the Traefik container.

## Results

With this configuration, Traefik will now be able to generate SSL certificates via Let's Encrypt using the DNS challenge method. When you deploy applications in Dokploy, they will automatically get valid SSL certificates without requiring your server to be publicly accessible.

The DNS challenge works by:
1. Traefik requests a certificate from Let's Encrypt
2. Let's Encrypt provides a challenge token
3. Traefik creates a TXT record in Route53 with the challenge token
4. Let's Encrypt verifies the TXT record exists
5. Upon successful verification, Let's Encrypt issues the certificate
6. Traefik automatically applies the certificate to your applications

## Security Benefits

This approach provides several security advantages:

- **Private server**: Your home lab server remains private and inaccessible from the internet
- **Valid SSL certificates**: All your applications get properly signed certificates
- **Automatic renewal**: Let's Encrypt certificates are automatically renewed
- **Minimal permissions**: The IAM policy follows the principle of least privilege

## Conclusion

Using DNS challenge with Route53 for SSL certificates in a private Dokploy setup is an elegant solution that maintains security while providing the convenience of automatic SSL certificate management. This setup allows you to have a professional-grade home lab with proper SSL encryption without exposing your internal infrastructure to the public internet.

The combination of Dokploy's ease of use and Traefik's flexibility makes this configuration straightforward to implement and maintain. Now I can access all my home lab applications securely via VPN with valid SSL certificates.