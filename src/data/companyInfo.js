// Company contact details, addresses and social links.
// Deliberately its own module: ~15 components need only this object, and importing it
// from a bulk-data file would pull that file into the initial bundle.

export const companyInfo = {
  name: "Traverse Globe",
  tagline: "Travel the world, the right way",
  description: "Your trusted travel partner for unforgettable journeys across the world. We specialize in creating unique travel experiences that you'll cherish forever.",
  email: {
    primary: "mail@traverseglobe.com",
    info: "info@traverseglobe.com",
    holidays: "holidays@traverseglobe.com",
    marketing: "marketing@traverseglobe.com",
    care: "care@traverseglobe.com",
    sponsorship: "sponsorship@traverseglobe.com"
  },
  phone: {
    primary: "+91 9997085457",
    whatsapp: "919997085457",
    dubai: "+971 55 485 8225"
  },
  address: {
    delhi: {
      full: "3rd Floor, L2- 253, Baba Gangnath Market, Munirka, New Delhi, Delhi 110067",
      city: "Delhi",
      mapLink: "https://www.google.com/maps/search/?api=1&query=Baba+Gangnath+Market+Munirka+New+Delhi+110067"
    },
    dubai: {
      full: "3B - Al Sharhan Building, Al Nahda 2, Dubai, UAE"
    }
  },
  social: {
    facebook: "https://www.facebook.com/traverseglob/",
    instagram: "https://www.instagram.com/traverse.globe/?hl=en",
    linkedin: "https://www.linkedin.com/company/traverse-globe"
  },
  website: "https://traverseglobe.com/"
};
