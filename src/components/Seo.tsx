
const DESCRIPTION = "Full-stack Web Developer";
const AUTHOR = "Peter James Flanagan";
const HANDLE = "@peterjflan";
const ROOT = "https://pjflanagan.me";
const IMG = `${ROOT}/img/social/social.png`;
const IMG_TW = `${ROOT}/img/social/social-tw.png`;
const FAVICON_32 = `${ROOT}/img/icon/favicon-32x32.png`;
const FAVICON_16 = `${ROOT}/img/icon/favicon-16x16.png`;

type SeoProps = {
  title?: string;
};

// Rendered via Gatsby's Head export API (export const Head = () => <Seo />)
const Seo = ({ title = AUTHOR }: SeoProps) => (
  <>
    <title>{title}</title>

    {/* Icon */}
    <link rel="icon" type="image/png" sizes="32x32" href={FAVICON_32} />
    <link rel="icon" type="image/png" sizes="16x16" href={FAVICON_16} />

    {/* Social */}
    <meta name="description" content={DESCRIPTION} />
    <meta name="author" content={AUTHOR} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={DESCRIPTION} />
    <meta property="og:url" content={ROOT} />
    <meta property="og:image" content={IMG} />

    {/* Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:image:secure_url" content={IMG} />

    {/* Twitter */}
    <meta name="twitter:title" content={title} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={HANDLE} />
    <meta name="twitter:creator" content={HANDLE} />
    <meta name="twitter:image" content={IMG_TW} />
  </>
);

export { Seo };
