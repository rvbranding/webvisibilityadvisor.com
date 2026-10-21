import site from '../site.config';
import Reveal from './Reveal';

/**
 * The delivery team at work.
 *
 * Real photography rather than icons, because "who will actually be doing
 * this" is the question the rest of the about page answers in words. The
 * captions describe what is happening rather than naming individuals, since
 * the people on any given engagement change.
 */
const PHOTOS = [
  {
    src: '/media/team-standup.webp',
    alt: 'Delivery team reviewing work at a shared desk',
    caption: 'Fortnightly review',
    body: 'Every cycle ends with something on a staging URL and the team around it.',
    span: 'sm:col-span-2',
    ratio: 'aspect-[4/3]'
  },
  {
    src: '/media/team-engineer.webp',
    alt: 'Engineer working at a development workstation',
    caption: 'Build',
    body: 'Senior engineers, small teams, no handover to a second group after signing.',
    span: '',
    ratio: 'aspect-[3/4]'
  },
  {
    src: '/media/team-whiteboard.webp',
    alt: 'Two colleagues planning at a whiteboard',
    caption: 'Architecture',
    body: 'The data model and the integration map agreed before anything is built.',
    span: '',
    ratio: 'aspect-[3/4]'
  },
  {
    src: '/media/team-pairing.webp',
    alt: 'Two engineers pairing at a monitor',
    caption: 'Review',
    body: 'Every change read by a second engineer before it reaches your branch.',
    span: 'sm:col-span-2',
    ratio: 'aspect-[4/3]'
  }
];

export default function TeamPhotos() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {PHOTOS.map((photo, i) => (
        <Reveal key={photo.src} delay={(i % 3) * 80} className={photo.span}>
          <figure className="group h-full overflow-hidden border-[3px] border-ink bg-paper">
            <div className={`${photo.ratio} w-full overflow-hidden`}>
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="border-t-[3px] border-ink p-6">
              <p className="b-label text-blazeText">{photo.caption}</p>
              <p className="b-body mt-3 text-[13px] text-muted">{photo.body}</p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
