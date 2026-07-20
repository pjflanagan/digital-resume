import React, { useMemo, useState } from 'react';

import { Modal, Dropdown, Switch, ParseTextForLinks } from 'src/elements';
import { useBio } from 'src/content';

import * as Style from './SciFiModal.module.scss';

type GroupBy = 'reference' | 'location';

type SciFiModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function SciFiModal({ isOpen, onClose }: SciFiModalProps): React.ReactNode {
  const { references, locations } = useBio().egg;
  const [groupBy, setGroupBy] = useState<GroupBy>('location');

  const flatEggs = useMemo(
    () =>
      references.flatMap((reference) =>
        reference.eggs.map((egg) => ({
          referenceName: reference.name,
          locationId: egg.locationId,
          text: egg.egg,
        }))
      ),
    [references]
  );

  const groups = useMemo(() => {
    if (groupBy === 'reference') {
      return references.map((reference) => ({
        id: reference.name,
        name: reference.name,
        description: reference.description,
        eggs: reference.eggs.map((egg) => ({
          text: egg.egg,
          otherName: locations.find((location) => location.id === egg.locationId)?.name ?? '',
        })),
      }));
    }
    return locations.map((location) => ({
      id: location.id,
      name: location.name,
      description: location.description,
      eggs: flatEggs
        .filter((egg) => egg.locationId === location.id)
        .map((egg) => ({ text: egg.text, otherName: egg.referenceName })),
    }));
  }, [groupBy, references, locations, flatEggs]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sci-Fi References">
      <Switch
        className={Style.groupSwitch}
        value={groupBy}
        onChange={setGroupBy}
        options={[
          { value: 'location', label: 'By Location' },
          { value: 'reference', label: 'By Reference' },
        ]}
      />
      {groups.map((group) => (
        <Dropdown key={group.id} label={group.name}>
          {group.description && (
            <p className={Style.description}>
              {ParseTextForLinks(group.description.text, group.description.links)}
            </p>
          )}
          <ul className={Style.list}>
            {group.eggs.map((egg, index) => (
              <li key={index}>
                <span className={Style.otherName}>{egg.otherName}:</span> {egg.text}
              </li>
            ))}
          </ul>
        </Dropdown>
      ))}
    </Modal>
  );
}

export { SciFiModal };
