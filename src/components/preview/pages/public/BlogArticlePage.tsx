import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { AppIcon } from '../../../common/AppIcon';

export const BlogArticlePage: React.FC = () => {
  const { state } = useDesign();

  return (
    <article
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        minHeight: '100%',
        padding: 'var(--ts-space-lg)',
        maxWidth: '740px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-md)',
        lineHeight: 1.6,
      }}
    >
      {/* Category & Meta */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <span
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            color: 'var(--ts-color-accent)',
            padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            borderRadius: '9999px',
            fontSize: 'calc(var(--ts-base-size) * 0.75)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Engineering Architecture
        </span>

        <div style={{ display: 'flex', gap: '8px', opacity: 0.7 }}>
          <AppIcon name="bookmark" size={16} style={{ cursor: 'pointer' }} />
          <AppIcon name="share" size={16} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* Main Title */}
      <h1
        style={{
          fontFamily: 'var(--ts-font-heading)',
          fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * var(--ts-scale) * 1.1)',
          fontWeight: 800,
          lineHeight: 1.2,
          margin: 0,
          letterSpacing: '-0.02em',
        }}
      >
        Bridging the Void: Deterministic Design Tokens for Autonomous AI Agents
      </h1>

      {/* Author Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingBottom: 'var(--ts-space-sm)',
          borderBottom: '1px solid var(--ts-color-border)',
          fontSize: 'calc(var(--ts-base-size) * 0.85)',
          opacity: 0.8,
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '9999px',
            backgroundColor: 'var(--ts-color-primary)',
            color: 'var(--ts-color-background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
          }}
        >
          AR
        </div>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--ts-color-text)' }}>Alex Rivers</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AppIcon name="calendar" size={12} /> Nov 3, 2026
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AppIcon name="clock" size={12} /> 6 min read
            </span>
          </div>
        </div>
      </div>

      {/* Lead Paragraph */}
      <p
        style={{
          fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
          fontWeight: 500,
          lineHeight: 1.5,
          opacity: 0.9,
          margin: 'var(--ts-space-xs) 0',
        }}
      >
        When AI coding agents hallucinate design decisions, products lose their brand soul.
        By decoupling design variables from code into a rigorous registry, we provide a mathematical foundation for machine implementation.
      </p>

      {/* Section H2 */}
      <h2
        style={{
          fontFamily: 'var(--ts-font-heading)',
          fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
          fontWeight: 700,
          margin: 'var(--ts-space-md) 0 0 0',
        }}
      >
        The Single Source of Truth Problem
      </h2>
      <p style={{ margin: 0, opacity: 0.85 }}>
        Modern frontend development routinely suffers from drift: Figma files diverge from Storybook, which diverge from production CSS. When autonomous agents synthesize new views, they often fall back to raw hex codes or inconsistent Tailwind arbitrary values.
      </p>

      {/* Blockquote with Accent Border */}
      <blockquote
        style={{
          margin: 'var(--ts-space-md) 0',
          padding: 'var(--ts-space-sm) var(--ts-space-md)',
          borderLeft: '4px solid var(--ts-color-accent)',
          backgroundColor: 'var(--ts-color-surface)',
          borderRadius: '0 var(--ts-radius) var(--ts-radius) 0',
          fontStyle: 'italic',
          opacity: 0.9,
        }}
      >
        "A design system is not a component library; it is a shared protocol of constraints that eliminates ambiguity across humans and agents alike."
      </blockquote>

      {/* Code Snippet */}
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          padding: 'var(--ts-space-md)',
          fontFamily: 'monospace',
          fontSize: 'calc(var(--ts-base-size) * 0.85)',
          overflowX: 'auto',
        }}
      >
        <span style={{ color: 'var(--ts-color-accent)' }}>:root</span> &#123;
        <div style={{ paddingLeft: '16px' }}>
          --font-scale: {state.typography.scale};<br />
          --radius-base: {state.radius};<br />
          --color-primary: {state.colors[state.activeMode].primary};
        </div>
        &#125;
      </div>

      {/* Author Bio Card */}
      <div
        style={{
          marginTop: 'var(--ts-space-lg)',
          padding: 'var(--ts-space-md)',
          borderRadius: 'var(--ts-radius)',
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          display: 'flex',
          gap: 'var(--ts-space-md)',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '9999px',
            backgroundColor: 'var(--ts-color-accent)',
            color: 'var(--ts-color-background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          AR
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.95)' }}>Written by Alex Rivers</div>
          <p style={{ margin: '2px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.75 }}>
            Staff Design Technologist specializing in declarative UI specifications and agentic dev tooling.
          </p>
        </div>
      </div>
    </article>
  );
};

