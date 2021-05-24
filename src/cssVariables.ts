import * as Chroma from "chroma-js";
import * as VimPalettes from "./iceberg/vim-palettes";

const vimPalette = VimPalettes.Dark.Palette;

const baseColors = {
  blue: vimPalette.colors.blue,
  green: vimPalette.colors.green,
  lblue: vimPalette.colors.lblue,
  orange: vimPalette.colors.orange,
  purple: vimPalette.colors.purple,
  red: vimPalette.colors.red,

  black: vimPalette.ansi.black,
  brightBlack: vimPalette.ansi.brightBlack,
  white: vimPalette.ansi.white,
  brightWhite: vimPalette.ansi.brightWhite,
} as const;

const lightColors = {
  lightBlue: baseColors.blue.lighten(0.08),
  lightOrange: baseColors.orange.lighten(0.08),
} as const;

type BaseColorName = keyof typeof baseColors;
type LightColorName = keyof typeof lightColors;
type RootColorName = BaseColorName | LightColorName;

const cssVar = (c: RootColorName) => `var(--${c})`;

export const cssVariablesThemeDark = (): Record<string, string> => {
  const predefinedColors: Record<string, string> = {
    "background-primary": vimPalette.normal.bg.hex(),
    "background-primary-alt": vimPalette.statuslinenc.bg.hex(),
    "background-secondary": cssVar("black"),
    "background-secondary-alt": vimPalette.statuslinenc.bg.hex(),
    // "background-modifier-border"
    // "background-modifier-form-field"
    // "background-modifier-form-field-highlighted"
    // "background-modifier-box-shadow"
    "background-modifier-success": cssVar("green"),
    "background-modifier-error": cssVar("red"),
    "background-modifier-error-rgb": Chroma(baseColors.red.hex()).rgb().join(", "),
    // "background-modifier-error-hover"
    // "background-modifier-cover"
    "text-accent": cssVar("orange"),
    "text-accent-hover": cssVar("lightOrange"),
    "text-normal": cssVar("white"),
    "text-muted": cssVar("brightBlack"),
    // "text-muted-rgb"
    "text-faint": cssVar("brightBlack"),
    "text-error": cssVar("red"),
    // "text-error-hover"
    "text-highlight-bg": cssVar("orange"), // TODO: tint
    // "text-highlight-bg-active"
    "text-selection": cssVar("lblue"),
    "text-on-accent": cssVar("black"),
    // "interactive-normal"
    // "interactive-hover"
    "interactive-accent": cssVar("blue"),
    // "interactive-accent-gb"
    "interactive-accent-hover": cssVar("lightBlue"),
    "interactive-success": cssVar("green"),
    // "scrollbar-active-thumb-bg"
    // "scrollbar-bg"
    // "scrollbar-thumb-bg"
    // "highlight-mix-blend-mode"
  };

  const additionalColors: Record<string, string> = {
    "text-strong": cssVar("brightWhite"),
    "text-inline-code": cssVar("blue"),
    "background-tag": cssVar("brightBlack"),
    "background-tag-hover": baseColors.brightBlack.lighten(0.08).hex(),
    "text-tag": cssVar("black"),
    "background-block-cursor": cssVar("white"),
  };

  return Object.assign({}, predefinedColors, additionalColors);
};

export const cssVariablesRoot = (): Record<string, string> => {
  const vars = {} as Record<RootColorName, string>;

  for (const key of Object.keys(baseColors) as BaseColorName[]) {
    vars[key] = baseColors[key].hex();
  }
  for (const key of Object.keys(lightColors) as LightColorName[]) {
    vars[key] = lightColors[key].hex();
  }

  return vars;
};
