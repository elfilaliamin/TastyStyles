import React from 'react';
import { FilterToolbarBlock, type FilterToolbarBlockProps } from '../../components/blocks/FilterToolbarBlock';

export const Section: React.FC<FilterToolbarBlockProps> = (props) => {
  return <FilterToolbarBlock {...props} />;
};

export default Section;

