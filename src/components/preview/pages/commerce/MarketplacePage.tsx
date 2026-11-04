import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { FilterToolbarBlock } from '../../../blocks/FilterToolbarBlock';
import { MEDIA_CATALOG } from '../../../../config/mediaCatalog';

export const MarketplacePage: React.FC = () => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.marketplace ?? 'split-map-list';

  const [activeSort, setActiveSort] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('San Francisco, CA');

  const listings = [
    { id: 1, title: 'Glass Architectural Forest Villa & Private Sauna', host: 'Marcus Vance', location: 'Trondheim, Norway', rating: 4.96, reviews: 142, price: 285, guests: 4, badge: 'Superhost', imageUrl: MEDIA_CATALOG.marketplace[0].imageUrl },
    { id: 2, title: 'Minimalist Concrete Loft with Skyline Views', host: 'Elena Rostova', location: 'Copenhagen, Denmark', rating: 4.88, reviews: 89, price: 210, guests: 2, badge: 'Rare Find', imageUrl: MEDIA_CATALOG.marketplace[1].imageUrl },
    { id: 3, title: 'Secluded Clifftop Studio overlooking Pacific Ocean', host: 'David Chen', location: 'Big Sur, California', rating: 4.98, reviews: 204, price: 450, guests: 6, badge: 'Superhost', imageUrl: MEDIA_CATALOG.marketplace[2].imageUrl },
    { id: 4, title: 'Waterfront Minimalist Cabin Retreat', host: 'Sarah Jenkins', location: 'Lofoten, Norway', rating: 4.84, reviews: 62, price: 195, guests: 3, imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DynamicNavbar />

      <main style={{ padding: 'var(--ts-space-lg)', maxWidth: '1240px', width: '100%', margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
        {/* Marketplace Filter Strip */}
        <FilterToolbarBlock
          searchPlaceholder="Destination, neighborhood, city..."
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          facets={[
            { id: 'type', label: 'Stay Type', options: [{ label: 'All', value: 'all' }, { label: 'Entire Home', value: 'home' }, { label: 'Private Room', value: 'room' }] },
            { id: 'superhost', label: 'Host Tier', options: [{ label: 'All Hosts', value: 'all' }, { label: 'Superhosts Only', value: 'super' }] },
          ]}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          totalResults={listings.length}
        />

        {/* Layout Options: Hero Directory Categories vs Split Map List */}
        {layout === 'hero-directory-categories' ? (
          /* Hero Directory Categories Layout */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'var(--ts-space-lg)' }}>
            {listings.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  overflow: 'hidden',
                  boxShadow: 'var(--ts-shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Large Hero Photography Tile */}
                <div
                  style={{
                    width: '100%',
                    height: '180px',
                    backgroundColor: 'var(--ts-color-background)',
                    borderBottom: '1px solid var(--ts-color-border)',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(0,0,0,0.75)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#ffffff',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    ${item.price} / night
                  </span>
                </div>

                <div style={{ padding: 'var(--ts-space-md)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', opacity: 0.6 }}>Up to {item.guests} guests</span>
                    <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700 }}>★ {item.rating} ({item.reviews})</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '15px', margin: 0 }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '12px', opacity: 0.75 }}>
                    Hosted by {item.host} {item.badge && `· ${item.badge}`}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--ts-color-border)', paddingTop: '10px', marginTop: '4px' }}>
                    <button
                      type="button"
                      style={{
                        backgroundColor: 'var(--ts-color-primary)',
                        color: primaryTextColor,
                        border: 'none',
                        borderRadius: 'var(--ts-radius)',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Instant Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 50/50 Split View: Left Listings Stream + Right Vector Map */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 'var(--ts-space-lg)', alignItems: 'flex-start' }}>
          {/* Listings Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            {listings.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: 'var(--ts-space-md)',
                  boxShadow: 'var(--ts-shadow)',
                  display: 'flex',
                  gap: '14px',
                }}
              >
                {/* Mock Image Tile */}
                <div
                  style={{
                    width: '120px',
                    height: '110px',
                    borderRadius: 'var(--ts-radius-surface, 12px)',
                    backgroundColor: 'var(--ts-color-background)',
                    border: '1px solid var(--ts-color-border)',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', opacity: 0.6 }}>Up to {item.guests} guests</span>
                      <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700 }}>★ {item.rating} ({item.reviews})</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '14px', margin: '2px 0 4px 0', lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: '11px', opacity: 0.7 }}>
                      Hosted by {item.host} {item.badge && `· ${item.badge}`}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--ts-color-border)', paddingTop: '6px' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '15px' }}>
                        ${item.price}
                      </span>
                      <span style={{ fontSize: '11px', opacity: 0.6 }}> / night</span>
                    </div>
                    <button
                      type="button"
                      style={{
                        backgroundColor: 'var(--ts-color-primary)',
                        color: primaryTextColor,
                        border: 'none',
                        borderRadius: 'var(--ts-radius)',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Simulated Vector Map */}
          <div
            style={{
              height: '520px',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              boxShadow: 'var(--ts-shadow)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Grid Pattern */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.12,
                backgroundImage: 'radial-gradient(var(--ts-color-text) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Simulated Map Pins */}
            {[
              { top: '28%', left: '35%', price: '$220' },
              { top: '45%', left: '60%', price: '$175' },
              { top: '65%', left: '42%', price: '$340' },
              { top: '38%', left: '72%', price: '$195' },
            ].map((pin, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: pin.top,
                  left: pin.left,
                  padding: '4px 8px',
                  borderRadius: '9999px',
                  backgroundColor: i === 0 ? 'var(--ts-color-primary)' : 'var(--ts-color-surface)',
                  color: i === 0 ? primaryTextColor : 'var(--ts-color-text)',
                  border: '1px solid var(--ts-color-border)',
                  fontWeight: 800,
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                  cursor: 'pointer',
                }}
              >
                {pin.price}
              </div>
            ))}

            <div style={{ zIndex: 1, textAlign: 'center', backgroundColor: 'var(--ts-color-background)', padding: '12px 20px', borderRadius: 'var(--ts-radius-surface, 16px)', border: '1px solid var(--ts-color-border)', boxShadow: 'var(--ts-shadow)' }}>
              <div style={{ fontWeight: 800, fontSize: '13px' }}>San Francisco Bay Area</div>
              <div style={{ fontSize: '11px', opacity: 0.6 }}>Interactive Geographic Coordinates</div>
            </div>
          </div>
        </div>
      )}
    </main>
    </div>
  );
};
