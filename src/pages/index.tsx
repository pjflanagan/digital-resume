import 'src/theme/theme.scss';

import { BioComponent } from 'src/components/bio/Bio';
import { Seo } from 'src/components/Seo';

const PageIndex = () => {
  return <BioComponent />;
};

export default PageIndex;

export const Head = () => <Seo />;
