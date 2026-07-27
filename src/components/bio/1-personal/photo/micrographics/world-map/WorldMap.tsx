import type { CSSProperties, ReactNode } from 'react';

import { TextAccent } from 'src/elements';
import type { PhotoLocation } from 'src/elements/text/types';
import { equalEarthProject } from 'src/helpers';

import worldMapSrc from './world-map.png';

import * as Style from './WorldMap.module.scss';

const mapStyle = { '--world-map-src': `url(${worldMapSrc})` } as CSSProperties;

type WorldMapProps = {
  photoLocation?: PhotoLocation;
};

function locationLines(photoLocation: PhotoLocation): string {
  const lines = [photoLocation.name];
  if (photoLocation.coordinates) {
    const { lat, lng } = photoLocation.coordinates;
    lines.push(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
  }
  if (photoLocation.altitude) {
    lines.push(photoLocation.altitude);
  }
  return lines.join('\n');
}

function WorldMap({ photoLocation }: WorldMapProps): ReactNode {
  const coordinates = photoLocation?.coordinates;
  const crosshairStyle = coordinates
    ? ({
        '--crosshair-x': `${(equalEarthProject(coordinates.lat, coordinates.lng).x * 100).toFixed(2)}%`,
        '--crosshair-y': `${(equalEarthProject(coordinates.lat, coordinates.lng).y * 100).toFixed(2)}%`,
      } as CSSProperties)
    : undefined;

  return (
    <div className={Style.worldMap}>
      {photoLocation && (
        <TextAccent mono animate color="cyan" className={Style.locationText}>
          {locationLines(photoLocation)}
        </TextAccent>
      )}
      <div className={Style.mapHolder}>
        <div className={Style.mapImage} style={mapStyle} />
        {coordinates && <div className={Style.crosshair} style={crosshairStyle} />}
      </div>
    </div>
  );
}

export { WorldMap };
