import type { ReactNode } from 'react';

import { contentImage } from 'src/content';
import type { PhotoLocation } from 'src/elements/text/types';

import { MicrographicHemisphere } from './micrographic-hemisphere/MicrographicHemisphere';
import { EggMicrographic } from './egg-micrographic/EggMicrographic';
import { Description } from './description/Description';
import { WorldMap } from './world-map/WorldMap';
import { MusicBox } from './music-box/MusicBox';

import * as Style from './Micrographics.module.scss';

type MicrographicsProps = {
  microGraphic?: string;
  photoDescription?: string;
  photoLocation?: PhotoLocation;
};

// positions all the decorative/informative micro-graphics within the corners of Photo
function Micrographics({
  microGraphic,
  photoDescription,
  photoLocation,
}: MicrographicsProps): ReactNode {
  return (
    <div className={Style.micrographics}>
      <MicrographicHemisphere position="topLeft">
        <MusicBox />
      </MicrographicHemisphere>
      <MicrographicHemisphere position="topRight" hideSmall>
        {microGraphic && <EggMicrographic src={contentImage('micro-graphics', microGraphic)} />}
      </MicrographicHemisphere>
      <MicrographicHemisphere position="bottomLeft" hideSmall>
        <div className={Style.bottomLeftContent}>
          {photoDescription && <Description text={photoDescription} />}
        </div>
      </MicrographicHemisphere>
      <MicrographicHemisphere position="bottomRight">
        <WorldMap photoLocation={photoLocation} />
      </MicrographicHemisphere>
    </div>
  );
}

export { Micrographics };
