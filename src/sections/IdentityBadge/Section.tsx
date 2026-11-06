import React from 'react';
import { IdentityBadgeBlock, type IdentityBadgeBlockProps } from '../../components/blocks/IdentityBadgeBlock';

export const Section: React.FC<IdentityBadgeBlockProps> = (props) => {
  return <IdentityBadgeBlock {...props} />;
};

export default Section;

