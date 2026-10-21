import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import site from '../site.config';

/**
 * Per-route on-page SEO for a single-page app.
 *
 * Without this every route shares the one <title> and description baked into
 * index.html, which is the single biggest on-page problem an SPA has. Each
 * page mounts <Seo /> with its own title, description and JSON-LD, and this
 * component writes them into <head> on navigation.
 *
 * Everything is upserted by selector rather than appended, so navigating
 * between pages replaces the previous page's tags instead of stacking them.
 */

const ORIGIN = `https://${site.domain}`;

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Address lines arrive as a printed block — street, "City, REGION ZIP",
 * country — which is what a PostalAddress needs split back apart.
 */
function postalAddress(office) {
  const [street, locality = '', country = ''] = office.lines;
  const match = locality.match(/^(.*?),\s*([A-Z]{2})\s*([\w\s-]*)$/);

  return {
    '@type': 'PostalAddress',
    name: office.company,
    streetAddress: street,
    addressLocality: match ? match[1] : locality,
    addressRegion: match ? match[2] : undefined,
    postalCode: match ? (match[3] || '').trim() || undefined : undefined,
    addressCountry: country
  };
}

/**
 * The organisation block is identical on every page. It names the delivery
 * company as the parent, because the review scores and project figures this
 * site prints belong to it rather than to the brand.
 */
function organisationSchema() {
  return {
    '@type': 'ProfessionalService',
    '@id': `${ORIGIN}/#organization`,
    name: site.name,
    url: ORIGIN,
    description: site.metaDescription,
    foundingDate: String(site.founded),
    slogan: site.tagline,
    sameAs: [site.rv.deliveryUrl].filter(Boolean),
    parentOrganization: {
      '@type': 'Organization',
      name: site.rv.delivery,
      url: site.rv.deliveryUrl
    },
    areaServed: ['United States', 'United Kingdom', 'European Union', 'Australia'],
    knowsAbout: site.services.map((s) => s.label),
    address: site.offices.map(postalAddress),
    makesOffer: site.services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.label, description: s.description }
    }))
  };
}

export default function Seo({ title, description, path, schema, noindex = false }) {
  const { pathname } = useLocation();
  const url = ORIGIN + (path || pathname);
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`;
  const desc = description || site.metaDescription;

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('name', 'description', desc);
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    upsertLink('canonical', url);

    upsertMeta('property', 'og:type', path === '/' ? 'website' : 'article');
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:site_name', site.name);
    upsertMeta('property', 'og:locale', 'en_US');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);

    // One graph per page: the organisation, this page, and its breadcrumb.
    const crumbs = [{ name: 'Home', item: ORIGIN }];
    if (path && path !== '/') crumbs.push({ name: title, item: url });

    const graph = [
      organisationSchema(),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: fullTitle,
        description: desc,
        isPartOf: { '@id': `${ORIGIN}/#organization` },
        inLanguage: 'en'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: c.item
        }))
      },
      ...(schema ? (Array.isArray(schema) ? schema : [schema]) : [])
    ];

    let ld = document.getElementById('page-schema');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = 'page-schema';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  }, [fullTitle, desc, url, path, title, noindex, schema]);

  return null;
}

/** FAQPage schema from the same array the page already renders. */
export function faqSchema(items) {
  if (!items || !items.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };
}

/** ItemList schema for the services and solutions listings. */
export function listSchema(name, items) {
  return {
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label || item.title || item.name,
      description: item.description || item.outcome || item.body
    }))
  };
}
