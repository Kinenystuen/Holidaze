export type INavLink = {
  title: string;
  route: string;
  label: string;
  requiresAuth: boolean;
};

/* Auth props */
export type User = {
  name: string;
  email: string;
  bio: string;
  venueManager: boolean;
  avatar?: Media;
  banner?: Media;
  _count?: {
    venues: number;
    bookings: number;
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
  avatar: Media;
  banner: Media;
  venueManager: boolean;
  venues?: Venue[];
  bookings?: Booking[];
  _count: {
    venues: number;
    bookings: number;
  };
};

export interface EditUserProfile {
  bio: string;
  avatar: Media;
  banner: Media;
  venueManager: boolean;
}

/* Profile API Responses */
export interface ProfileResponse {
  data: UserProfile;
  meta: Record<string, unknown>;
}

export interface UsersResponse {
  data: UserProfile[];
  meta: PaginationMeta;
}

export type PaginationMeta = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
};

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue?: Venue;
  customer?: Customer;
}

export interface BookingData {
  venueName: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}
export interface EditBookingData {
  dateFrom: string;
  dateTo: string;
  guests: number;
}

export interface BookingsResponse {
  data: Booking[];
  meta: PaginationMeta;
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

export interface Owner {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
}

export interface Customer {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
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

export interface VenuesResponse {
  data: Venue[];
  meta: PaginationMeta;
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
