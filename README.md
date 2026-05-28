# V Nails Spa Pembroke — Redesign

A polished static website redesign for V Nails Spa in Pembroke, Ontario.

## Included

- Responsive one-page salon website
- Real images and logo from the supplied Drive asset folder
- Full service/price menu from the brochure
- Portfolio gallery with optimized local WebP images
- Gift certificate CTA
- Contact, store hours, and Google Maps CTA
- Favicon and social/link preview image
- Vite build setup for Hostinger Git import
- GitHub Pages deployment workflow

## Hostinger Git import settings

This repo is set up as a Vite static site so Hostinger can detect and build it.

Use these settings if Hostinger asks:

- Framework: **Vite**
- Install command: `npm ci`
- Build command: `npm run build`
- Output / publish directory: `dist`
- Node version: 22 or latest LTS

## Local preview

```bash
npm ci
npm run dev
```

Then visit the local URL shown by Vite.

To test the production build:

```bash
npm run build
npm run preview
```

## Notes

Prices are copied from the provided brochure assets and marked as subject to change.
