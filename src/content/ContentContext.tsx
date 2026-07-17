import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import StaticBio, { buildBio } from './bio';
import { fetchContentFiles } from './fetchContent';
import type { BioContent } from './types';

// Renders instantly with the build-time copy of content/, then swaps in the
// latest content fetched from GitHub once it arrives.
const ContentContext = createContext<BioContent>(StaticBio);

function ContentProvider({ children }: { children: ReactNode }) {
  const [bio, setBio] = useState<BioContent>(StaticBio);

  useEffect(() => {
    fetchContentFiles()
      .then((files) => setBio(buildBio(files)))
      .catch((e) => console.error('Falling back to build-time content:', e));
  }, []);

  return <ContentContext.Provider value={bio}>{children}</ContentContext.Provider>;
}

function useBio() {
  return useContext(ContentContext);
}

export { ContentProvider, useBio };
