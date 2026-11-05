import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { CheckoutInvoiceBlock } from '../../../blocks/CheckoutInvoiceBlock';
import { AppIcon } from '../../../common/AppIcon';

export const CheckoutPage: React.FC = () => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.checkout ?? 'slide-over-cart';

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

      <main style={{ padding: 'var(--ts-space-lg)', maxWidth: '1040px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        {/* Title & Trust Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--ts-space-lg)', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.2)', fontWeight: 800, margin: 0 }}>
              Order Checkout & Settlement
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', opacity: 0.7 }}>
              Encrypted 256-bit transactional checkout with instant fulfillment.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: 600 }}>
              <AppIcon name="shieldCheck" size={15} />
              <span>SOC2 & PCI-DSS Level 1</span>
            </span>
          </div>
        </div>

        {/* Layout Switch: Slide-Over Cart vs 2-Column Express vs Accordion Stepper */}
        {layout === 'slide-over-cart' ? (
          /* Slide-Over Cart Drawer Layout */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'var(--ts-space-lg)', alignItems: 'flex-start' }}>
            {/* Left Dimmed Store Background Preview */}
            <div
              style={{
                padding: 'var(--ts-space-xl)',
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                opacity: 0.6,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ts-color-primary)' }}>
                Store View Behind Cart
              </div>
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '20px', fontWeight: 800, margin: 0 }}>
                Apex Design System Spec v2
              </h2>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5 }}>
                Click anywhere outside or proceed directly with the slide-over cart drawer on the right.
              </p>
            </div>

            {/* Right Slide-Over Cart Sheet */}
            <div
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '2px solid var(--ts-color-primary)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
                padding: 'var(--ts-space-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ts-color-border)', paddingBottom: '10px' }}>
                <span style={{ fontWeight: 800, fontSize: '15px' }}>Your Cart (2 items)</span>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>● Ready to checkout</span>
              </div>

              <CheckoutInvoiceBlock
                variant="cart"
                items={[
                  { title: 'Apex Studio Monitor 27"', subtitle: 'Hardware SKU APX-9942', price: 349, quantity: 1 },
                  { title: 'ErgoWave Wireless Keypad', subtitle: 'Midnight Black', price: 89, quantity: 1 },
                ]}
                fees={[
                  { label: 'Standard Express Shipping', amount: 0.00 },
                  { label: 'State & Local Sales Tax', amount: 32.85 },
                ]}
              />
            </div>
          </div>
        ) : (
          /* Two-Column Express & Accordion Stepper */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'var(--ts-space-lg)', alignItems: 'flex-start' }}>
            {/* Left Column: Form Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
              {/* Step 1: Shipping Address */}
              <div
                style={{
                  padding: 'var(--ts-space-lg)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  boxShadow: 'var(--ts-shadow)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--ts-color-primary)',
                      color: primaryTextColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '11px',
                    }}
                  >
                    1
                  </span>
                  <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '14px', margin: 0 }}>
                    Shipping & Recipient Details
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
                  <input type="text" placeholder="First Name" defaultValue="Alex" style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 'var(--ts-radius-surface, 8px)', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)', fontSize: '12px' }} />
                  <input type="text" placeholder="Last Name" defaultValue="Rivers" style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 'var(--ts-radius-surface, 8px)', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)', fontSize: '12px' }} />
                  <input type="text" placeholder="Street Address" defaultValue="548 Market St, Suite 102" style={{ gridColumn: 'span 2', width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 'var(--ts-radius-surface, 8px)', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)', fontSize: '12px' }} />
                  <input type="text" placeholder="City" defaultValue="San Francisco" style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 'var(--ts-radius-surface, 8px)', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)', fontSize: '12px' }} />
                  <input type="text" placeholder="Postal Code" defaultValue="94104" style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 'var(--ts-radius-surface, 8px)', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)', fontSize: '12px' }} />
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div
                style={{
                  padding: 'var(--ts-space-lg)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  boxShadow: 'var(--ts-shadow)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--ts-color-primary)',
                      color: primaryTextColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '11px',
                    }}
                  >
                    2
                  </span>
                  <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '14px', margin: 0 }}>
                    Payment Method
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" style={{ flex: 1, padding: '8px', borderRadius: 'var(--ts-radius)', border: '2px solid var(--ts-color-primary)', backgroundColor: 'rgba(2, 132, 199, 0.1)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                      Credit Card
                    </button>
                    <button type="button" style={{ flex: 1, padding: '8px', borderRadius: 'var(--ts-radius)', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)', fontSize: '12px', cursor: 'pointer' }}>
                      Apple Pay / GPay
                    </button>
                  </div>
                  <input type="text" placeholder="Card Number" defaultValue="•••• •••• •••• 4242" style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 'var(--ts-radius-surface, 8px)', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)', fontSize: '12px' }} />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" placeholder="MM / YY" defaultValue="12/28" style={{ width: '50%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 'var(--ts-radius-surface, 8px)', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)', fontSize: '12px' }} />
                    <input type="text" placeholder="CVC" defaultValue="884" style={{ width: '50%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 'var(--ts-radius-surface, 8px)', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)', fontSize: '12px' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Checkout Invoice Block */}
            <CheckoutInvoiceBlock
              variant="cart"
              items={[
                { title: 'Apex Studio Monitor 27"', subtitle: 'Hardware SKU APX-9942', price: 349, quantity: 1 },
                { title: 'ErgoWave Wireless Keypad', subtitle: 'Midnight Black', price: 89, quantity: 1 },
              ]}
              fees={[
                { label: 'Standard Express Shipping', amount: 0.00 },
                { label: 'State & Local Sales Tax', amount: 32.85 },
              ]}
            />
          </div>
        )}
      </main>
    </div>
  );
};
