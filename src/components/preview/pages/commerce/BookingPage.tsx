import React, { useState } from 'react';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { CalendarAvailabilityBlock } from '../../../blocks/CalendarAvailabilityBlock';
import { CheckoutInvoiceBlock } from '../../../blocks/CheckoutInvoiceBlock';
import { IdentityBadgeBlock } from '../../../blocks/IdentityBadgeBlock';

export const BookingPage: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>('10:00 AM');
  const [selectedDate, setSelectedDate] = useState<number>(16);

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'var(--ts-space-lg)', alignItems: 'flex-start' }}>
          {/* Left Column: Staff Provider Badge & Calendar Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            <IdentityBadgeBlock
              name="Dr. Sarah Jenkins, MD"
              title="Senior Clinical Aesthetician & Dermatologist"
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
                  subtitle: `Nov ${selectedDate}, 2026 · ${selectedSlot ?? 'Select a slot'}`,
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
