import React from 'react';
import { CheckoutInvoiceBlock, type CheckoutInvoiceBlockProps } from '../../components/blocks/CheckoutInvoiceBlock';

export const Section: React.FC<CheckoutInvoiceBlockProps> = (props) => {
  return <CheckoutInvoiceBlock {...props} />;
};

export default Section;

