import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import {
  CreditCard,
  Download,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const BillingPage: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

  const invoices = [
    { id: 'INV-2026-011', date: 'Nov 1, 2026', amount: '$49.00', status: 'Paid', plan: 'Enterprise Pro' },
    { id: 'INV-2026-010', date: 'Oct 1, 2026', amount: '$49.00', status: 'Paid', plan: 'Enterprise Pro' },
    { id: 'INV-2026-009', date: 'Sep 1, 2026', amount: '$49.00', status: 'Paid', plan: 'Enterprise Pro' },
    { id: 'INV-2026-008', date: 'Aug 1, 2026', amount: '$29.00', status: 'Paid', plan: 'Standard Team' },
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        minHeight: '100%',
        padding: 'var(--ts-space-lg)',
        maxWidth: '860px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-md)',
      }}
    >
      {/* Header */}
      <div>
        <h1
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
            fontWeight: 800,
            margin: 0,
          }}
        >
          Billing & Subscription
        </h1>
        <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.75 }}>
          Manage your subscription tier, billing address, and download historical invoices.
        </p>
      </div>

      {/* Current Plan & Payment Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--ts-space-md)' }}>
        {/* Plan Card */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-md)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--ts-space-md)',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * 1.1)',
                  fontWeight: 700,
                }}
              >
                Enterprise Pro
              </span>
              <span
                style={{
                  fontSize: 'calc(var(--ts-base-size) * 0.72)',
                  fontWeight: 700,
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                }}
              >
                Active
              </span>
            </div>

            <div style={{ marginTop: 'var(--ts-space-xs)' }}>
              <span
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.3)',
                  fontWeight: 800,
                }}
              >
                $49
              </span>
              <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.7 }}> / month</span>
            </div>
            <p style={{ fontSize: 'calc(var(--ts-base-size) * 0.78)', opacity: 0.7, margin: '4px 0 0 0' }}>
              Next billing date: <strong>December 1, 2026</strong> via Visa ending in 4242.
            </p>

            {/* Quota Progress */}
            <div style={{ marginTop: 'var(--ts-space-sm)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'calc(var(--ts-base-size) * 0.75)' }}>
                <span>Token Specifications</span>
                <span style={{ fontWeight: 600 }}>18 / 25 Used</span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: 'var(--ts-color-background)',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  border: '1px solid var(--ts-color-border)',
                }}
              >
                <div
                  style={{
                    width: '72%',
                    height: '100%',
                    backgroundColor: 'var(--ts-color-primary)',
                    borderRadius: '9999px',
                  }}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <span>Change Plan</span>
            <ArrowUpRight style={{ width: '14px', height: '14px' }} />
          </button>
        </div>

        {/* Payment Method Card */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-md)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--ts-space-md)',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * 1.1)',
                fontWeight: 700,
              }}
            >
              Payment Method
            </span>

            <div
              style={{
                marginTop: 'var(--ts-space-sm)',
                padding: 'var(--ts-space-sm)',
                borderRadius: 'var(--ts-radius)',
                backgroundColor: 'var(--ts-color-background)',
                border: '1px solid var(--ts-color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ts-space-sm)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '28px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CreditCard style={{ width: '18px', height: '18px', color: 'var(--ts-color-primary)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
                  Visa ending in 4242
                </div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.7 }}>
                  Expires 12/2028 &bull; Default
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: 'var(--ts-space-sm)',
                fontSize: 'calc(var(--ts-base-size) * 0.75)',
                opacity: 0.75,
              }}
            >
              <ShieldCheck style={{ width: '14px', height: '14px', color: '#10b981' }} />
              <span>PCI-DSS Level 1 Encrypted Vault</span>
            </div>
          </div>

          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-background)',
              color: 'var(--ts-color-text)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Update Payment Method
          </button>
        </div>
      </div>

      {/* Past Invoices Table */}
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          boxShadow: 'var(--ts-shadow)',
          padding: 'var(--ts-space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-sm)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
            fontWeight: 700,
            margin: 0,
          }}
        >
          Billing History & Receipts
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 'calc(var(--ts-base-size) * 0.82)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ts-color-border)', opacity: 0.7 }}>
                <th style={{ padding: 'var(--ts-space-xs)' }}>Invoice ID</th>
                <th style={{ padding: 'var(--ts-space-xs)' }}>Billing Date</th>
                <th style={{ padding: 'var(--ts-space-xs)' }}>Plan Tier</th>
                <th style={{ padding: 'var(--ts-space-xs)' }}>Amount</th>
                <th style={{ padding: 'var(--ts-space-xs)' }}>Status</th>
                <th style={{ padding: 'var(--ts-space-xs)', textAlign: 'right' }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: '1px solid var(--ts-color-border)' }}>
                  <td style={{ padding: 'var(--ts-space-xs)', fontWeight: 600 }}>{inv.id}</td>
                  <td style={{ padding: 'var(--ts-space-xs)', opacity: 0.8 }}>{inv.date}</td>
                  <td style={{ padding: 'var(--ts-space-xs)' }}>{inv.plan}</td>
                  <td style={{ padding: 'var(--ts-space-xs)', fontWeight: 700 }}>{inv.amount}</td>
                  <td style={{ padding: 'var(--ts-space-xs)' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '1px 6px',
                        borderRadius: '9999px',
                        fontSize: 'calc(var(--ts-base-size) * 0.72)',
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        color: '#10b981',
                        fontWeight: 600,
                      }}
                    >
                      <CheckCircle2 style={{ width: '10px', height: '10px' }} />
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: 'var(--ts-space-xs)', textAlign: 'right' }}>
                    <button
                      type="button"
                      aria-label="Download receipt"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--ts-color-primary)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: 'calc(var(--ts-base-size) * 0.78)',
                        fontWeight: 600,
                      }}
                    >
                      <Download style={{ width: '13px', height: '13px' }} />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
