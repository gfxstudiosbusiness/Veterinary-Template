/**
 * MOCK DATABASE LAYER
 * Simulating a backend with localStorage + artificial delay.
 */

const STORAGE_KEYS = {
  GRADUATES: "cos_graduates_v2",
  APPOINTMENTS: "cos_appointments",
  TESTIMONIALS: "cos_testimonials",
  VETS: "cos_vets",
  SETTINGS: "cos_settings",
};

// Seed data with REAL images from public/images/graduates
const DEFAULT_GRADUATES = [
  {
    id: "grad_kitkat",
    name: "Kitkat",
    owner: "Owner",
    image: "/images/graduates/KITKAT.jpg",
    batch: "2026",
    story: "Officially Protected!",
  },
  {
    id: "grad_mallows",
    name: "Mallows",
    owner: "Owner",
    image: "/images/graduates/MALLOWS.jpg",
    batch: "2026",
    story: "Brave soul, done with vaccinations.",
  },
  {
    id: "grad_smashi",
    name: "Smashi",
    owner: "Owner",
    image: "/images/graduates/SMASHI.jpg",
    batch: "2026",
    story: "Ready for the world!",
  },
  {
    id: "grad_oreo",
    name: "Oreo",
    owner: "Owner",
    image: "/images/graduates/OREO.jpg",
    batch: "2026",
    story: "Officially protected.",
  },
  {
    id: "grad_bailey",
    name: "Bailey",
    owner: "Owner",
    image: "/images/graduates/BAILEY.jpg",
    batch: "2026",
    story: "Look at that smile!",
  },
  {
    id: "grad_coco",
    name: "Coco",
    owner: "Owner",
    image: "/images/graduates/COCO.jpg",
    batch: "2026",
    story: "Happy and healthy.",
  },
  {
    id: "grad_mallows2",
    name: "Mallows",
    owner: "Owner",
    image: "/images/graduates/MALLOWS (2).jpg",
    batch: "2026",
    story: "A true champion.",
  },
  {
    id: "grad_joker",
    name: "Joker",
    owner: "Owner",
    image: "/images/graduates/JOKER.jpg",
    batch: "2026",
    story: "Vaccinated and loved.",
  },
  {
    id: "grad_shantal",
    name: "Shantal",
    owner: "Owner",
    image: "/images/graduates/SHANTAL.jpg",
    batch: "2026",
    story: "One step closer to forever.",
  },
  {
    id: "grad_blue",
    name: "Blue",
    owner: "Owner",
    image: "/images/graduates/BLUE.jpg",
    batch: "2026",
    story: "Safe and sound.",
  },
  {
    id: "grad_rabin",
    name: "Rabin",
    owner: "Owner",
    image: "/images/graduates/RABIN.jpg",
    batch: "2026",
    story: "Officially a COS Graduate!",
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: "t1",
    author: "Sherie Lou Fortuno",
    body: "The vet doctor has a very sincere and caring attitude towards pets. She gave us a comprehensive explanation of Boa’s condition.",
    image: "/images/Screenshot 2026-02-02 221421.png",
    rating: 5
  },
  {
    id: "t2",
    author: "Arnold Glenn Managbanag",
    body: "Transparent. That's what I liked most about COS. They will lay out all the potential costs... so you know how much you'll spend.",
    image: "/images/Screenshot 2026-02-02 221501.png",
    rating: 5
  },
  {
    id: "t3",
    author: "Aprille Flores",
    body: "Best experience in a Vet Clinic! The Vet and staffs are very approachable... they are definitely ANIMAL-LOVERS!",
    image: "/images/Screenshot 2026-02-02 221525.png",
    rating: 5
  },
  {
    id: "t4",
    author: "Stanley Aguda",
    body: "Our go-to vet since we moved here.",
    image: "/images/Screenshot 2026-02-02 221609.png",
    rating: 5
  },
];

const DEFAULT_VETS = [
  {
    id: "v1",
    name: "Doc CC",
    role: "Senior Veterinarian",
    image: "/images/vet3.jpg",
    color: "bg-teal-100 text-teal-700"
  },
  {
    id: "v2",
    name: "Doc Bel",
    role: "Veterinarian",
    image: "/images/vet1.jpg",
    color: "bg-sky-100 text-sky-700"
  },
  {
    id: "v3",
    name: "Doc James",
    role: "Veterinarian",
    image: "/images/vet2.jpg",
    color: "bg-indigo-100 text-indigo-700"
  }
];

// Default clinic settings
const DEFAULT_SETTINGS = {
  // Days of week that are available (0=Sunday, 1=Monday, etc.)
  // Default: Tuesday-Sunday (closed Monday)
  availableDays: [0, 2, 3, 4, 5, 6],
  
  // Specific dates that are blocked (holidays, special closures)
  blockedDates: [],
  
  // Available time slots
  timeSlots: [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM"
  ],
  
  // Operating hours info (for display)
  openTime: "9:00 AM",
  closeTime: "5:00 PM"
};

// Helper to simulate network delay
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to get data safely
const getStorage = (key, defaultData = []) => {
  if (typeof window === "undefined") return defaultData;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(stored);
};

// Helper to set data
const setStorage = (key, data) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const api = {
  graduates: {
    getAll: async () => {
      await delay();
      return getStorage(STORAGE_KEYS.GRADUATES, DEFAULT_GRADUATES);
    },
    add: async (graduate) => {
      await delay();
      const current = getStorage(STORAGE_KEYS.GRADUATES, DEFAULT_GRADUATES);
      const newGrad = { ...graduate, id: `grad_${Date.now()}`, date: new Date().toISOString() };
      const updated = [newGrad, ...current];
      setStorage(STORAGE_KEYS.GRADUATES, updated);
      return newGrad;
    },
  },
  testimonials: {
    getAll: async () => {
      await delay();
      return getStorage(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
    },
    update: async (testimonials) => {
      await delay();
      setStorage(STORAGE_KEYS.TESTIMONIALS, testimonials);
      return testimonials;
    }
  },
  vets: {
    getAll: async () => {
      await delay();
      return getStorage(STORAGE_KEYS.VETS, DEFAULT_VETS);
    },
    update: async (vets) => {
      await delay();
      setStorage(STORAGE_KEYS.VETS, vets);
      return vets;
    }
  },
  appointments: {
    getAll: async () => {
      await delay();
      return getStorage(STORAGE_KEYS.APPOINTMENTS, []);
    },
    create: async (appointment) => {
      await delay();
      const current = getStorage(STORAGE_KEYS.APPOINTMENTS, []);
      const newAppt = { 
        ...appointment, 
        id: `apt_${Date.now()}`, 
        status: "Pending",
        createdAt: new Date().toISOString() 
      };
      const updated = [newAppt, ...current];
      setStorage(STORAGE_KEYS.APPOINTMENTS, updated);
      return newAppt;
    },
    updateStatus: async (id, status) => {
      await delay();
      const current = getStorage(STORAGE_KEYS.APPOINTMENTS, []);
      const updated = current.map(apt => 
        apt.id === id ? { ...apt, status } : apt
      );
      setStorage(STORAGE_KEYS.APPOINTMENTS, updated);
      return updated.find(apt => apt.id === id);
    }
  },
  stats: {
    getDashboardStats: async () => {
      await delay();
      const grads = getStorage(STORAGE_KEYS.GRADUATES, DEFAULT_GRADUATES);
      const appts = getStorage(STORAGE_KEYS.APPOINTMENTS, []);
      return {
        totalPatients: 120 + appts.length,
        graduates: grads.length,
        appointmentsPending: appts.filter(a => a.status === 'Pending').length
      };
    }
  },
  settings: {
    get: async () => {
      await delay(100); // Faster for settings
      return getStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    },
    update: async (settings) => {
      await delay();
      setStorage(STORAGE_KEYS.SETTINGS, settings);
      return settings;
    }
  }
};
