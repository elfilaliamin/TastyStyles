import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { DiscussionReviewBlock } from '../../../blocks/DiscussionReviewBlock';
import { AppIcon } from '../../../common/AppIcon';
import { MEDIA_CATALOG } from '../../../../config/mediaCatalog';

export const ProductDetailPage: React.FC = () => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.productDetail ?? 'split-sticky-buy';

  const [selectedColor, setSelectedColor] = useState('Onyx');
  const [selectedSize, setSelectedSize] = useState('27"');
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);

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

      <main style={{ padding: 'var(--ts-space-lg)', maxWidth: '1100px', width: '100%', margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xl)' }}>
        {layout === 'vertical-scroll-story' ? (
          /* Vertical Storytelling Layout (Apple/Tesla standard) */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xl)' }}>
            {/* Full-width Lifestyle Hero Stage */}
            <div
              style={{
                width: '100%',
                minHeight: '380px',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                boxShadow: 'var(--ts-shadow)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: 'var(--ts-space-xl)',
                textAlign: 'center',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ts-color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Next-Generation Display Engine
              </span>
              <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.5)', fontWeight: 900, margin: '0 0 12px 0', maxWidth: '640px' }}>
                Apex Precision Studio Monitor
              </h1>
              <p style={{ margin: '0 0 24px 0', fontSize: '15px', opacity: 0.8, maxWidth: '540px', lineHeight: 1.6 }}>
                Crafted for creators requiring uncompromising color science, sub-millisecond input response, and seamless design token calibration.
              </p>

              {/* Floating Glass Buy Box in Center */}
              <div
                style={{
                  backgroundColor: 'var(--ts-color-background)',
                  border: '2px solid var(--ts-color-primary)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: '16px 24px',
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', opacity: 0.6, fontWeight: 700 }}>STARTING AT</div>
                  <div style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '24px', fontWeight: 900 }}>$349.00</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Onyx', 'Lunar Silver'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '9999px',
                        border: selectedColor === c ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                        backgroundColor: selectedColor === c ? 'rgba(2, 132, 199, 0.12)' : 'transparent',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  style={{
                    backgroundColor: 'var(--ts-color-primary)',
                    color: primaryTextColor,
                    border: 'none',
                    borderRadius: 'var(--ts-radius)',
                    padding: '10px 20px',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <AppIcon name="shoppingCart" size={15} />
                  <span>Order Now</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Split Sticky Buy Box & Two-Column Tabs */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'var(--ts-space-xl)', alignItems: 'flex-start' }}>
            {/* Gallery Column */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Thumbnail Rail */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {MEDIA_CATALOG.products[0].gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveThumb(idx)}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--ts-radius)',
                      border: activeThumb === idx ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                      backgroundColor: 'var(--ts-color-surface)',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      padding: 0,
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>

              {/* Main Stage Image */}
              <div
                style={{
                  flex: 1,
                  aspectRatio: '1/1',
                  maxHeight: '440px',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: 'var(--ts-shadow)',
                }}
              >
                <img
                  src={MEDIA_CATALOG.products[0].gallery[activeThumb] || MEDIA_CATALOG.products[0].imageUrl}
                  alt={MEDIA_CATALOG.products[0].name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  Hover to Zoom · 4K Assets
                </div>
              </div>
            </div>

            {/* Buy Box Column (Sticky on scroll) */}
            <div
              style={{
                padding: 'var(--ts-space-lg)',
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                boxShadow: 'var(--ts-shadow)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ts-color-primary)', textTransform: 'uppercase' }}>
                    Hardware Spec · APX-9942
                  </span>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                    ● In Stock (Only 4 left)
                  </span>
                </div>
                <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.2)', fontWeight: 800, margin: '0 0 6px 0', lineHeight: 1.2 }}>
                  Apex Precision Studio Monitor
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                  <span style={{ color: '#f59e0b', fontWeight: 800 }}>★★★★★</span>
                  <span style={{ fontWeight: 700 }}>4.9</span>
                  <span style={{ opacity: 0.6 }}>(184 verified reviews)</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', borderTop: '1px solid var(--ts-color-border)', paddingTop: '12px' }}>
                <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 900, fontSize: '28px' }}>
                  $349.00
                </span>
                <span style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '16px' }}>
                  $399.00
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                  Save $50 (12%)
                </span>
              </div>

              {/* Variant Selector: Color */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Color Finish: <span style={{ color: 'var(--ts-color-primary)' }}>{selectedColor}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { name: 'Onyx', hex: '#0f172a' },
                    { name: 'Lunar Silver', hex: '#94a3b8' },
                    { name: 'Deep Cyan', hex: '#0284c7' },
                  ].map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: selectedColor === c.name ? '3px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                        cursor: 'pointer',
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Variant Selector: Size */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Display Size:
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['27"', '32"', '40" Ultrawide'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--ts-radius)',
                        border: selectedSize === s ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                        backgroundColor: selectedSize === s ? 'rgba(2, 132, 199, 0.12)' : 'var(--ts-color-background)',
                        color: selectedSize === s ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Add to Cart CTAs */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--ts-color-border)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ width: '32px', height: '38px', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 10px', fontSize: '13px', fontWeight: 700 }}>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ width: '32px', height: '38px', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--ts-color-primary)',
                    color: primaryTextColor,
                    border: 'none',
                    borderRadius: 'var(--ts-radius)',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: 'var(--ts-shadow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <AppIcon name="shoppingCart" size={15} />
                  <span>Add to Cart — ${(349 * quantity).toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabbed Technical Specifications (Active in two-column-tabs layout) */}
        {layout === 'two-column-tabs' && (
          <div
            style={{
              padding: 'var(--ts-space-lg)',
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '16px', margin: '0 0 12px 0' }}>
              Full Engineering Specifications
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '13px' }}>
              <div><strong>Resolution:</strong> 3840 x 2160 (4K UHD)</div>
              <div><strong>Color Gamut:</strong> 99% DCI-P3, 100% sRGB</div>
              <div><strong>Refresh Rate:</strong> 144Hz Variable VRR</div>
              <div><strong>Ports:</strong> 2x Thunderbolt 4, 1x DP 1.4</div>
              <div><strong>Power Delivery:</strong> 96W USB-C Host Charging</div>
              <div><strong>Warranty:</strong> 3-Year Advanced Exchange</div>
            </div>
          </div>
        )}

        {/* Customer Reviews & Discussion Block */}
        <DiscussionReviewBlock
          mode="reviews"
          title="Verified Owner Feedback"
          averageRating={4.9}
          totalCount={184}
        />
      </main>
    </div>
  );
};
