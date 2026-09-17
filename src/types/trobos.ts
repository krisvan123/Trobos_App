export type TripStatus =
  | 'IDLE'
  | 'REQUESTED'
  | 'SEARCHING_TANDEM'
  | 'TANDEM_ASSIGNED'
  | 'TANDEM_APPROACHING'
  | 'TANDEM_ARRIVED'
  | 'VERIFICATION'
  | 'VEHICLE_HANDOVER'
  | 'TRIP_STARTED'
  | 'USER_ARRIVED'
  | 'VEHICLE_ARRIVED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface LocationPoint {
  name: string;
  address: string;
  lat: number;
  lng: number;
  areaTag?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  rating: number;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  plate: string;
  fuelLevel: number; // 0 - 100 percentage
  stnkVerified: boolean;
  type: 'Sedan' | 'SUV' | 'Hatchback' | 'MPV';
  transmission: 'Automatic' | 'Manual';
}

export interface Rider {
  id: string;
  name: string;
  rating: number;
  tripsCount: number;
  phone: string;
  avatar: string;
  bikeModel: string;
  plate: string;
}

export interface Driver {
  id: string;
  name: string;
  rating: number;
  tripsCount: number;
  phone: string;
  avatar: string;
  licenseNumber: string;
  safetyBadge: string;
  badgeType: 'Gold Master' | 'Defensive Certified' | 'Senior Pilot';
}

export interface TandemUnit {
  rider: Rider;
  driver: Driver;
}

export interface FareBreakdown {
  baseFare: number;
  emergencyService: number;
  distanceFare: number;
  surgeFare: number;
  totalFare: number;
  distanceKm: number;
  estimatedMotorMinutes: number;
  estimatedCarMinutes: number;
}

export interface HandoverChecklist {
  front: boolean;
  rear: boolean;
  left: boolean;
  right: boolean;
  interior: boolean;
  fuelRecorded: number;
  confirmed: boolean;
}

export interface ActiveTrip {
  id: string;
  status: TripStatus;
  origin: LocationPoint;
  destination: LocationPoint;
  vehicle: Vehicle;
  tandem: TandemUnit | null;
  fare: FareBreakdown;
  otpCode: string;
  handover: HandoverChecklist;
  userProgressPercent: number; // 0 to 100
  carProgressPercent: number;  // 0 to 100
  userEtaMinutes: number;
  carEtaMinutes: number;
  rating?: number;
  feedbackTags?: string[];
  createdAt: string;
}

export interface TripHistoryItem {
  id: string;
  date: string;
  origin: string;
  destination: string;
  fare: number;
  distanceKm: number;
  status: 'Completed' | 'Cancelled';
  vehiclePlate: string;
  riderName: string;
  driverName: string;
  rating: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'alert' | 'success' | 'info';
}
