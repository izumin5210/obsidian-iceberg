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

type BaseColorName = keyof typeof baseColors;

const cssVar = (c: BaseColorName) => `var(--${c})`;

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
    // "background-modifier-success"
    // "background-modifier-error"
    "background-modifier-error-rgb": Chroma(baseColors.red.hex()).rgb().join(", "),
    // "background-modifier-error-hover"
    // "background-modifier-cover"
    "text-accent": cssVar("orange"),
    // "text-accent-hover"
    "text-normal": cssVar("white"),
    "text-muted": cssVar("brightBlack"),
    // "text-muted-rgb"
    "text-faint": cssVar("brightBlack"),
    // "text-error"
    // "text-error-hover"
    "text-highlight-bg": cssVar("orange"), // TODO: tint
    // "text-highlight-bg-active"
    "text-selection": cssVar("lblue"),
    "text-on-accent": cssVar("black"),
    // "interactive-normal"
    // "interactive-hover"
    "interactive-accent": cssVar("blue"),
    // "interactive-accent-rgb"
    // "interactive-accent-hover"
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
    "text-tag": cssVar("blue"),
  };

  return Object.assign({}, predefinedColors, additionalColors);
};

export const cssVariablesRoot = (): Record<string, string> => {
  const vars = {} as Record<BaseColorName, string>;

  for (const key of Object.keys(baseColors)) {
    vars[key as BaseColorName] = baseColors[key as BaseColorName].hex();
  }

  return vars;
};
