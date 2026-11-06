import React from 'react';
import { DiscussionReviewBlock, type DiscussionReviewBlockProps } from '../../components/blocks/DiscussionReviewBlock';

export const Section: React.FC<DiscussionReviewBlockProps> = (props) => {
  return <DiscussionReviewBlock {...props} />;
};

export default Section;

