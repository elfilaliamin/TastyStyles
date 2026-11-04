import React, { useState } from 'react';
import { useDesign } from '../../context/DesignContext';
import { getBestContrastingColor } from '../../lib/contrast';
import { AppIcon } from '../common/AppIcon';

export interface CheckoutLineItem {
  title: string;
  subtitle?: string;
  price: number;
  quantity?: number;
  thumbnail?: string;
}

export interface CheckoutInvoiceBlockProps {
  variant?: 'cart' | 'subscription' | 'donation' | 'booking-deposit' | 'escrow';
  items?: CheckoutLineItem[];
  fees?: Array<{ label: string; amount: number }>;
  discountAmount?: number;
  customAmountSupported?: boolean;
  onComplete?: () => void;
  ctaText?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CheckoutInvoiceBlock: React.FC<CheckoutInvoiceBlockProps> = ({
  variant = 'cart',
  items = [
    { title: 'Apex Design System License', subtitle: 'Commercial Pro Tier', price: 149, quantity: 1 },
    { title: 'Figma DTCG Token Plugin', subtitle: 'Annual Maintenance', price: 29, quantity: 1 },
  ],
  fees = [
    { label: 'Platform Processing Fee', amount: 4.50 },
    { label: 'Estimated Tax', amount: 12.20 },
  ],
  discountAmount = 0,
    onComplete,
  ctaText,
  className = '',
  style = {},
}) => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const [selectedDonation, setSelectedDonation] = useState<number>(50);
  const [customDonation, setCustomDonation] = useState<string>('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = variant === 'donation'
    ? (customDonation ? parseFloat(customDonation) || 0 : selectedDonation)
    : items.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0);

  const totalFees = fees.reduce((acc, fee) => acc + fee.amount, 0);
  const activeDiscount = promoApplied ? 20 : discountAmount;
  const grandTotal = Math.max(subtotal + totalFees - activeDiscount, 0);

  const defaultCta = variant === 'donation'
    ? `Complete $${grandTotal.toFixed(2)} Donation`
    : variant === 'booking-deposit'
    ? `Pay Deposit ($${grandTotal.toFixed(2)}) & Confirm`
    : `Pay $${grandTotal.toFixed(2)} Securely`;

  return (
    <div
      className={className}
      style={{
        padding: 'var(--ts-space-lg)',
        backgroundColor: 'var(--ts-color-surface)',
        border: '1px solid var(--ts-color-border)',
        borderRadius: 'var(--ts-radius-surface, 16px)',
        boxShadow: 'var(--ts-shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-md)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--ts-color-border)', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AppIcon name="shoppingCart" size={16} style={{ color: 'var(--ts-color-primary)' }} />
          <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '15px', margin: 0 }}>
            {variant === 'donation' ? 'Tax-Deductible Gift' : variant === 'booking-deposit' ? 'Reservation Deposit' : 'Order Summary'}
          </h3>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AppIcon name="shieldCheck" size={13} />
          <span>SSL Secured</span>
        </span>
      </div>

      {/* Donation Presets */}
      {variant === 'donation' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Select Giving Tier:</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            {[25, 50, 100, 250].map((tier) => {
              const isSelected = selectedDonation === tier && !customDonation;
              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => {
                    setSelectedDonation(tier);
                    setCustomDonation('');
                  }}
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--ts-radius)',
                    border: isSelected ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                    backgroundColor: isSelected ? 'rgba(2, 132, 199, 0.12)' : 'var(--ts-color-background)',
                    color: isSelected ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  ${tier}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Items List */}
      {variant !== 'donation' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '13px' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{item.title}</div>
                {item.subtitle && <div style={{ fontSize: '11px', opacity: 0.6 }}>{item.subtitle}</div>}
                {item.quantity && item.quantity > 1 && (
                  <span style={{ fontSize: '11px', opacity: 0.7 }}>Qty: {item.quantity}</span>
                )}
              </div>
              <div style={{ fontWeight: 800, fontFamily: 'var(--ts-font-heading)' }}>
                ${(item.price * (item.quantity ?? 1)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Promo Code Input */}
      {variant !== 'donation' && (
        <div style={{ display: 'flex', gap: '6px' }}>
          <input
            type="text"
            placeholder="Promo or discount code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            style={{
              flex: 1,
              padding: '6px 10px',
              borderRadius: 'var(--ts-radius)',
              border: '1px solid var(--ts-color-border)',
              backgroundColor: 'var(--ts-color-background)',
              color: 'var(--ts-color-text)',
              fontSize: '12px',
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (promoCode.trim()) setPromoApplied(true);
            }}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--ts-radius)',
              border: '1px solid var(--ts-color-border)',
              backgroundColor: 'var(--ts-color-background)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Apply
          </button>
        </div>
      )}

      {/* Financial Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--ts-color-border)', paddingTop: '10px', fontSize: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8 }}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {fees.map((fee, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7 }}>
            <span>{fee.label}</span>
            <span>${fee.amount.toFixed(2)}</span>
          </div>
        ))}
        {promoApplied && (
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600 }}>
            <span>Promo Code Applied</span>
            <span>-${activeDiscount.toFixed(2)}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '16px', fontFamily: 'var(--ts-font-heading)', borderTop: '1px solid var(--ts-color-border)', paddingTop: '8px', marginTop: '4px' }}>
          <span>Total Due</span>
          <span style={{ color: 'var(--ts-color-primary)' }}>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Main Payment CTA */}
      <button
        type="button"
        onClick={onComplete}
        style={{
          width: '100%',
          backgroundColor: 'var(--ts-color-primary)',
          color: primaryTextColor,
          border: 'none',
          borderRadius: 'var(--ts-radius)',
          padding: '10px',
          fontWeight: 800,
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: 'var(--ts-shadow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <AppIcon name="shieldCheck" size={16} />
        <span>{ctaText ?? defaultCta}</span>
      </button>
    </div>
  );
};
