export type INavLink = {
  title: string;
  route: string;
  label: string;
};

/* Auth props */
export type User = {
  name: string;
  email: string;
  bio: string;
  venueManager: boolean;
  avatar?: {
    url: string;
    alt: string;
  };

  banner?: {
    url: string;
    alt: string;
  };
};

export interface LoginProfile {
  email: string;
  password: string;
}
export interface RegisterProfile {
  name: string;
  email: string;
  password: string;
}

export type UserProfile = {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
  venueManager: boolean;
  venues: Venue[];
  bookings: Booking[];
  _count: {
    venues: number;
    bookings: number;
  };
};

export interface EditUserProfile {
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
}

export interface ProfileResponse {
  data: UserProfile;
  meta: Record<string, unknown>;
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

export interface BookingData {
  id: string;
  created: string;
  updated: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venue: Venue;
}

export interface MetaData {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}

export interface BookingsResponse {
  data: Booking[];
  meta: MetaData;
}

/* Button props */
export type ButtonProps = {
  ButtonType?: "primary" | "secondary";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  ariaLabel?: string;
  disabled?: boolean;
  buttonType?: "violet" | "violetSecondary" | "blue" | "transparent";
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

export interface MetaData {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}

export interface VenuesResponse {
  data: Venue[];
  meta: MetaData;
}

/* BreadCrumb props */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
  isDropdown?: boolean;
  dropdownItems?: { label: string; href?: string }[];
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  goBack?: boolean;
  className?: string;
}
