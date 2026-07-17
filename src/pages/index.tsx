import type { ReactNode } from 'react';

import 'src/theme/theme.scss';

import { BioComponent } from 'src/components/bio/Bio';
import { Seo } from 'src/components/Seo';

function PageIndex(): ReactNode {
  return <BioComponent />;
}

export default PageIndex;

export function Head(): ReactNode {
  return <Seo />;
}
