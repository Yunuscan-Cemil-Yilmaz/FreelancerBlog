# SEO Configuration Guide

This project is built with centralized SEO management in mind to easily support deployments to different domains with different branding.

## 1. Environment Variables (Centralized Texts)
All central SEO text is driven by the `src/environments/environment.ts` (and `environment.production.ts`) files.

When cloning this project for a new deployment or domain, update these fields:
```typescript
export const environment = {
  brandName: 'BrandName',
  brandDomain: '.com',
  fullName: 'Your Full Name',
  copyrightHolder: 'Your Name',
  githubUrl: 'https://github.com/yourusername',
  linkedinUrl: 'https://linkedin.com/in/yourusername',
  // ...
};
```
These fields are automatically used by the `SeoService` to set titles, JSON-LD structured data, and meta tags.

## 2. Robots.txt (Ignored by Git)
The `public/robots.txt` file is added to `.gitignore` so you don't overwrite it when pulling from GitHub to different environments.

**When deploying to a new server:**
You must manually create `public/robots.txt` on the server (or in your CI/CD pipeline) with the following content:
```text
User-agent: *
Allow: /

Sitemap: https://api.YOUR_DOMAIN.com/sitemap.xml
```

## 3. Sitemap
The sitemap is generated dynamically by the backend (Laravel) at `/sitemap.xml`. Make sure your `robots.txt` points exactly to the backend URL where the sitemap is served.

## 4. Structured Data (JSON-LD)
Structured data is automatically injected via `SeoService`. 
- The Home Page (`HomeComponent`) sets a `Person` or `Organization` schema based on your environment variables.
- The detail pages should inject `Article` or `BlogPosting` schemas when they load their data.
