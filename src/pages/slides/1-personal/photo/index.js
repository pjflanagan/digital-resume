import React from 'react'

import { BillCypher } from './bill-cypher'
import { FrameHolder } from '../../../../elements'
import Styles from './style.css';

const Photo = () => {
  return (
    <div id="personal-photo" className="personal-photo">
      <BillCypher />
      <FrameHolder style={Styles.photoFrameHolder} />
    </div>
  );
}

export { Photo }