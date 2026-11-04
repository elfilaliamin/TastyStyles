import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { CalendarAvailabilityBlock } from '../../../blocks/CalendarAvailabilityBlock';
import { CheckoutInvoiceBlock } from '../../../blocks/CheckoutInvoiceBlock';
import { IdentityBadgeBlock } from '../../../blocks/IdentityBadgeBlock';

export const BookingPage: React.FC = () => {
  const { state } = useDesign();
  const layout = state.pageLayouts?.booking ?? 'split-calendar-slots';
  const [selectedSlot, setSelectedSlot] = useState<string | null>('10:00 AM');
  const [selectedDate, setSelectedDate] = useState<number>(16);
  const [selectedStaff, setSelectedStaff] = useState('Dr. Sarah Jenkins, MD');

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

      <main style={{ padding: 'var(--ts-space-lg)', maxWidth: '1100px', width: '100%', margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.15)', fontWeight: 800, margin: 0 }}>
            Schedule Consultation Session
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', opacity: 0.7 }}>
            Choose a convenient date and time slot with instant calendar invite confirmation.
          </p>
        </div>

        {/* Layout: Stepped Service Wizard vs Split Calendar Slots */}
        {layout === 'stepped-service-wizard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)', marginBottom: 'var(--ts-space-md)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.7 }}>
              Select Practitioner Specialist:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 'var(--ts-space-md)' }}>
              {[
                { name: 'Dr. Sarah Jenkins, MD', role: 'Clinical Dermatologist', rating: 4.96, fee: '$150' },
                { name: 'Dr. Marcus Vance, PhD', role: 'Neuro-Ergonomics Specialist', rating: 4.92, fee: '$175' },
                { name: 'Elena Rostova, PT', role: 'Biomechanics Director', rating: 4.98, fee: '$160' },
              ].map((staff) => (
                <div
                  key={staff.name}
                  onClick={() => setSelectedStaff(staff.name)}
                  style={{
                    padding: 'var(--ts-space-md)',
                    backgroundColor: 'var(--ts-color-surface)',
                    border: selectedStaff === staff.name ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-surface, 16px)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '13px' }}>{staff.name}</span>
                    <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700 }}>★ {staff.rating}</span>
                  </div>
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>{staff.role}</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ts-color-primary)', marginTop: '4px' }}>{staff.fee} / session</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'var(--ts-space-lg)', alignItems: 'flex-start' }}>
          {/* Left Column: Staff Provider Badge & Calendar Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            <IdentityBadgeBlock
              name={selectedStaff}
              title="Senior Clinical Specialist & Partner"
              rating={4.96}
              reviewCount={128}
              verified
              statusText="Available for Booking"
              badge="Top Specialist"
            />

            <CalendarAvailabilityBlock
              mode="time-slots"
              onSelect={(d, slot) => {
                setSelectedDate(d);
                if (slot) setSelectedSlot(slot);
              }}
            />
          </div>

          {/* Right Column: Deposit Checkout Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            <CheckoutInvoiceBlock
              variant="booking-deposit"
              items={[
                {
                  title: 'Comprehensive Diagnostic Consultation',
                  subtitle: `Nov ${selectedDate}, 2026 · ${selectedSlot ?? 'Select a slot'} with ${selectedStaff.split(',')[0]}`,
                  price: 150,
                  quantity: 1,
                },
              ]}
              fees={[
                { label: 'Facility Reservation Fee', amount: 15.00 },
              ]}
              ctaText={`Confirm & Hold Nov ${selectedDate}`}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
