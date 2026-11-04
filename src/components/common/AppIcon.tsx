import React from 'react';
import { useDesign } from '../../context/DesignContext';
import type { IconLibrary, IconWeight } from '../../config/schema';

// 1. Lucide Icons
import {
  Sparkles as LucideSparkles,
  Shield as LucideShield,
  Palette as LucidePalette,
  Layers as LucideLayers,
  Settings as LucideSettings,
  Search as LucideSearch,
  Bell as LucideBell,
  Folder as LucideFolder,
  Plus as LucidePlus,
  Trash2 as LucideTrash,
  Check as LucideCheck,
  AlertTriangle as LucideAlert,
  Info as LucideInfo,
  X as LucideClose,
  User as LucideUser,
  Download as LucideDownload,
  ChevronDown as LucideChevronDown,
  ChevronRight as LucideChevronRight,
} from 'lucide-react';

// 2. Tabler Icons
import {
  IconSparkles as TablerSparkles,
  IconShield as TablerShield,
  IconPalette as TablerPalette,
  IconStack2 as TablerLayers,
  IconSettings as TablerSettings,
  IconSearch as TablerSearch,
  IconBell as TablerBell,
  IconFolder as TablerFolder,
  IconPlus as TablerPlus,
  IconTrash as TablerTrash,
  IconCheck as TablerCheck,
  IconAlertTriangle as TablerAlert,
  IconInfoCircle as TablerInfo,
  IconX as TablerClose,
  IconUser as TablerUser,
  IconDownload as TablerDownload,
  IconChevronDown as TablerChevronDown,
  IconChevronRight as TablerChevronRight,
} from '@tabler/icons-react';

// 3. Phosphor Icons
import {
  Sparkle as PhosphorSparkles,
  Shield as PhosphorShield,
  Palette as PhosphorPalette,
  Stack as PhosphorLayers,
  Gear as PhosphorSettings,
  MagnifyingGlass as PhosphorSearch,
  Bell as PhosphorBell,
  Folder as PhosphorFolder,
  Plus as PhosphorPlus,
  Trash as PhosphorTrash,
  Check as PhosphorCheck,
  Warning as PhosphorAlert,
  Info as PhosphorInfo,
  X as PhosphorClose,
  User as PhosphorUser,
  DownloadSimple as PhosphorDownload,
  CaretDown as PhosphorChevronDown,
  CaretRight as PhosphorChevronRight,
} from '@phosphor-icons/react';

// 4. Heroicons (Outline & Solid)
import {
  SparklesIcon as HeroSparklesOutline,
  ShieldCheckIcon as HeroShieldOutline,
  SwatchIcon as HeroPaletteOutline,
  Square3Stack3DIcon as HeroLayersOutline,
  Cog6ToothIcon as HeroSettingsOutline,
  MagnifyingGlassIcon as HeroSearchOutline,
  BellIcon as HeroBellOutline,
  FolderIcon as HeroFolderOutline,
  PlusIcon as HeroPlusOutline,
  TrashIcon as HeroTrashOutline,
  CheckIcon as HeroCheckOutline,
  ExclamationTriangleIcon as HeroAlertOutline,
  InformationCircleIcon as HeroInfoOutline,
  XMarkIcon as HeroCloseOutline,
  UserIcon as HeroUserOutline,
  ArrowDownTrayIcon as HeroDownloadOutline,
  ChevronDownIcon as HeroChevronDownOutline,
  ChevronRightIcon as HeroChevronRightOutline,
} from '@heroicons/react/24/outline';

import {
  SparklesIcon as HeroSparklesSolid,
  ShieldCheckIcon as HeroShieldSolid,
  SwatchIcon as HeroPaletteSolid,
  Square3Stack3DIcon as HeroLayersSolid,
  Cog6ToothIcon as HeroSettingsSolid,
  MagnifyingGlassIcon as HeroSearchSolid,
  BellIcon as HeroBellSolid,
  FolderIcon as HeroFolderSolid,
  PlusIcon as HeroPlusSolid,
  TrashIcon as HeroTrashSolid,
  CheckIcon as HeroCheckSolid,
  ExclamationTriangleIcon as HeroAlertSolid,
  InformationCircleIcon as HeroInfoSolid,
  XMarkIcon as HeroCloseSolid,
  UserIcon as HeroUserSolid,
  ArrowDownTrayIcon as HeroDownloadSolid,
  ChevronDownIcon as HeroChevronDownSolid,
  ChevronRightIcon as HeroChevronRightSolid,
} from '@heroicons/react/24/solid';

// 5. Remix Icons (Line & Fill)
import {
  RiSparklingLine as RemixSparklesLine,
  RiSparklingFill as RemixSparklesFill,
  RiShieldLine as RemixShieldLine,
  RiShieldFill as RemixShieldFill,
  RiPaletteLine as RemixPaletteLine,
  RiPaletteFill as RemixPaletteFill,
  RiStackLine as RemixLayersLine,
  RiStackFill as RemixLayersFill,
  RiSettings3Line as RemixSettingsLine,
  RiSettings3Fill as RemixSettingsFill,
  RiSearchLine as RemixSearchLine,
  RiSearchFill as RemixSearchFill,
  RiNotification3Line as RemixBellLine,
  RiNotification3Fill as RemixBellFill,
  RiFolderLine as RemixFolderLine,
  RiFolderFill as RemixFolderFill,
  RiAddLine as RemixPlusLine,
  RiAddFill as RemixPlusFill,
  RiDeleteBinLine as RemixTrashLine,
  RiDeleteBinFill as RemixTrashFill,
  RiCheckLine as RemixCheckLine,
  RiCheckFill as RemixCheckFill,
  RiAlertLine as RemixAlertLine,
  RiAlertFill as RemixAlertFill,
  RiInformationLine as RemixInfoLine,
  RiInformationFill as RemixInfoFill,
  RiCloseLine as RemixCloseLine,
  RiCloseFill as RemixCloseFill,
  RiUserLine as RemixUserLine,
  RiUserFill as RemixUserFill,
  RiDownloadLine as RemixDownloadLine,
  RiDownloadFill as RemixDownloadFill,
  RiArrowDownSLine as RemixChevronDown,
  RiArrowRightSLine as RemixChevronRight,
} from '@remixicon/react';

export type IconName =
  | 'sparkles'
  | 'shield'
  | 'palette'
  | 'layers'
  | 'settings'
  | 'search'
  | 'bell'
  | 'folder'
  | 'plus'
  | 'trash'
  | 'check'
  | 'alert'
  | 'info'
  | 'close'
  | 'user'
  | 'download'
  | 'chevronDown'
  | 'chevronRight';

export interface AppIconProps {
  name: IconName;
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  strokeWidth?: number;
  library?: IconLibrary;
  mode?: 'outline' | 'solid';
  duotone?: boolean;
  weight?: IconWeight;
  'aria-hidden'?: boolean;
}

const STROKE_WEIGHT_MAP: Record<IconWeight, number> = {
  thin: 1.25,
  light: 1.5,
  regular: 1.75,
  medium: 2.25,
  bold: 2.85,
};

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  className,
  style,
  size = 18,
  strokeWidth,
  library,
  mode,
  duotone,
  weight,
  'aria-hidden': ariaHidden = true,
}) => {
  const { state } = useDesign();

  // Resolve config from context or direct props
  const activeLibrary = library ?? state.icons?.library ?? 'lucide';
  const activeMode = mode ?? state.icons?.mode ?? 'outline';
  const activeDuotone = duotone ?? state.icons?.duotone ?? false;
  const activeWeight = weight ?? state.icons?.weight ?? 'regular';

  const isSolid = activeMode === 'solid';
  const resolvedStroke = strokeWidth ?? STROKE_WEIGHT_MAP[activeWeight] ?? 1.75;

  const baseStyle: React.CSSProperties = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    flexShrink: 0,
    ...style,
  };

  // 1. Tabler Icons
  if (activeLibrary === 'tabler') {
    const tablerMap = {
      sparkles: TablerSparkles,
      shield: TablerShield,
      palette: TablerPalette,
      layers: TablerLayers,
      settings: TablerSettings,
      search: TablerSearch,
      bell: TablerBell,
      folder: TablerFolder,
      plus: TablerPlus,
      trash: TablerTrash,
      check: TablerCheck,
      alert: TablerAlert,
      info: TablerInfo,
      close: TablerClose,
      user: TablerUser,
      download: TablerDownload,
      chevronDown: TablerChevronDown,
      chevronRight: TablerChevronRight,
    };
    const Component = tablerMap[name] ?? TablerSparkles;
    return (
      <Component
        className={className}
        style={{
          ...baseStyle,
          fill: isSolid ? 'currentColor' : activeDuotone ? 'currentColor' : 'none',
          fillOpacity: isSolid ? 1 : activeDuotone ? 0.22 : 0,
        }}
        stroke={isSolid ? 0.5 : resolvedStroke}
        aria-hidden={ariaHidden}
      />
    );
  }

  // 2. Phosphor Icons
  if (activeLibrary === 'phosphor') {
    const phosphorMap = {
      sparkles: PhosphorSparkles,
      shield: PhosphorShield,
      palette: PhosphorPalette,
      layers: PhosphorLayers,
      settings: PhosphorSettings,
      search: PhosphorSearch,
      bell: PhosphorBell,
      folder: PhosphorFolder,
      plus: PhosphorPlus,
      trash: PhosphorTrash,
      check: PhosphorCheck,
      alert: PhosphorAlert,
      info: PhosphorInfo,
      close: PhosphorClose,
      user: PhosphorUser,
      download: PhosphorDownload,
      chevronDown: PhosphorChevronDown,
      chevronRight: PhosphorChevronRight,
    };
    const Component = phosphorMap[name] ?? PhosphorSparkles;

    let phosphorWeight: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone' = 'regular';
    if (isSolid) phosphorWeight = 'fill';
    else if (activeDuotone) phosphorWeight = 'duotone';
    else if (activeWeight === 'thin') phosphorWeight = 'thin';
    else if (activeWeight === 'light') phosphorWeight = 'light';
    else if (activeWeight === 'bold' || activeWeight === 'medium') phosphorWeight = 'bold';

    return (
      <Component
        className={className}
        style={baseStyle}
        weight={phosphorWeight}
        aria-hidden={ariaHidden}
      />
    );
  }

  // 3. Heroicons
  if (activeLibrary === 'heroicons') {
    const heroMap = isSolid
      ? {
          sparkles: HeroSparklesSolid,
          shield: HeroShieldSolid,
          palette: HeroPaletteSolid,
          layers: HeroLayersSolid,
          settings: HeroSettingsSolid,
          search: HeroSearchSolid,
          bell: HeroBellSolid,
          folder: HeroFolderSolid,
          plus: HeroPlusSolid,
          trash: HeroTrashSolid,
          check: HeroCheckSolid,
          alert: HeroAlertSolid,
          info: HeroInfoSolid,
          close: HeroCloseSolid,
          user: HeroUserSolid,
          download: HeroDownloadSolid,
          chevronDown: HeroChevronDownSolid,
          chevronRight: HeroChevronRightSolid,
        }
      : {
          sparkles: HeroSparklesOutline,
          shield: HeroShieldOutline,
          palette: HeroPaletteOutline,
          layers: HeroLayersOutline,
          settings: HeroSettingsOutline,
          search: HeroSearchOutline,
          bell: HeroBellOutline,
          folder: HeroFolderOutline,
          plus: HeroPlusOutline,
          trash: HeroTrashOutline,
          check: HeroCheckOutline,
          alert: HeroAlertOutline,
          info: HeroInfoOutline,
          close: HeroCloseOutline,
          user: HeroUserOutline,
          download: HeroDownloadOutline,
          chevronDown: HeroChevronDownOutline,
          chevronRight: HeroChevronRightOutline,
        };
    const Component = heroMap[name] ?? HeroSparklesOutline;
    return (
      <Component
        className={className}
        style={{
          ...baseStyle,
          strokeWidth: isSolid ? undefined : resolvedStroke,
          fillOpacity: activeDuotone ? 0.22 : undefined,
        }}
        aria-hidden={ariaHidden}
      />
    );
  }

  // 4. Remix Icons
  if (activeLibrary === 'remix') {
    const remixMap = isSolid
      ? {
          sparkles: RemixSparklesFill,
          shield: RemixShieldFill,
          palette: RemixPaletteFill,
          layers: RemixLayersFill,
          settings: RemixSettingsFill,
          search: RemixSearchFill,
          bell: RemixBellFill,
          folder: RemixFolderFill,
          plus: RemixPlusFill,
          trash: RemixTrashFill,
          check: RemixCheckFill,
          alert: RemixAlertFill,
          info: RemixInfoFill,
          close: RemixCloseFill,
          user: RemixUserFill,
          download: RemixDownloadFill,
          chevronDown: RemixChevronDown,
          chevronRight: RemixChevronRight,
        }
      : {
          sparkles: RemixSparklesLine,
          shield: RemixShieldLine,
          palette: RemixPaletteLine,
          layers: RemixLayersLine,
          settings: RemixSettingsLine,
          search: RemixSearchLine,
          bell: RemixBellLine,
          folder: RemixFolderLine,
          plus: RemixPlusLine,
          trash: RemixTrashLine,
          check: RemixCheckLine,
          alert: RemixAlertLine,
          info: RemixInfoLine,
          close: RemixCloseLine,
          user: RemixUserLine,
          download: RemixDownloadLine,
          chevronDown: RemixChevronDown,
          chevronRight: RemixChevronRight,
        };
    const Component = remixMap[name] ?? RemixSparklesLine;
    return (
      <Component
        className={className}
        style={{
          ...baseStyle,
          fillOpacity: activeDuotone ? 0.22 : 1,
        }}
        aria-hidden={ariaHidden}
      />
    );
  }

  // 5. Default: Lucide Icons
  const lucideMap = {
    sparkles: LucideSparkles,
    shield: LucideShield,
    palette: LucidePalette,
    layers: LucideLayers,
    settings: LucideSettings,
    search: LucideSearch,
    bell: LucideBell,
    folder: LucideFolder,
    plus: LucidePlus,
    trash: LucideTrash,
    check: LucideCheck,
    alert: LucideAlert,
    info: LucideInfo,
    close: LucideClose,
    user: LucideUser,
    download: LucideDownload,
    chevronDown: LucideChevronDown,
    chevronRight: LucideChevronRight,
  };
  const Component = lucideMap[name] ?? LucideSparkles;
  return (
    <Component
      className={className}
      style={{
        ...baseStyle,
        fill: isSolid ? 'currentColor' : activeDuotone ? 'currentColor' : 'none',
        fillOpacity: isSolid ? 1 : activeDuotone ? 0.22 : 0,
      }}
      strokeWidth={isSolid ? 0.5 : resolvedStroke}
      aria-hidden={ariaHidden}
    />
  );
};
