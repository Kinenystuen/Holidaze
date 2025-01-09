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

/* Venue props */ /////////////////////////////
export interface Media {
  url: string;
  alt: string;
}

export interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export interface Avatar {
  url: string;
  alt: string;
}

export interface Banner {
  url: string;
  alt: string;
}

export interface Owner {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
}

export interface Customer {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: Customer;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Meta;
  location: Location;
  owner: Owner;
  bookings: Booking[];
}
