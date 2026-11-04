import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { ProgressMeterBlock } from '../../../blocks/ProgressMeterBlock';
import { CheckoutInvoiceBlock } from '../../../blocks/CheckoutInvoiceBlock';
import { MediaHeroBlock } from '../../../blocks/MediaHeroBlock';
import { AppIcon } from '../../../common/AppIcon';

export const CharityPage: React.FC = () => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.charity ?? 'hero-impact-thermometer';

  const [impactAmount, setImpactAmount] = useState<number>(100);

  const donors = [
    { name: 'Sarah Lin', amount: '$250', time: '12m ago', note: 'Proud to support solar water in rural clinics!' },
    { name: 'Anonymous Benefactor', amount: '$1,000', time: '45m ago', note: 'Matching grant contribution.' },
    { name: 'Apex Design Collective', amount: '$500', time: '2h ago', note: 'Donation from our team design sprint.' },
    { name: 'Dr. Michael K.', amount: '$75', time: '3h ago', note: 'Every family deserves clean water.' },
    { name: 'Elena Rostova', amount: '$150', time: '5h ago', note: 'Keep up the vital transparent work!' },
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

      <main
        style={{
          padding: 'var(--ts-space-lg)',
          maxWidth: '1080px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-lg)',
        }}
      >
        {/* Cause Headline & Media */}
        <MediaHeroBlock
          variant="editorial-banner"
          badge="Verified 501(c)(3) Public Charity · Urgent Climate Action"
          title="Clean Water & Solar Infrastructure for 50,000 Families"
          subtitle="Direct funding for solar-powered water purification wells across drought-affected community healthcare clinics."
        />

        {/* 1. HERO IMPACT THERMOMETER LAYOUT */}
        {layout === 'hero-impact-thermometer' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'var(--ts-space-lg)',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
              <ProgressMeterBlock
                label="Campaign Goal Thermometer"
                currentValue={78400}
                targetValue={100000}
                unitPrefix="$"
                subtitle="8 days remaining · 1,420 community donors"
                badge="78% Funded"
                variant="thermometer"
              />

              <div
                style={{
                  padding: 'var(--ts-space-lg)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  boxShadow: 'var(--ts-shadow)',
                  fontSize: '13px',
                  lineHeight: 1.6,
                }}
              >
                <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '15px', margin: '0 0 8px 0' }}>
                  Audited Financial Transparency
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', opacity: 0.85 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Direct Solar Hardware & Well Drilling:</span>
                    <strong>88%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Local Engineering Training & Maintenance:</span>
                    <strong>8%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Platform & Payment Processing:</span>
                    <strong>4%</strong>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <CheckoutInvoiceBlock
                variant="donation"
                ctaText="Complete My Contribution"
              />
            </div>
          </div>
        )}

        {/* 2. SPLIT CAUSE CALCULATOR LAYOUT */}
        {layout === 'split-cause-calculator' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'var(--ts-space-lg)',
              alignItems: 'center',
            }}
          >
            {/* Left: Interactive Impact Outcome Calculator */}
            <div
              style={{
                padding: 'var(--ts-space-lg)',
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ts-space-md)',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(2, 132, 199, 0.1)',
                    color: 'var(--ts-color-primary)',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  CALCULATE YOUR IMPACT
                </span>
              </div>

              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '18px', margin: 0, fontWeight: 800 }}>
                See Exactly What Your Donation Accomplishes
              </h2>

              {/* Amount Selection Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[25, 50, 100, 250, 500].map((amt) => {
                  const isSelected = impactAmount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setImpactAmount(amt)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 'var(--ts-radius)',
                        border: isSelected ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                        backgroundColor: isSelected ? 'var(--ts-color-primary)' : 'var(--ts-color-background)',
                        color: isSelected ? primaryTextColor : 'var(--ts-color-text)',
                        fontWeight: 700,
                        fontSize: '14px',
                        minHeight: '44px',
                        cursor: 'pointer',
                      }}
                    >
                      ${amt}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Outcome Banner */}
              <div
                style={{
                  padding: 'var(--ts-space-md)',
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-success, #16a34a)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <AppIcon name="check" size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '14px' }}>
                    ${impactAmount} directly delivers {Math.floor(impactAmount / 25) * 6} months of clean solar water
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>
                    Provides verified sterile drinking water for {Math.floor(impactAmount / 25) * 2} clinical hospital beds.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Checkout Pledge Card */}
            <div>
              <CheckoutInvoiceBlock
                variant="donation"
                ctaText={`Pledge $${impactAmount} Tax-Deductible`}
              />
            </div>
          </div>
        )}

        {/* 3. DONOR WALL TRANSPARENCY LAYOUT */}
        {layout === 'donor-wall-transparency' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
            {/* Top Audited Trust Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: 'var(--ts-space-md)',
              }}
            >
              <div
                style={{
                  padding: 'var(--ts-space-md)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <AppIcon name="shield-check" size={24} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '14px' }}>GuideStar Platinum</div>
                  <div style={{ fontSize: '11px', opacity: 0.6 }}>Highest transparency rating</div>
                </div>
              </div>

              <div
                style={{
                  padding: 'var(--ts-space-md)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <AppIcon name="award" size={24} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '14px' }}>Charity Navigator 100%</div>
                  <div style={{ fontSize: '11px', opacity: 0.6 }}>4 out of 4 star rating</div>
                </div>
              </div>

              <div
                style={{
                  padding: 'var(--ts-space-md)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <AppIcon name="file-text" size={24} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '14px' }}>EIN: 84-1928472</div>
                  <div style={{ fontSize: '11px', opacity: 0.6 }}>501(c)(3) tax deductible</div>
                </div>
              </div>
            </div>

            {/* Split: Donor Wall + Fast Pledge */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: 'var(--ts-space-lg)',
                alignItems: 'flex-start',
              }}
            >
              {/* Recent Community Donors Wall */}
              <div
                style={{
                  padding: 'var(--ts-space-lg)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--ts-space-md)',
                  boxShadow: 'var(--ts-shadow)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '16px', margin: 0, fontWeight: 800 }}>
                    Recent Donor Wall
                  </h3>
                  <span style={{ fontSize: '12px', opacity: 0.7 }}>1,420 total donors</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
                  {donors.map((d, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 12px',
                        backgroundColor: 'var(--ts-color-background)',
                        border: '1px solid var(--ts-color-border)',
                        borderRadius: 'var(--ts-radius)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '13px' }}>{d.name}</span>
                        <span style={{ fontWeight: 800, color: 'var(--color-success, #16a34a)', fontSize: '13px' }}>{d.amount}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, fontStyle: 'italic' }}>
                        "{d.note}"
                      </p>
                      <span style={{ fontSize: '10px', opacity: 0.5, marginTop: '2px' }}>{d.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fast Pledge Form */}
              <div>
                <CheckoutInvoiceBlock
                  variant="donation"
                  ctaText="Add My Name to the Wall"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
