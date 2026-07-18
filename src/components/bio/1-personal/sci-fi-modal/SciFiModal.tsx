import React from 'react';

import { Modal, Dropdown } from 'src/elements';
import { useBio } from 'src/content';

type SciFiModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function SciFiModal({ isOpen, onClose }: SciFiModalProps): React.ReactNode {
  const { references } = useBio().egg;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sci-Fi References">
      {references.map((reference) => (
        <Dropdown key={reference.id} label={reference.name}>
          {reference.answer}
        </Dropdown>
      ))}
    </Modal>
  );
}

export { SciFiModal };
