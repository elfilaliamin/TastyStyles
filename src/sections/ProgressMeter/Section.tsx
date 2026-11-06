import React from 'react';
import { ProgressMeterBlock, type ProgressMeterBlockProps } from '../../components/blocks/ProgressMeterBlock';

export const Section: React.FC<ProgressMeterBlockProps> = (props) => {
  return <ProgressMeterBlock {...props} />;
};

export default Section;

