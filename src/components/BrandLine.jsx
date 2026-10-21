import site from '../site.config';

/**
 * The one line every brand carries — with the delivery company's name as a
 * link to it.
 *
 * The line used to render as flat text everywhere, which left the only
 * company named on the page unreachable. Rather than storing markup in
 * `data/rv.mjs`, the sentence is split on the legal name at render time, so
 * `brandLine` stays a plain string that any other surface can still use.
 */
export default function BrandLine({ className = '', linkClassName = '' }) {
  const { brandLine, legal, deliveryUrl } = site.rv;
  const at = brandLine.indexOf(legal);

  const link = (
    <a
      key="rv"
      href={deliveryUrl}
      target="_blank"
      rel="noreferrer"
      className={`underline-offset-2 hover:underline ${linkClassName}`}
    >
      {legal}
    </a>
  );

  return (
    <p className={className}>
      {at === -1 ? (
        <>
          {brandLine} {link}
        </>
      ) : (
        <>
          {brandLine.slice(0, at)}
          {link}
          {brandLine.slice(at + legal.length)}
        </>
      )}
    </p>
  );
}
