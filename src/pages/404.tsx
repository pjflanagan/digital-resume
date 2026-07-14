
import "src/theme/theme.scss";

import {
  Page404Component
} from 'src/components/404/Page404';
import { Seo } from 'src/components/Seo';

const Page404 = () => {
  return <Page404Component />;
}

export default Page404;

export const Head = () => <Seo title="404 | Peter James Flanagan" />;
