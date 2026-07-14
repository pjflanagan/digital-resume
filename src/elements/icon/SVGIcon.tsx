import type { IconType } from 'react-icons';
import { MdAdd, MdArrowDownward, MdCheckCircle, MdEmail, MdRemove, MdSend } from 'react-icons/md';
import { SiGithub } from 'react-icons/si';
import { BsLinkedin } from 'react-icons/bs';
import { IoPlanet } from 'react-icons/io5';

// Fill-based icon sets only (Material, Simple Icons, Ionicons) — the button
// styles color icons via `path { fill }`, which breaks stroke-based sets
// like Feather.
const ICONS: Record<string, IconType> = {
  linkedin: BsLinkedin,
  email: MdEmail,
  github: SiGithub,
  'down-arrow': MdArrowDownward,
  minus: MdRemove,
  plus: MdAdd,
  saturn: IoPlanet,
  send: MdSend,
  check: MdCheckCircle,
};

type SVGIconProps = {
  icon: string;
};

// size="100%" matches the old inline SVGs, which had no width/height
// attributes and so filled their container
const SVGIcon = ({ icon }: SVGIconProps) => {
  const Icon = ICONS[icon];
  return Icon ? <Icon size="100%" /> : <span />;
};

export { SVGIcon };
