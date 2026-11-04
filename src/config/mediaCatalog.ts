/**
 * Curated high-fidelity production media assets for realistic UI previews.
 * All URLs use optimized Unsplash CDN endpoints with auto=format, webp delivery, and precise crop bounds.
 */

export interface ProductMediaItem {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  category: string;
  badge?: string;
  imageUrl: string;
  gallery: string[];
}

export interface PortfolioProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  metric: string;
  metricLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  coverImage: string;
  galleryImages: string[];
  tags: string[];
  clientLogoText: string;
}

export interface StreamingMediaItem {
  id: string;
  title: string;
  channelName: string;
  channelAvatar: string;
  subscribers: string;
  duration: string;
  views: string;
  date: string;
  posterUrl: string;
  badge?: string;
}

export interface EditorialArticleItem {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  readTime: string;
  date: string;
  category: string;
  coverImage: string;
}

export interface MarketplaceListingItem {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  isSuperhost: boolean;
  badge?: string;
}

export const MEDIA_CATALOG = {
  // E-Commerce Curated Products
  products: [
    {
      id: 'prod-1',
      name: 'Acoustic Zero Spatial Headphones',
      tagline: 'Planar magnetic studio monitors with active hybrid noise cancellation',
      price: 349,
      originalPrice: 429,
      rating: 4.9,
      reviewsCount: 382,
      inStock: true,
      category: 'Audio Equipment',
      badge: 'Best Seller',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      id: 'prod-2',
      name: 'Apex Mechanical Lumina Keyboard',
      tagline: 'Custom CNC aluminum case with hot-swappable lubed linear switches',
      price: 189,
      originalPrice: 219,
      rating: 4.8,
      reviewsCount: 214,
      inStock: true,
      category: 'Workstation Gear',
      badge: 'Staff Pick',
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      id: 'prod-3',
      name: 'Titan Horizon Chronograph Watch',
      tagline: 'Sapphire glass dial with precision automatic mechanical movement',
      price: 495,
      rating: 5.0,
      reviewsCount: 96,
      inStock: true,
      category: 'Luxury Timepieces',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      id: 'prod-4',
      name: 'Aerolux Ergonomic Task Chair',
      tagline: 'Self-adjusting lumbar harmonic spine suspension in breathable mesh',
      price: 680,
      originalPrice: 790,
      rating: 4.7,
      reviewsCount: 158,
      inStock: false,
      category: 'Workspace Furniture',
      badge: 'Backordered',
      imageUrl: 'https://images.unsplash.com/photo-1580481077195-c3a821a506cb?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1580481077195-c3a821a506cb?auto=format&fit=crop&w=800&q=80',
      ],
    },
  ],

  // Portfolio Case Studies & Projects
  portfolio: [
    {
      id: 'port-1',
      title: 'Solstice: Autonomous AI Design System Engine',
      client: 'Solstice Labs (San Francisco)',
      category: 'Design Systems · AI Compiler',
      year: '2026',
      metric: '+48%',
      metricLabel: 'Engineer Handoff Velocity',
      summary: 'Architected zero-drift token compilation pipeline with WCAG 2.1 AAA automated APCA contrast validation.',
      challenge: 'Multi-brand design fragmentation across 14 enterprise frontend micro-repositories.',
      solution: 'Unified W3C DTCG standard token architecture with automated Tailwind and CSS custom properties injection.',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      ],
      tags: ['Design Tokens', 'Next.js 15', 'Tailwind CSS', 'Figma Tokens'],
      clientLogoText: 'SOLSTICE',
    },
    {
      id: 'port-2',
      title: 'Helios: Real-Time Grid Telemetry Dashboard',
      client: 'Helios Energy Network',
      category: 'Cloud Infrastructure · Telemetry',
      year: '2025',
      metric: '99.99%',
      metricLabel: 'Telemetry Uptime SLA',
      summary: 'High-density web telemetry interface visualizing 120,000 live solar micro-inverter nodes simultaneously.',
      challenge: 'Rendering 60fps real-time data streams without garbage collection micro-stutters on low-power client devices.',
      solution: 'Custom WebGL-accelerated sparklines and sub-millisecond virtualized data tables.',
      coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
      ],
      tags: ['TypeScript', 'WebGL', 'Telemetry', 'Data Visualization'],
      clientLogoText: 'HELIOS',
    },
    {
      id: 'port-3',
      title: 'Aura: Spatial Audio Mobile Experience',
      client: 'Aura Soundworks (Stockholm)',
      category: 'Mobile iOS · Audio Streaming',
      year: '2025',
      metric: '1.4M',
      metricLabel: 'Monthly Active Listeners',
      summary: 'Crafted the tactile acoustic streaming interface with fluid gesture physics and dynamic color extraction.',
      challenge: 'Translating rich acoustic spatial soundscapes into a minimal, distraction-free handheld mobile UI.',
      solution: 'Fluid springs using custom physics curves and automatic album palette harmonic gradient extraction.',
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
      ],
      tags: ['iOS', 'Spatial Audio', 'Fluid Physics', 'Design Systems'],
      clientLogoText: 'AURA',
    },
  ],

  // Streaming & Video
  streaming: [
    {
      id: 'stream-1',
      title: 'Autonomous Codebase Refactoring with Gemini 2.0 & Claude 3.5',
      channelName: 'TastyStyles Engineering Studio',
      channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      subscribers: '128K',
      duration: '1:24:00',
      views: '42.8k',
      date: 'Streamed 2 hours ago',
      posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      badge: '4K Ultra HD',
    },
    {
      id: 'stream-2',
      title: 'Building Modern Design Token Compilers from Scratch',
      channelName: 'Elena Rostova',
      channelAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
      subscribers: '64K',
      duration: '48:15',
      views: '18.2k',
      date: 'Yesterday',
      posterUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'stream-3',
      title: 'APCA Perceptual Contrast vs Traditional WCAG 2.1 Math',
      channelName: 'Design Systems Collective',
      channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
      subscribers: '92K',
      duration: '36:40',
      views: '24.1k',
      date: '3 days ago',
      posterUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    },
  ],

  // Editorial & Journalism
  editorial: [
    {
      id: 'edit-1',
      title: 'The Silent Revolution in Zero-Runtime Token Pipelines',
      excerpt: 'How leading engineering teams are decoupling visual design semantics from client bundle execution times.',
      author: 'Dr. Aris Thorne',
      authorRole: 'Chief Architect, Token Consortium',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
      readTime: '6 min read',
      date: 'Nov 4, 2026',
      category: 'Design Engineering',
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'edit-2',
      title: 'Beyond the Button: The Anatomy of Modern Component Shells',
      excerpt: 'Why polymorphic layout contracts matter more than atomic color pickers in multi-tenant architectures.',
      author: 'Elena Rostova',
      authorRole: 'Staff Frontend Engineer',
      authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
      readTime: '8 min read',
      date: 'Nov 2, 2026',
      category: 'Architecture',
      coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    },
  ],

  // Marketplace Listings
  marketplace: [
    {
      id: 'market-1',
      title: 'Glass Architectural Forest Villa & Private Sauna',
      location: 'Trondheim, Norway',
      pricePerNight: 285,
      rating: 4.96,
      reviewsCount: 142,
      imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
      isSuperhost: true,
      badge: 'Guest Favorite',
    },
    {
      id: 'market-2',
      title: 'Minimalist Concrete Loft with Skyline Views',
      location: 'Copenhagen, Denmark',
      pricePerNight: 210,
      rating: 4.88,
      reviewsCount: 89,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      isSuperhost: true,
    },
    {
      id: 'market-3',
      title: 'Secluded Clifftop Studio overlooking Pacific Ocean',
      location: 'Big Sur, California',
      pricePerNight: 450,
      rating: 4.98,
      reviewsCount: 204,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      isSuperhost: false,
      badge: 'Rare Find',
    },
  ],

  // User Avatars for Chats, Team, Reviews
  avatars: [
    { id: 'av-1', name: 'Alex Rivers', role: 'Lead Architect', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80' },
    { id: 'av-2', name: 'David Chen', role: 'Design Technologist', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80' },
    { id: 'av-3', name: 'Elena Rostova', role: 'Staff Engineer', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80' },
    { id: 'av-4', name: 'Marcus Vance', role: 'Security Ops', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80' },
  ],
};

