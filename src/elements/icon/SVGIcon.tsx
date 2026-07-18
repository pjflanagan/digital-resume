import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { MdAdd, MdCheckCircle, MdEmail, MdRemove } from 'react-icons/md';
import { SiGithub } from 'react-icons/si';
import { BsLinkedin } from 'react-icons/bs';
import { IoPlanet, IoRocketSharp } from 'react-icons/io5';
import { TbSendFilled } from "react-icons/tb";

// Fill-based icon sets only (Material, Simple Icons, Ionicons) — the button
// styles color icons via `path { fill }`, which breaks stroke-based sets
// like Feather.
const ICONS = {
  linkedin: BsLinkedin,
  email: MdEmail,
  github: SiGithub,
  rocket: IoRocketSharp,
  minus: MdRemove,
  plus: MdAdd,
  saturn: IoPlanet,
  send: TbSendFilled,
  check: MdCheckCircle,
} satisfies Record<string, IconType>;

type IconName = keyof typeof ICONS;

type SVGIconProps = {
  icon: IconName;
};

// size="100%" matches the old inline SVGs, which had no width/height
// attributes and so filled their container
function SVGIcon({ icon }: SVGIconProps): ReactNode {
  const Icon = ICONS[icon];
  return <Icon size="100%" />;
}

export { SVGIcon };
export type { IconName };
