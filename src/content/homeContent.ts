import atriumImage from '@/assets/rara/atrium.jpg';
import eskinImage from '@/assets/rara/eskinscience.jpeg';
import bigDipImage from '@/assets/rara/bigdip.jpeg';
import a2Image from '@/assets/rara/a2.jpg';
import detroitImage from '@/assets/rara/detroit.png';
import raaghavImage from '@/assets/rara/raaghav.jpg';
import reviewsHeroImage from '@/assets/rara/reviews-hero.jpg';

export const stats = [
  { label: 'Projects delivered', value: '20+' },
  { label: 'Client satisfaction', value: '100%' },
  { label: 'Five-star reviews', value: '5 ★' },
];

export const services = [
  {
    eyebrow: '01',
    title: 'AI Automations',
    description:
      'We map the repetitive work inside a business, then build AI-assisted systems that remove the bottlenecks without making the experience feel robotic.',
    bullets: ['Booking systems', 'Phone and inbox flows', 'Workflow automation', 'Research and scraping pipelines'],
  },
  {
    eyebrow: '02',
    title: 'Websites & Brand Systems',
    description:
      'The site is the trust surface around the system. We design the experience, voice, and visual identity so the automation feels premium to your clients.',
    bullets: ['High-converting websites', 'Rebrands and refreshes', 'Case-study storytelling', 'Responsive front-end builds'],
  },
  {
    eyebrow: '03',
    title: 'Custom Platforms',
    description:
      'When the workflow needs its own product layer, we build focused platforms, dashboards, and portals that fit the business instead of forcing it into templates.',
    bullets: ['Course platforms', 'Client portals', 'Internal dashboards', 'Purpose-built tools'],
  },
];

export const projects = [
  {
    title: 'Atrium',
    category: 'Full Rebrand',
    image: atriumImage,
    description: 'Logo, website, and supporting brand materials for a restaurant rebrand.',
    detail: '"We need to rebrand the whole restaurant. We're switching from Dave and Amy's to Atrium."',
    url: 'https://atriumwalledlake.com',
  },
  {
    title: 'Emmanuel Skinscience',
    category: 'Website + Ecommerce',
    image: eskinImage,
    description: '20+ page website and a fully organized ecommerce experience.',
    detail: 'Creative direction, design, and development for a medical spa brand.',
    url: 'https://emmanuelskinscience.com',
  },
  {
    title: 'Big Dip Burgers',
    category: 'Website + Branding',
    image: bigDipImage,
    description: 'A bold restaurant website and brand presence for RARA's first client.',
    detail: 'Photography-forward, personality-rich, and built to feel local and memorable.',
    url: 'https://bigdipburgers.com',
  },
  {
    title: 'A2 Second Helpings',
    category: 'Nonprofit Website',
    image: a2Image,
    description: 'Brand and site work supporting a mission-driven nonprofit.',
    detail: 'Focused on communicating the mission with warmth, clarity, and trust.',
    url: 'https://a2secondhelpings.org',
  },
  {
    title: 'Detroit Soccer District',
    category: 'Social + Brand Support',
    image: detroitImage,
    description: 'Social media and branding work that helped grow a local audience.',
    detail: 'Positioned as a dynamic online hub for a growing soccer community.',
    url: 'https://detroitsoccerdistrict.com',
  },
];

export const testimonials = [
  {
    name: 'Jennifer Puzsar',
    role: 'Founder, Emmanuel Skinscience',
    quote:
      'Raaghav and his team did an excellent job with our website and online store. They were dedicated, polite and professional in their communication while delivering a beautiful product.',
  },
  {
    name: 'Jacob Sessions',
    role: 'Owner, Big Dip Burgers',
    quote:
      'After a quick consultation, they completely redesigned our website while also taking beautiful photography for our menu items. Great to see professional young men supporting the community.',
  },
  {
    name: 'Atrium of Walled Lake',
    role: 'Full Rebrand Client',
    quote:
      'We had an unusual task. These young men were always on time and on point. Pricing was amazing and compared to competitors cannot be touched.',
  },
  {
    name: 'Aashna Nadarjah',
    role: 'Founder, A2 Second Helpings',
    quote:
      'Rara helped my new non-profit with marketing, branding, and website design. Their communication was insanely fast. Cannot recommend them enough if you are looking to develop a brand.',
  },
];

export const founder = {
  name: 'Raaghav Saxena',
  title: 'Founder and CEO',
  image: raaghavImage,
  supportingImage: reviewsHeroImage,
  quote:
    'I started this group with the goal of helping small businesses following the COVID pandemic. Helping small businesses with marketing and data is one of the best ways to help our community prosper.',
};
