import React, { useState } from 'react';
import { AppIcon } from '../../common/AppIcon';

export const FormsPreview: React.FC = () => {
  const [toggleActive, setToggleActive] = useState(true);
  const [checkedBox, setCheckedBox] = useState(true);
  const [radioSelected, setRadioSelected] = useState('option-1');

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-surface)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        borderRadius: 'var(--ts-radius-surface, 16px)',
        border: '1px solid var(--ts-color-border)',
        boxShadow: 'var(--ts-shadow)',
        padding: 'var(--ts-space-lg)',
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-lg)',
        boxSizing: 'border-box',
      }}
    >
      {/* Title */}
      <div>
        <h2
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
            fontWeight: 700,
            margin: 0,
          }}
        >
          Form Controls & Inputs
        </h2>
        <p style={{ margin: '4px 0 0 0', fontSize: 'var(--ts-base-size)', opacity: 0.8 }}>
          Accessible text fields, search bars, selectors, switches, and validation feedback.
        </p>
      </div>

      {/* Grid of Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 'var(--ts-space-md)' }}>
        {/* Standard Text Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xs)' }}>
          <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', fontWeight: 600 }}>
            Full Name
          </label>
          <input
            type="text"
            defaultValue="Alex Rivers"
            style={{
              backgroundColor: 'var(--ts-color-background)',
              color: 'var(--ts-color-text)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              outline: 'none',
              fontFamily: 'var(--ts-font-body)',
            }}
          />
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.65 }}>
            Publicly displayed in team workspace.
          </span>
        </div>

        {/* Search Input with Icon */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xs)' }}>
          <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', fontWeight: 600 }}>
            Search Repository
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <AppIcon
              name="search"
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                opacity: 0.6,
                color: 'var(--ts-color-text)',
              }}
            />
            <input
              type="text"
              placeholder="Search components, tokens..."
              style={{
                width: '100%',
                backgroundColor: 'var(--ts-color-background)',
                color: 'var(--ts-color-text)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-sm) var(--ts-space-md) var(--ts-space-sm) 36px',
                fontSize: 'calc(var(--ts-base-size) * 0.9)',
                outline: 'none',
                fontFamily: 'var(--ts-font-body)',
              }}
            />
          </div>
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.65 }}>
            Press ⌘K for command palette.
          </span>
        </div>

        {/* Select Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xs)' }}>
          <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', fontWeight: 600 }}>
            Deployment Environment
          </label>
          <select
            defaultValue="production"
            style={{
              backgroundColor: 'var(--ts-color-background)',
              color: 'var(--ts-color-text)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              outline: 'none',
              fontFamily: 'var(--ts-font-body)',
              cursor: 'pointer',
            }}
          >
            <option value="production">Production (Global Edge)</option>
            <option value="staging">Staging (Pre-release)</option>
            <option value="preview">Feature Branch Preview</option>
          </select>
        </div>

        {/* Input with Validation Error */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xs)' }}>
          <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', fontWeight: 600, color: 'var(--color-danger, #ef4444)' }}>
            Work Email Address
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="email"
              defaultValue="invalid-email-format"
              style={{
                width: '100%',
                backgroundColor: 'var(--ts-color-background)',
                color: 'var(--ts-color-text)',
                border: '1px solid var(--color-danger, #ef4444)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-sm) 36px var(--ts-space-sm) var(--ts-space-md)',
                fontSize: 'calc(var(--ts-base-size) * 0.9)',
                outline: 'none',
                fontFamily: 'var(--ts-font-body)',
                boxSizing: 'border-box',
              }}
            />
            <AppIcon
              name="alertCircle"
              size={16}
              style={{
                position: 'absolute',
                right: '12px',
                color: 'var(--color-danger, #ef4444)',
              }}
            />
          </div>
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', color: 'var(--color-danger, #ef4444)' }}>
            Please enter a valid RFC-compliant email address.
          </span>
        </div>
      </div>

      {/* Textarea */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xs)' }}>
        <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', fontWeight: 600 }}>
          System Specification Description
        </label>
        <textarea
          rows={3}
          defaultValue="A unified design token architecture guaranteeing single-source consistency across Web, Mobile, and CLI autonomous coders."
          style={{
            backgroundColor: 'var(--ts-color-background)',
            color: 'var(--ts-color-text)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 12px)',
            padding: 'var(--ts-space-sm) var(--ts-space-md)',
            fontSize: 'calc(var(--ts-base-size) * 0.9)',
            outline: 'none',
            fontFamily: 'var(--ts-font-body)',
            resize: 'vertical',
          }}
        />
      </div>

      {/* Interactive Toggles, Checkbox & Radios Row */}
      <div
        style={{
          borderTop: '1px solid var(--ts-color-border)',
          paddingTop: 'var(--ts-space-md)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--ts-space-md)',
          alignItems: 'center',
        }}
      >
        {/* Toggle Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={() => setToggleActive(!toggleActive)}
            style={{
              width: '44px',
              height: '24px',
              borderRadius: '9999px',
              backgroundColor: toggleActive ? 'var(--ts-color-primary)' : 'var(--ts-color-border)',
              border: 'none',
              padding: '2px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.2s',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                transform: toggleActive ? 'translateX(20px)' : 'translateX(0px)',
                transition: 'transform 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            />
          </button>
          <div>
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', fontWeight: 600 }}>
              Live Telemetry
            </div>
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.65 }}>
              Auto-sync specs
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div
            onClick={() => setCheckedBox(!checkedBox)}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: 'calc(var(--ts-radius) * 0.5)',
              backgroundColor: checkedBox ? 'var(--ts-color-primary)' : 'transparent',
              border: `1px solid ${checkedBox ? 'var(--ts-color-primary)' : 'var(--ts-color-border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {checkedBox && <AppIcon name="check" size={14} style={{ color: '#ffffff' }} />}
          </div>
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', fontWeight: 500 }}>
            Strict Token Enforcement
          </span>
        </label>

        {/* Radio Option */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['option-1', 'option-2'].map((opt, i) => (
            <label
              key={opt}
              onClick={() => setRadioSelected(opt)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '9999px',
                  border: `2px solid ${radioSelected === opt ? 'var(--ts-color-accent)' : 'var(--ts-color-border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {radioSelected === opt && (
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '9999px',
                      backgroundColor: 'var(--ts-color-accent)',
                    }}
                  />
                )}
              </div>
              <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
                {i === 0 ? 'Production' : 'Canary'}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
