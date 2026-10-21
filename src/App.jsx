import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const AiAutomation = lazy(() => import('./pages/AiAutomation'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Work = lazy(() => import('./pages/Work'));
const Process = lazy(() => import('./pages/Process'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

/** Jump to the top on navigation, or to the anchor when one is present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };
      if (scroll()) return;
      const t = setTimeout(scroll, 90);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return null;
}

function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="b-label text-ink">
        Loading<span className="animate-blink">_</span>
      </span>
    </div>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-shell px-6 py-28 lg:px-10">
      <p className="b-label text-blazeText">Error 404</p>
      <h1 className="b-display mt-6 text-[3rem] text-ink sm:text-[5rem]">
        Nothing here
      </h1>
      <p className="b-body mt-6 max-w-xl text-muted">
        The link you followed does not point at anything any more. Pricing and services are the
        two pages people usually want.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link to="/" className="b-btn b-btn-primary">
          Back to home
        </Link>
        <Link to="/pricing" className="b-btn b-btn-ghost">
          See pricing
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-volt focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <ScrollManager />
      <main id="main" className="flex-1">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/ai-automation" element={<AiAutomation />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/work" element={<Work />} />
            <Route path="/process" element={<Process />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
