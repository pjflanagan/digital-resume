import type { ReactNode } from 'react';

import 'src/theme/theme.scss';

import { Page404Component } from 'src/components/404/Page404';
import { Seo } from 'src/components/Seo';

function Page404(): ReactNode {
  return <Page404Component />;
}

export default Page404;

export function Head(): ReactNode {
  return <Seo title="404 | Peter James Flanagan" />;
}
