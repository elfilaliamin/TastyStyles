import React, { useState } from 'react';
import { useDesign } from '../../context/DesignContext';
import { getBestContrastingColor } from '../../lib/contrast';
import { AppIcon } from '../common/AppIcon';

export interface CalendarAvailabilityBlockProps {
  mode?: 'single-date' | 'date-range' | 'time-slots';
  onSelect?: (date: number, slot?: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const CalendarAvailabilityBlock: React.FC<CalendarAvailabilityBlockProps> = ({
  mode = 'time-slots',
  onSelect,
  className = '',
  style = {},
}) => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const [selectedDay, setSelectedDay] = useState(16);
  const [selectedSlot, setSelectedSlot] = useState<string | null>('10:00 AM');
  const [timezone, setTimezone] = useState('US/Pacific (PST)');

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const startDayOffset = 4; // Starts on Thursday

  const timeSlots = [
    { time: '09:00 AM', period: 'Morning' },
    { time: '09:30 AM', period: 'Morning' },
    { time: '10:00 AM', period: 'Morning' },
    { time: '11:30 AM', period: 'Morning' },
    { time: '01:00 PM', period: 'Afternoon' },
    { time: '02:30 PM', period: 'Afternoon' },
    { time: '03:45 PM', period: 'Afternoon' },
    { time: '05:00 PM', period: 'Evening' },
  ];

  const handleDateClick = (d: number) => {
    setSelectedDay(d);
    onSelect?.(d, selectedSlot ?? undefined);
  };

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
    onSelect?.(selectedDay, slot);
  };

  return (
    <div
      className={className}
      style={{
        padding: 'var(--ts-space-lg)',
        backgroundColor: 'var(--ts-color-surface)',
        border: '1px solid var(--ts-color-border)',
        borderRadius: 'var(--ts-radius-surface, 16px)',
        boxShadow: 'var(--ts-shadow)',
        display: 'grid',
        gridTemplateColumns: mode === 'time-slots' ? 'repeat(auto-fit, minmax(260px, 1fr))' : '1fr',
        gap: 'var(--ts-space-lg)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Calendar Month Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, margin: 0, fontSize: '15px' }}>
              November 2026
            </h4>
            <div style={{ fontSize: '11px', opacity: 0.6 }}>Select appointment date</div>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              type="button"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--ts-radius)',
                border: '1px solid var(--ts-color-border)',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AppIcon name="chevronDown" size={14} style={{ transform: 'rotate(90deg)' }} />
            </button>
            <button
              type="button"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--ts-radius)',
                border: '1px solid var(--ts-color-border)',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AppIcon name="chevronDown" size={14} style={{ transform: 'rotate(-90deg)' }} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((w) => (
            <div key={w} style={{ fontSize: '11px', fontWeight: 700, opacity: 0.5, paddingBottom: '4px' }}>
              {w}
            </div>
          ))}
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {daysInMonth.map((d) => {
            const isSelected = selectedDay === d;
            const isPast = d < 4;
            return (
              <button
                key={d}
                type="button"
                disabled={isPast}
                onClick={() => handleDateClick(d)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--ts-radius)',
                  border: isSelected ? 'none' : '1px solid transparent',
                  backgroundColor: isSelected ? 'var(--ts-color-primary)' : 'transparent',
                  color: isSelected ? primaryTextColor : isPast ? 'var(--ts-color-border)' : 'var(--ts-color-text)',
                  fontWeight: isSelected ? 800 : 500,
                  fontSize: '12px',
                  cursor: isPast ? 'not-allowed' : 'pointer',
                  margin: 'auto',
                }}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Column */}
      {mode === 'time-slots' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)', borderLeft: '1px solid var(--ts-color-border)', paddingLeft: 'var(--ts-space-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700 }}>
              Nov {selectedDay}, 2026
            </span>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              style={{
                backgroundColor: 'var(--ts-color-background)',
                color: 'var(--ts-color-text)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: '4px',
                fontSize: '10px',
                padding: '2px 4px',
                outline: 'none',
              }}
            >
              <option value="US/Pacific (PST)">US/Pacific (PST)</option>
              <option value="US/Eastern (EST)">US/Eastern (EST)</option>
              <option value="UTC / GMT">UTC / GMT</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
            {timeSlots.map((slot) => {
              const isSelected = selectedSlot === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => handleSlotClick(slot.time)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--ts-radius)',
                    border: isSelected ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                    backgroundColor: isSelected ? 'rgba(2, 132, 199, 0.12)' : 'var(--ts-color-background)',
                    color: isSelected ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                    fontWeight: isSelected ? 800 : 600,
                    fontSize: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
