import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { registries } from '../../lib/registry';
import { SegmentedControl } from '../common/SegmentedControl';

export const ComponentSection: React.FC = () => {
  const { state, dispatch } = useDesign();

  // Purely dynamic from registries
  const radiusOptions = registries.radius.map((r) => ({
    id: r.id,
    label: r.label,
    sublabel: r.value,
  }));

  const shadowOptions = registries.shadows.map((s) => ({
    id: s.id,
    label: s.label,
  }));

  const spacingOptions = registries.spacing.map((sp) => ({
    id: sp.id,
    label: sp.label,
    sublabel: `${sp.baseFactor}x`,
  }));

  return (
    <div className="space-y-4">
      {/* Border Radius */}
      <SegmentedControl
        label="Border Radius"
        options={radiusOptions}
        value={state.radius}
        onChange={(val) => dispatch({ type: 'SET_RADIUS', id: val })}
      />

      {/* Shadow Elevation */}
      <SegmentedControl
        label="Shadow Elevation"
        options={shadowOptions}
        value={state.shadow}
        onChange={(val) => dispatch({ type: 'SET_SHADOW', id: val })}
      />

      {/* Spacing Density */}
      <SegmentedControl
        label="Spacing Scale"
        options={spacingOptions}
        value={state.spacing}
        onChange={(val) => dispatch({ type: 'SET_SPACING', id: val })}
      />
    </div>
  );
};

