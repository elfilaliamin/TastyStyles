import React from 'react';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { ProgressMeterBlock } from '../../../blocks/ProgressMeterBlock';
import { CheckoutInvoiceBlock } from '../../../blocks/CheckoutInvoiceBlock';
import { MediaHeroBlock } from '../../../blocks/MediaHeroBlock';

export const CharityPage: React.FC = () => {

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

      <main style={{ padding: 'var(--ts-space-lg)', maxWidth: '1080px', width: '100%', margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
        {/* Cause Headline & Media */}
        <MediaHeroBlock
          variant="editorial-banner"
          badge="Verified 501(c)(3) Campaign · Urgent Appeal"
          title="Clean Water & Solar Infrastructure for 50,000 Families"
          subtitle="Direct funding for solar-powered water purification wells across drought-affected community clinics."
        />

        {/* 2-Column Grid: Thermometer + Donation Checkout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'var(--ts-space-lg)', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            <ProgressMeterBlock
              label="Fundraising Goal Thermometer"
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
                  <span>Direct Well Construction & Hardware:</span>
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
      </main>
    </div>
  );
};
