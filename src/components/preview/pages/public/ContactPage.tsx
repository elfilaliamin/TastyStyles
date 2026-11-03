import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { Send, Mail, MapPin, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

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
        gap: 'var(--ts-space-lg)',
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * var(--ts-scale))',
            fontWeight: 800,
            margin: 0,
          }}
        >
          Get in Touch
        </h1>
        <p style={{ margin: '4px 0 0 0', fontSize: 'var(--ts-base-size)', opacity: 0.8 }}>
          Have a question about integrating design system specs with your AI coding agents? We'd love to assist.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--ts-space-lg)',
        }}
      >
        {/* Contact Form */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-md)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--ts-space-sm)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600 }}>First Name</label>
              <input
                type="text"
                placeholder="Jane"
                style={{
                  backgroundColor: 'var(--ts-color-background)',
                  color: 'var(--ts-color-text)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  padding: 'var(--ts-space-sm)',
                  fontSize: 'calc(var(--ts-base-size) * 0.85)',
                  outline: 'none',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600 }}>Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                style={{
                  backgroundColor: 'var(--ts-color-background)',
                  color: 'var(--ts-color-text)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  padding: 'var(--ts-space-sm)',
                  fontSize: 'calc(var(--ts-base-size) * 0.85)',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600 }}>Email Address</label>
            <input
              type="email"
              placeholder="jane.doe@company.com"
              style={{
                backgroundColor: 'var(--ts-color-background)',
                color: 'var(--ts-color-text)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-sm)',
                fontSize: 'calc(var(--ts-base-size) * 0.85)',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600 }}>Inquiry Type</label>
            <select
              style={{
                backgroundColor: 'var(--ts-color-background)',
                color: 'var(--ts-color-text)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-sm)',
                fontSize: 'calc(var(--ts-base-size) * 0.85)',
                outline: 'none',
              }}
            >
              <option>Technical Question</option>
              <option>Enterprise Integration</option>
              <option>Feature Request</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600 }}>Message</label>
            <textarea
              rows={4}
              placeholder="How can we help your team?"
              style={{
                backgroundColor: 'var(--ts-color-background)',
                color: 'var(--ts-color-text)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-sm)',
                fontSize: 'calc(var(--ts-base-size) * 0.85)',
                outline: 'none',
                resize: 'vertical',
              }}
            />
          </div>

          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              fontWeight: 600,
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <Send style={{ width: '15px', height: '15px' }} />
            <span>Send Message</span>
          </button>
        </div>

        {/* Sidebar Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
          {[
            { icon: <Mail style={{ width: '20px', height: '20px', color: 'var(--ts-color-accent)' }} />, title: 'Email Support', detail: 'support@apexdesign.system', note: 'Average response under 2 hours.' },
            { icon: <MessageSquare style={{ width: '20px', height: '20px', color: 'var(--ts-color-primary)' }} />, title: 'Live Chat', detail: 'Available Mon–Fri, 9am–6pm EST', note: 'Direct line to systems architects.' },
            { icon: <MapPin style={{ width: '20px', height: '20px', color: 'var(--ts-color-secondary)' }} />, title: 'Headquarters', detail: '450 Mission St, Suite 800', note: 'San Francisco, CA 94105' },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-md)',
                display: 'flex',
                gap: 'var(--ts-space-sm)',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ padding: '8px', backgroundColor: 'var(--ts-color-background)', borderRadius: 'var(--ts-radius)' }}>
                {card.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.9)' }}>{card.title}</div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', marginTop: '2px' }}>{card.detail}</div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7, marginTop: '2px' }}>{card.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

