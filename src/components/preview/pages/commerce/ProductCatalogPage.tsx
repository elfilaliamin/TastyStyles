import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { FilterToolbarBlock } from '../../../blocks/FilterToolbarBlock';
import { AppIcon } from '../../../common/AppIcon';

export const ProductCatalogPage: React.FC = () => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.ecommerceCatalog ?? 'faceted-sidebar';

  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({ category: 'all', size: 'all' });
  const [activeSort, setActiveSort] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: 'Apex Studio Monitor 27"', category: 'Hardware', price: 349, rating: 4.9, reviews: 184, badge: 'Best Seller', colors: ['#0f172a', '#e2e8f0'] },
    { id: 2, name: 'ErgoWave Wireless Keypad', category: 'Accessories', price: 89, rating: 4.8, reviews: 92, badge: 'New', colors: ['#0284c7', '#334155'] },
    { id: 3, name: 'DTCG Design Token Engine v2', category: 'Software', price: 149, rating: 5.0, reviews: 312, badge: 'Featured', colors: ['#059669', '#10b981'] },
    { id: 4, name: 'Precision Desk Mat XL', category: 'Accessories', price: 38, rating: 4.7, reviews: 64, colors: ['#475569', '#0f172a'] },
    { id: 5, name: 'AeroPulse Leather Armrest', category: 'Hardware', price: 74, rating: 4.6, reviews: 48, colors: ['#92400e', '#1e293b'] },
    { id: 6, name: 'Autonomous Agent CLI Key', category: 'Software', price: 199, rating: 4.9, reviews: 420, badge: 'Popular', colors: ['#7c3aed', '#38bdf8'] },
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

      <main style={{ padding: 'var(--ts-space-lg)', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
        {/* Breadcrumb / Title Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '2px' }}>Catalog / Hardware & Tokens</div>
            <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.1)', fontWeight: 800, margin: 0 }}>
              Hardware & Design Kits
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '9999px', backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', fontWeight: 600 }}>
              Free 2-Day Shipping
            </span>
          </div>
        </div>

        {/* Filter Toolbar Block */}
        <FilterToolbarBlock
          searchPlaceholder="Search products by SKU, name, or category..."
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          facets={[
            { id: 'category', label: 'Category', options: [{ label: 'All', value: 'all' }, { label: 'Hardware', value: 'hardware', count: 18 }, { label: 'Software', value: 'software', count: 9 }, { label: 'Accessories', value: 'accessories', count: 24 }] },
            { id: 'size', label: 'Size', options: [{ label: 'All', value: 'all' }, { label: 'Standard', value: 'std' }, { label: 'XL', value: 'xl' }] },
          ]}
          activeFacetValues={activeFilters}
          onFacetChange={(id, val) => setActiveFilters(prev => ({ ...prev, [id]: val }))}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          totalResults={products.length}
        />

        {/* Content Body: Faceted Sidebar vs Top Filter Bar vs Split Map View */}
        {layout === 'split-map-view' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'var(--ts-space-lg)' }}>
            {/* Product List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
              {products.map((p) => (
                <div
                  key={p.id}
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-surface, 16px)',
                    padding: 'var(--ts-space-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: 'var(--ts-radius)',
                      backgroundColor: 'var(--ts-color-background)',
                      border: '1px solid var(--ts-color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <AppIcon name="shoppingBag" size={24} style={{ color: 'var(--ts-color-primary)' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '11px', opacity: 0.6 }}>Local Inventory · In Store Today</div>
                    <div style={{ fontWeight: 800, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--ts-color-primary)', marginTop: '2px' }}>${p.price}.00</div>
                  </div>
                  <button
                    type="button"
                    style={{
                      backgroundColor: 'var(--ts-color-primary)',
                      color: primaryTextColor,
                      border: 'none',
                      borderRadius: 'var(--ts-radius)',
                      padding: '6px 12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Hold
                  </button>
                </div>
              ))}
            </div>

            {/* Split Map View */}
            <div
              style={{
                height: '420px',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                boxShadow: 'var(--ts-shadow)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 'var(--ts-space-lg)',
                boxSizing: 'border-box',
              }}
            >
              <AppIcon name="mapPin" size={36} style={{ color: 'var(--ts-color-primary)', marginBottom: '8px' }} />
              <div style={{ fontWeight: 800, fontSize: '14px' }}>Store & Warehouse Distribution Map</div>
              <div style={{ fontSize: '12px', opacity: 0.7, maxWidth: '280px', marginTop: '4px' }}>
                Stock located across 4 regional micro-fulfillment fulfillment centers.
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--ts-space-lg)', alignItems: 'flex-start' }}>
            {/* Faceted Sidebar (Only when layout === 'faceted-sidebar') */}
            {layout === 'faceted-sidebar' && (
              <aside
                style={{
                  width: '240px',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: 'var(--ts-space-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  flexShrink: 0,
                }}
                className="hidden md:flex"
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.6, marginBottom: '8px' }}>
                    Price Range
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
                    <input type="text" defaultValue="$20" style={{ width: '50%', padding: '4px 6px', borderRadius: 'var(--ts-radius)', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)' }} />
                    <input type="text" defaultValue="$400" style={{ width: '50%', padding: '4px 6px', borderRadius: 'var(--ts-radius)', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)' }} />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.6, marginBottom: '8px' }}>
                    Stock Status
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked />
                      <span>In Stock Only</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input type="checkbox" />
                      <span>Pre-Order Items</span>
                    </label>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.6, marginBottom: '8px' }}>
                    Customer Rating
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                    {['4★ & above', '3★ & above'].map(r => (
                      <div key={r} style={{ cursor: 'pointer', opacity: 0.8 }}>{r}</div>
                    ))}
                  </div>
                </div>
              </aside>
            )}

            {/* Product Grid */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 'var(--ts-space-md)' }}>
              {products.map((p) => (
                <div
                  key={p.id}
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-surface, 16px)',
                    padding: 'var(--ts-space-md)',
                    boxShadow: 'var(--ts-shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                    position: 'relative',
                  }}
                >
                  {p.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        backgroundColor: 'var(--ts-color-primary)',
                        color: primaryTextColor,
                      }}
                    >
                      {p.badge}
                    </span>
                  )}

                  {/* Product Thumbnail Mock */}
                  <div
                    style={{
                      width: '100%',
                      height: '140px',
                      borderRadius: 'var(--ts-radius)',
                      backgroundColor: 'var(--ts-color-background)',
                      border: '1px solid var(--ts-color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AppIcon name="shoppingBag" size={36} style={{ color: 'var(--ts-color-primary)', opacity: 0.8 }} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', opacity: 0.6 }}>{p.category}</span>
                      <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700 }}>★ {p.rating} ({p.reviews})</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '14px', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                      {p.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {p.colors.map((c, i) => (
                        <span key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: c, border: '1px solid var(--ts-color-border)' }} />
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--ts-color-border)', paddingTop: '10px' }}>
                    <div style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '16px' }}>
                      ${p.price}.00
                    </div>
                    <button
                      type="button"
                      style={{
                        backgroundColor: 'var(--ts-color-primary)',
                        color: primaryTextColor,
                        border: 'none',
                        borderRadius: 'var(--ts-radius)',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <AppIcon name="plus" size={12} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

