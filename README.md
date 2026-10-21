# Web Visibility Advisor

Be found by the people searching for what you do.

- **Design system:** `brutal`
- **Dev server:** http://localhost:5213
- **Pages:** Home, Services, AI & Automation, Solutions, Work, Process, Pricing, About, Contact

## Run it

From this directory:

```bash
npm run dev      # http://localhost:5213
npm run build    # production build into dist/
npm run preview  # serve the build with SPA routing
```

This is a standalone project. Install its own dependencies first:

```bash
npm install
```

## Deploying

Pushing to `main` builds the site and uploads `dist/` over FTP via
`.github/workflows/deploy.yml`. The repo needs `FTP_USERNAME` and
`FTP_PASSWORD` secrets set.

`WEB3FORMS_ACCESS_KEY` is optional. Set it and the contact form posts the
enquiry to Web3Forms; leave it unset and the form falls back to a pre-filled
`mailto:`. Either way the enquiry reaches `hello@webvisibilityadvisor.com`, which
is the address printed on the page.

## Pricing

Every package is estimated hours × the published rate of **$25/hr**.
These figures are the reference schedule halved; each one divides exactly by
25, so the hour counts are exact rather than rounded.

| Service line | Tiers |
| --- | --- |
| E-commerce | Basic $750 (30h) · Lite $1,750 (70h) · Premium $3,750 (150h) · Enterprise custom |
| Custom Software | Basic $2,250 (90h) · Lite $4,750 (190h) · Premium $9,000 (360h) · Enterprise custom |
| AI & Automation | Basic $600 (24h) · Lite $1,950 (78h) · Premium $4,450 (178h) · Enterprise custom |
| Care Plans | Basic $75 (3h) · Lite $175 (7h) · Premium $375 (15h) · Enterprise custom |

## Editing

This site can be edited directly like any other project. It was scaffolded by
`../premium-agency-sites/scripts/generate.mjs`, and re-running `npm run gen`
there overwrites `src/`, `README.md` and the config files here — so if you
plan to regenerate, make copy and palette changes in
`premium-agency-sites/brands/brutal.mjs` and layout changes in
`premium-agency-sites/templates/brutal/` instead.
