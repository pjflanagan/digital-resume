import type { CSSProperties, ReactNode } from 'react';
import { useRef } from 'react';
import clsx from 'clsx';
import type { IconType } from 'react-icons';
import { SiTypescript, SiGo, SiPython, SiCplusplus, SiHtml5, SiCss3 } from 'react-icons/si';
import { FaJava, FaDatabase, FaCode } from 'react-icons/fa';

import { TextHeading } from 'src/elements';
import { useBio } from 'src/content';
import { useReveal } from 'src/hooks';

import * as Style from './Scripts.module.scss';

const SCRIPT_ICONS: Record<string, IconType> = {
  'typescript': SiTypescript,
  'css / scss': SiCss3,
  'golang': SiGo,
  'sql': FaDatabase,
  'python': SiPython,
  'java': FaJava,
  'c++': SiCplusplus,
  'jsx / html': SiHtml5,
};

type ScriptNodeProps = {
  name: string;
  index: number;
};

function ScriptNode({ name, index }: ScriptNodeProps): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const isRevealed = useReveal({ ref, gap: 20 });

  const normName = name.toLowerCase().trim();
  const Icon = SCRIPT_ICONS[normName] || FaCode;

  const style = isRevealed
    ? ({ '--delay': `${index * 40}ms` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      className={clsx(Style.node, isRevealed && Style.reveal)}
      style={style}
    >
      <div className={Style.capacitor}>
        <div className={Style.iconWrapper}>
          <Icon size="100%" />
        </div>
      </div>
      <span className={Style.label}>{name}</span>
    </div>
  );
}

export function Scripts(): ReactNode {
  const { scripts } = useBio().experience.skills;

  if (!scripts || scripts.length === 0) {
    return null;
  }

  return (
    <div className={Style.scriptsContainer}>
      <div className={Style.heading}>
        <TextHeading>Scripts</TextHeading>
      </div>
      <div className={Style.scriptsGrid}>
        {scripts.map((script, i) => (
          <ScriptNode key={script.name} name={script.name} index={i} />
        ))}
      </div>
    </div>
  );
}
