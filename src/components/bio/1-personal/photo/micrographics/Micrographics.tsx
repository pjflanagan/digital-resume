import type { ReactNode } from 'react';

import { contentImage } from 'src/content';
import type { PhotoLocation } from 'src/elements/text/types';

import { EggMicrographic } from './egg-micrographic/EggMicrographic';
import { Description } from './description/Description';
import { WorldMap } from './world-map/WorldMap';
import { MusicBox } from './music-box/MusicBox';
import { Bars } from './bars/Bars';

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
      <div className={Style.topLeft}>
        <Bars />
      </div>
      <div className={Style.topRight}>
        <MusicBox />
      </div>
      <div className={Style.bottomLeft}>
        {microGraphic && <EggMicrographic src={contentImage('micro-graphics', microGraphic)} />}
        {photoDescription && <Description text={photoDescription} />}
      </div>
      <div className={Style.bottomRight}>
        <WorldMap photoLocation={photoLocation} />
      </div>
    </div>
  );
}

export { Micrographics };
