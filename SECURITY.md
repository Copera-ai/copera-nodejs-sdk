# Security Policy

At Copera.ai, we take security seriously. We are committed to protecting our users and the open source community that uses our Node.js SDK.

If you identify any security vulnerability in this project, please follow the guidelines below to ensure secure and responsible disclosure.

---

## How to Report Vulnerabilities

Send an email to: **security@copera.ai**

Or use the **GitHub Security Advisories** feature in the [official repository](https://github.com/Copera-ai/copera-nodejs-sdk/security/advisories).

Please provide as much detail as possible:

- Description of the vulnerability.
- Steps to reproduce.
- Potential impact.
- Possible mitigation suggestions.

---

## What to Expect

- We will confirm receipt of your report within **48 business hours**.
- We will analyze and triage the vulnerability based on its severity.
- We will work on a fix within a timeframe appropriate to the criticality of the issue.
- We will conduct a coordinated disclosure after the fix is released, ensuring users are properly informed.

---

## Responsible Disclosure Policy

We request that you **do not publicly disclose any vulnerability** before we have had the opportunity to fix it and communicate appropriately to the community.

We value responsible disclosure practices and recognize the importance of community collaboration in keeping our SDK secure.

---

## API Key and Credential Management

Accidental exposure of API keys or other sensitive credentials represents a critical security risk.

**Best Practices:**

- **Never commit API keys** to version control (use `.gitignore`)
- Use environment variables for sensitive credentials
- Rotate API keys immediately if exposed
- Use separate API keys for development and production environments

> **If you accidentally expose credentials:** Immediately rotate them and notify security@copera.ai

---

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

---

## Acknowledgement

We thank you for your contribution to making the Copera.ai Node.js SDK more secure.

Your collaboration is fundamental to maintaining the integrity and trust in our open source project.