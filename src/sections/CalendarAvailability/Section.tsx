import React from 'react';
import { CalendarAvailabilityBlock, type CalendarAvailabilityBlockProps } from '../../components/blocks/CalendarAvailabilityBlock';

export const Section: React.FC<CalendarAvailabilityBlockProps> = (props) => {
  return <CalendarAvailabilityBlock {...props} />;
};

export default Section;

