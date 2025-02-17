import { INavLink, User } from "../types";

export const apiHostUrl = import.meta.env.VITE_API_HOST_URL;
export const apiKey = import.meta.env.VITE_API_KEY;

export const headerNavLinks: INavLink[] = [
  { label: "Venues", route: "/venues", title: "Venues", requiresAuth: false },
  {
    label: "Profiles",
    route: "/profiles",
    title: "Profiles",
    requiresAuth: true
  }
];

export const INITIAL_USER: User = {
  name: "",
  email: "",
  bio: "",
  avatar: {
    url: "",
    alt: "Default avatar"
  },
  banner: {
    url: "",
    alt: "Default banner"
  },
  venueManager: false
};
