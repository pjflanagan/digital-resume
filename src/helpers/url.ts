// URL --------------------------------------------------------------------------------------------

// form-urlencode a flat record (for Netlify form posts)
function encode(data: Record<string, string>): string {
  return new URLSearchParams(data).toString();
}

type LinkTargetProps = {
  target: '_blank' | undefined;
  rel: 'noreferrer' | undefined;
};

// props for an <a> that should open in a new tab unless sameWindow is set
function linkTargetProps(sameWindow?: boolean): LinkTargetProps {
  return {
    target: sameWindow ? undefined : '_blank',
    rel: sameWindow ? undefined : 'noreferrer',
  };
}

export { encode, linkTargetProps };
