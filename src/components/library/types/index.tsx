export type INavLink = {
  title: string;
  route: string;
  label: string;
};

/* Button props */
export type ButtonProps = {
  ButtonType?: "primary" | "secondary";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  ariaLabel?: string;
  disabled?: boolean;
  buttonType?: "violet" | "blue" | "transparent";
  type?: "button" | "submit" | "reset";
};

/* Typographic props */
export type H1Props = {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/* Loader Props */
export interface LoaderProps {
  theme?: "light" | "dark";
  className?: string;
}
