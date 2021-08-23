import styles from './Card.module.css';
import { ReactComponent as FenceIcon } from './icons/001-fence.svg';
import { ReactComponent as WindIcon } from './icons/002-wind.svg';
import { ReactComponent as LeafIcon } from './icons/003-leaf.svg';
import { ReactComponent as TeaMugIcon } from './icons/004-tea mug.svg';
import { ReactComponent as BushIcon } from './icons/005-bush.svg';
import { ReactComponent as KiteIcon } from './icons/006-kite.svg';
import { ReactComponent as RainBootsIcon } from './icons/007-rain boots.svg';
import { ReactComponent as ShovelIcon } from './icons/008-shovel.svg';
import { ReactComponent as WineGlassIcon } from './icons/009-wine glass.svg';
import { ReactComponent as SunflowerIcon } from './icons/010-sunflower.svg';
import { ReactComponent as PumpkinIcon } from './icons/011-pumpkin.svg';
import { ReactComponent as PearIcon } from './icons/012-pear.svg';
import { ReactComponent as MushroomIcon } from './icons/013-mushroom.svg';
import { ReactComponent as RedLeafIcon } from './icons/014-leaf.svg';
import { ReactComponent as AcornIcon } from './icons/015-acorn.svg';
import { ReactComponent as SquirrelIcon } from './icons/016-squirrel.svg';
import { ReactComponent as GrapesIcon } from './icons/017-grapes.svg';
import { ReactComponent as HoneycombIcon } from './icons/018-honeycomb.svg';

const icons = {
  fence: () => <FenceIcon />,
  wind: () => <WindIcon />,
  leaf: () => <LeafIcon />,
  tea: () => <TeaMugIcon />,
  bush: () => <BushIcon />,
  kite: () => <KiteIcon />,
  rainBoots: () => <RainBootsIcon />,
  shovel: () => <ShovelIcon />,
  wineGlass: () => <WineGlassIcon />,
  sunflower: () => <SunflowerIcon />,
  pumpkin: () => <PumpkinIcon />,
  pear: () => <PearIcon />,
  mushroom: () => <MushroomIcon />,
  redleaf: () => <RedLeafIcon />,
  acorn: () => <AcornIcon />,
  squirrel: () => <SquirrelIcon />,
  grapes: () => <GrapesIcon />,
  honeycomb: () => <HoneycombIcon />,
};

export function Card({ cardData }) {
  let stateClass;

  switch (cardData.state) {
    case 'isOpen':
      stateClass = styles.open;
      break;

    case 'isClose':
      stateClass = styles.close;
      break;

    case 'deleted':
      stateClass = styles.deleted;
      break;

    default:
      break;
  }

  return <div className={`${styles.card} ${stateClass} `}>{cardData.state === 'isOpen' && icons[cardData.name]()}</div>;
}
