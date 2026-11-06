import React from 'react';
import { MediaHeroBlock, type MediaHeroBlockProps } from '../../components/blocks/MediaHeroBlock';

export const Section: React.FC<MediaHeroBlockProps> = (props) => {
  return <MediaHeroBlock {...props} />;
};

export default Section;

