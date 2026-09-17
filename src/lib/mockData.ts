import {
  UserProfile,
  Vehicle,
  Rider,
  Driver,
  TandemUnit,
  LocationPoint,
  FareBreakdown,
  TripHistoryItem,
  AppNotification,
} from "@/types/trobos";

export const MOCK_USER: UserProfile = {
  id: "usr_trobos_01",
  name: "Andi Pratama",
  email: "andi.pratama@gmail.com",
  phone: "+62 812-3456-7890",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80",
  rating: 4.96,
  emergencyContact: {
    name: "Ratna Dewi (Istri)",
    phone: "+62 811-9876-5432",
    relation: "Istri",
  },
};

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "veh_01",
    brand: "Honda",
    model: "Civic RS Turbo",
    year: 2023,
    color: "Meteoroid Gray",
    plate: "B 1234 XYZ",
    fuelLevel: 65,
    stnkVerified: true,
    type: "Sedan",
    transmission: "Automatic",
  },
  {
    id: "veh_02",
    brand: "Toyota",
    model: "Innova Zenix Hybrid",
    year: 2024,
    color: "Platinum White Pearl",
    plate: "B 7890 KLR",
    fuelLevel: 80,
    stnkVerified: true,
    type: "MPV",
    transmission: "Automatic",
  },
];

export const MOCK_LOCATIONS: {
  current: LocationPoint;
  destinations: LocationPoint[];
} = {
  current: {
    name: "Jl. Jenderal Sudirman Kav. 28",
    address: "Depan Mayapada Tower 2, Karet Semanggi, Jakarta Selatan",
    lat: -6.2155,
    lng: 106.8217,
    areaTag: "Macet Parah (V/C 0.92)",
  },
  destinations: [
    {
      name: "Pacific Place / SCBD",
      address: "Jl. Jend. Sudirman Kav 52-53, Senayan, Kebayoran Baru",
      lat: -6.2244,
      lng: 106.8098,
      areaTag: "Pusat Bisnis SCBD",
    },
    {
      name: "Bandara Soekarno-Hatta (Terminal 3)",
      address: "Pajang, Benda, Kota Tangerang, Banten",
      lat: -6.1256,
      lng: 106.6559,
      areaTag: "Flight Departure Rush",
    },
    {
      name: "Plaza Indonesia / Bundaran HI",
      address: "Jl. M.H. Thamrin No. 28-30, Gondangdia, Menteng",
      lat: -6.1928,
      lng: 106.8229,
      areaTag: "Area Thamrin Ring 1",
    },
    {
      name: "Mega Kuningan (World Capital Tower)",
      address: "Jl. Mega Kuningan Barat No. 3, Setiabudi",
      lat: -6.2285,
      lng: 106.8268,
      areaTag: "Kuningan Diplomatic Zone",
    },
  ],
};

export const MOCK_RIDER: Rider = {
  id: "rdr_88",
  name: "Rizky Pratama",
  rating: 4.88,
  tripsCount: 1420,
  phone: "+62 813-8822-9011",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
  bikeModel: "Yamaha NMAX 155 Connected",
  plate: "B 6890 PQR",
};

export const MOCK_DRIVER: Driver = {
  id: "drv_99",
  name: "Budi Santoso",
  rating: 4.95,
  tripsCount: 980,
  phone: "+62 812-7711-4455",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
  licenseNumber: "SIM A Verified (Exp. 2029)",
  safetyBadge: "Certified Defensive Driver",
  badgeType: "Gold Master",
};

export const MOCK_TANDEM: TandemUnit = {
  rider: MOCK_RIDER,
  driver: MOCK_DRIVER,
};

export const DEFAULT_FARE: FareBreakdown = {
  baseFare: 35000,
  emergencyService: 30000,
  distanceFare: 14000,
  surgeFare: 10000,
  totalFare: 89000,
  distanceKm: 6.8,
  estimatedMotorMinutes: 18,
  estimatedCarMinutes: 31,
};

export const MOCK_TRIP_HISTORY: TripHistoryItem[] = [
  {
    id: "TRB-90211",
    date: "2026-09-15T17:45:00Z",
    origin: "Gatot Subroto (Wisma Mulia)",
    destination: "Stasiun Gambir Pintu Timur",
    fare: 115000,
    distanceKm: 9.4,
    status: "Completed",
    vehiclePlate: "B 1234 XYZ",
    riderName: "Fajar Ramadhan",
    driverName: "Hendra Wijaya",
    rating: 5,
  },
  {
    id: "TRB-88319",
    date: "2026-09-10T08:30:00Z",
    origin: "Kuningan City",
    destination: "SCBD Lot 8",
    fare: 78000,
    distanceKm: 4.8,
    status: "Completed",
    vehiclePlate: "B 1234 XYZ",
    riderName: "Rizky Pratama",
    driverName: "Budi Santoso",
    rating: 5,
  },
  {
    id: "TRB-77102",
    date: "2026-08-28T18:15:00Z",
    origin: "Rasuna Said (KPK)",
    destination: "Senayan City Mall",
    fare: 92000,
    distanceKm: 7.2,
    status: "Completed",
    vehiclePlate: "B 1234 XYZ",
    riderName: "Dimas Anggara",
    driverName: "Agus Pratama",
    rating: 5,
  },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif_1",
    title: "Tandem Ditemukan!",
    message: "Rider Rizky dan Driver Budi sedang meluncur ke Sudirman Kav. 28.",
    timestamp: "2 menit lalu",
    read: false,
    type: "alert",
  },
  {
    id: "notif_2",
    title: "Inspeksi Serah Terima Selesai",
    message: "Mobil Honda Civic RS Anda telah diverifikasi oleh Driver Budi Santoso.",
    timestamp: "15 menit lalu",
    read: false,
    type: "info",
  },
  {
    id: "notif_3",
    title: "Perjalanan Sukses Selesai",
    message: "Perjalanan TRB-90211 telah selesai. Terima kasih telah menggunakan Trobos.",
    timestamp: "2 hari lalu",
    read: true,
    type: "success",
  },
  {
    id: "notif_4",
    title: "Proteksi Asuransi Aktif",
    message: "Kendaraan Anda otomatis terproteksi polis komprehensif hingga Rp 1.000.000.000.",
    timestamp: "3 hari lalu",
    read: true,
    type: "info",
  },
];

export const FAQS = [
  {
    q: "Bagaimana cara kerja sistem Tandem Trobos?",
    a: "Satu unit Tandem terdiri dari 1 Rider motor profesional dan 1 Driver mobil berpengalaman. Mereka datang bersamaan ke titik kemacetan Anda. Rider akan membawa Anda menembus macet menuju tujuan dengan motor, sementara Driver mengambil alih dan mengemudikan mobil Anda menyusul ke tujuan yang sama.",
  },
  {
    q: "Siapa yang mengemudikan mobil saya? Apakah aman?",
    a: "Mobil Anda hanya dikemudikan oleh Driver mitra Trobos yang telah lolos verifikasi SIM A, pemeriksaan latar belakang SKCK Kepolisian, tes mengemudi defensif, dan bersertifikasi keahlian transmisi matic/manual.",
  },
  {
    q: "Apakah mobil saya dilindungi asuransi selama di perjalanan?",
    a: "Ya, 100%! Setiap kilometer perjalanan Trobos dilindungi asuransi komprehensif all-risk hingga Rp 1.000.000.000 per insiden yang mencakup kerusakan fisik, pihak ketiga, dan perlindungan total.",
  },
  {
    q: "Bagaimana jika saya sampai lebih awal daripada mobil saya?",
    a: "Ini adalah skenario normal karena motor jauh lebih lincah di kemacetan! Anda bisa langsung menghadiri rapat atau urusan Anda di lobi tujuan. Anda dapat memantau posisi GPS mobil secara real-time via aplikasi dan mengambil kunci saat mobil tiba.",
  },
  {
    q: "Bagaimana proses verifikasi serah terima kendaraan?",
    a: "Sebelum mobil diserahkan, Driver akan memverifikasi kode OTP 4-digit unik dari aplikasi Anda, melakukan checklist foto 5 sudut (depan, belakang, kanan, kiri, interior), serta mencatat level bahan bakar (BBM) Anda.",
  },
];
