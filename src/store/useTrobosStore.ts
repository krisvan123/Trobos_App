import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  TripStatus,
  UserProfile,
  Vehicle,
  TandemUnit,
  LocationPoint,
  ActiveTrip,
  TripHistoryItem,
  AppNotification,
  HandoverChecklist,
  BreakdownProblemId,
  BreakdownProblem,
  PassengerTransportOption,
} from "@/types/trobos";
import {
  MOCK_USER,
  MOCK_VEHICLES,
  MOCK_LOCATIONS,
  MOCK_TANDEM,
  MOCK_TOWING,
  DEFAULT_FARE,
  MOCK_TRIP_HISTORY,
  MOCK_NOTIFICATIONS,
  BREAKDOWN_PROBLEMS,
  getPassengerTransportOption,
} from "@/lib/mockData";

interface TrobosStore {
  user: UserProfile;
  vehicles: Vehicle[];
  activeVehicleId: string;
  selectedDestination: LocationPoint;
  selectedWorkshop: LocationPoint;
  carDestinationType: 'WORKSHOP' | 'SAME_AS_PASSENGER';
  selectedProblemId: BreakdownProblemId;
  passengerCount: number;
  currentTrip: ActiveTrip | null;
  tripHistory: TripHistoryItem[];
  notifications: AppNotification[];
  isDemoRunning: boolean;
  demoTimerId: NodeJS.Timeout | null;
  isDriverOnline: boolean;
  hasDriverIncomingOrder: boolean;
  isAuthenticated: boolean;

  // Actions
  login: (email?: string) => void;
  logout: () => void;
  setSelectedDestination: (dest: LocationPoint) => void;
  setSelectedWorkshop: (shop: LocationPoint) => void;
  setCarDestinationType: (type: 'WORKSHOP' | 'SAME_AS_PASSENGER') => void;
  setSelectedProblemId: (id: BreakdownProblemId) => void;
  setPassengerCount: (count: number) => void;
  setActiveVehicleId: (id: string) => void;
  addVehicle: (v: Vehicle) => void;
  startBooking: (destination?: LocationPoint) => void;
  confirmBooking: () => void;
  assignTandem: () => void;
  setApproaching: () => void;
  setArrived: () => void;
  verifyOtp: (code: string) => boolean;
  toggleChecklistItem: (key: keyof Omit<HandoverChecklist, 'fuelRecorded' | 'confirmed'>) => void;
  setHandoverFuel: (level: number) => void;
  confirmVehicleHandover: () => void;
  updateLiveProgress: (userProg: number, carProg: number, userEta: number, carEta: number) => void;
  userArrivedAtDest: () => void;
  carArrivedAtDest: () => void;
  completeTrip: (rating: number, tags: string[]) => void;
  resetToIdle: () => void;
  jumpToState: (targetStatus: TripStatus) => void;
  runAutoSimulation: () => void;
  stopAutoSimulation: () => void;
  toggleDriverOnline: () => void;
  setDriverIncoming: (has: boolean) => void;
  markNotificationAsRead: (id: string) => void;
}

const INITIAL_HANDOVER: HandoverChecklist = {
  front: true,
  rear: true,
  left: true,
  right: true,
  interior: true,
  fuelRecorded: 65,
  problemConfirmed: true,
  confirmed: false,
};

export const useTrobosStore = create<TrobosStore>()(
  persist(
    (set, get) => ({
      user: MOCK_USER,
      vehicles: MOCK_VEHICLES,
      activeVehicleId: MOCK_VEHICLES[0].id,
      selectedDestination: MOCK_LOCATIONS.destinations[0],
      selectedWorkshop: MOCK_LOCATIONS.workshops[0],
      carDestinationType: 'WORKSHOP',
      selectedProblemId: 'engine_failure',
      passengerCount: 1,
      currentTrip: null,
      tripHistory: MOCK_TRIP_HISTORY,
      notifications: MOCK_NOTIFICATIONS,
      isDemoRunning: false,
      demoTimerId: null,
      isDriverOnline: true,
      hasDriverIncomingOrder: false,
      isAuthenticated: true,

      login: (email) => {
        set((state) => ({
          isAuthenticated: true,
          user: email ? { ...state.user, email } : state.user,
        }));
      },

      logout: () => {
        if (typeof window !== "undefined") {
          try {
            localStorage.removeItem("trobos_app_storage");
          } catch {}
        }
        set({
          isAuthenticated: false,
          currentTrip: null,
          isDemoRunning: false,
        });
      },

      setSelectedDestination: (dest) => set({ selectedDestination: dest }),
      setSelectedWorkshop: (shop) => set({ selectedWorkshop: shop }),
      setCarDestinationType: (type) => set({ carDestinationType: type }),
      setSelectedProblemId: (id) => set({ selectedProblemId: id }),
      setPassengerCount: (count) => {
        const validated = Math.max(1, Math.min(8, count));
        set({ passengerCount: validated });
      },
      setActiveVehicleId: (id) => set({ activeVehicleId: id }),

      addVehicle: (v) =>
        set((state) => ({
          vehicles: [...state.vehicles, v],
          activeVehicleId: v.id,
        })),

      startBooking: (destination) => {
        const state = get();
        const activeVeh =
          state.vehicles.find((v) => v.id === state.activeVehicleId) || state.vehicles[0];
        const dest = destination || state.selectedDestination;
        const workshop = state.selectedWorkshop;
        const carDest = state.carDestinationType === 'WORKSHOP' ? workshop : dest;

        const problem =
          BREAKDOWN_PROBLEMS.find((p) => p.id === state.selectedProblemId) ||
          BREAKDOWN_PROBLEMS[0];

        const passengerTransport = getPassengerTransportOption(state.passengerCount);

        // Calculate dynamic fare depending on passenger transport
        let extraTransportFare = 0;
        let passengerEta = 18;
        if (passengerTransport.type === "CAR") {
          extraTransportFare = 35000;
          passengerEta = 24;
        } else if (passengerTransport.type === "VAN") {
          extraTransportFare = 75000;
          passengerEta = 28;
        }

        const calculatedFare = {
          ...DEFAULT_FARE,
          distanceFare: DEFAULT_FARE.distanceFare + extraTransportFare,
          totalFare: DEFAULT_FARE.baseFare + DEFAULT_FARE.emergencyService + DEFAULT_FARE.towingFare + DEFAULT_FARE.distanceFare + extraTransportFare,
          estimatedPassengerMinutes: passengerEta,
          estimatedTowingMinutes: 32,
        };

        const newTrip: ActiveTrip = {
          id: `TRB-${Math.floor(10000 + Math.random() * 90000)}`,
          status: "REQUESTED",
          origin: MOCK_LOCATIONS.current,
          destination: dest,
          carDestination: carDest,
          carDestinationType: state.carDestinationType,
          problem,
          passengerCount: state.passengerCount,
          passengerTransport,
          vehicle: activeVeh,
          tandem: null,
          towingUnit: MOCK_TOWING,
          fare: calculatedFare,
          otpCode: "4821",
          handover: INITIAL_HANDOVER,
          userProgressPercent: 0,
          carProgressPercent: 0,
          userEtaMinutes: passengerEta,
          carEtaMinutes: 32,
          createdAt: new Date().toISOString(),
        };

        set({ currentTrip: newTrip });
      },

      confirmBooking: () => {
        set((state) => {
          if (!state.currentTrip) return {};
          return {
            currentTrip: {
              ...state.currentTrip,
              status: "SEARCHING_TANDEM",
            },
          };
        });
      },

      assignTandem: () => {
        set((state) => {
          if (!state.currentTrip) return {};
          return {
            currentTrip: {
              ...state.currentTrip,
              status: "TANDEM_ASSIGNED",
              tandem: MOCK_TANDEM,
            },
          };
        });
      },

      setApproaching: () => {
        set((state) => {
          if (!state.currentTrip) return {};
          return {
            currentTrip: {
              ...state.currentTrip,
              status: "TANDEM_APPROACHING",
              tandem: state.currentTrip.tandem || MOCK_TANDEM,
            },
          };
        });
      },

      setArrived: () => {
        set((state) => {
          if (!state.currentTrip) return {};
          return {
            currentTrip: {
              ...state.currentTrip,
              status: "TANDEM_ARRIVED",
            },
          };
        });
      },

      verifyOtp: (code: string) => {
        const trip = get().currentTrip;
        if (!trip) return false;
        if (code === trip.otpCode || code === "4821") {
          set({
            currentTrip: {
              ...trip,
              status: "VEHICLE_HANDOVER",
            },
          });
          return true;
        }
        return false;
      },

      toggleChecklistItem: (key) => {
        set((state) => {
          if (!state.currentTrip) return {};
          const currentVal = state.currentTrip.handover[key];
          return {
            currentTrip: {
              ...state.currentTrip,
              handover: {
                ...state.currentTrip.handover,
                [key]: !currentVal,
              },
            },
          };
        });
      },

      setHandoverFuel: (level) => {
        set((state) => {
          if (!state.currentTrip) return {};
          return {
            currentTrip: {
              ...state.currentTrip,
              handover: {
                ...state.currentTrip.handover,
                fuelRecorded: level,
              },
            },
          };
        });
      },

      confirmVehicleHandover: () => {
        set((state) => {
          if (!state.currentTrip) return {};
          return {
            currentTrip: {
              ...state.currentTrip,
              status: "TRIP_STARTED",
              handover: {
                ...state.currentTrip.handover,
                confirmed: true,
              },
            },
          };
        });
      },

      updateLiveProgress: (userProg, carProg, userEta, carEta) => {
        set((state) => {
          if (!state.currentTrip) return {};
          return {
            currentTrip: {
              ...state.currentTrip,
              userProgressPercent: userProg,
              carProgressPercent: carProg,
              userEtaMinutes: userEta,
              carEtaMinutes: carEta,
            },
          };
        });
      },

      userArrivedAtDest: () => {
        set((state) => {
          if (!state.currentTrip) return {};
          return {
            currentTrip: {
              ...state.currentTrip,
              status: "USER_ARRIVED",
              userProgressPercent: 100,
              userEtaMinutes: 0,
            },
          };
        });
      },

      carArrivedAtDest: () => {
        set((state) => {
          if (!state.currentTrip) return {};
          return {
            currentTrip: {
              ...state.currentTrip,
              status: "VEHICLE_ARRIVED",
              carProgressPercent: 100,
              carEtaMinutes: 0,
            },
          };
        });
      },

      completeTrip: (rating, tags) => {
        const state = get();
        if (!state.currentTrip) return;

        const completedItem: TripHistoryItem = {
          id: state.currentTrip.id,
          date: new Date().toISOString(),
          origin: state.currentTrip.origin.name,
          destination: state.currentTrip.destination.name,
          carDestination: state.currentTrip.carDestination.name,
          problemLabel: state.currentTrip.problem.label,
          passengerCount: state.currentTrip.passengerCount,
          passengerTransportType: state.currentTrip.passengerTransport.type,
          fare: state.currentTrip.fare.totalFare,
          distanceKm: state.currentTrip.fare.distanceKm,
          status: "Completed",
          vehiclePlate: state.currentTrip.vehicle.plate,
          riderName: state.currentTrip.passengerTransport.driverName || "Rizky Pratama",
          driverName: state.currentTrip.towingUnit.operatorName || "Pak Slamet (Towing)",
          rating: rating || 5,
        };

        set({
          currentTrip: {
            ...state.currentTrip,
            status: "COMPLETED",
            rating,
            feedbackTags: tags,
          },
          tripHistory: [completedItem, ...state.tripHistory],
        });
      },

      resetToIdle: () => {
        set({
          currentTrip: null,
          isDemoRunning: false,
        });
      },

      jumpToState: (targetStatus) => {
        const state = get();
        const activeVeh =
          state.vehicles.find((v) => v.id === state.activeVehicleId) || state.vehicles[0];

        if (targetStatus === "IDLE") {
          set({ currentTrip: null, isDemoRunning: false });
          return;
        }

        const problem =
          BREAKDOWN_PROBLEMS.find((p) => p.id === state.selectedProblemId) ||
          BREAKDOWN_PROBLEMS[0];
        const passengerTransport = getPassengerTransportOption(state.passengerCount);

        const baseTrip: ActiveTrip = state.currentTrip || {
          id: `TRB-DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
          status: targetStatus,
          origin: MOCK_LOCATIONS.current,
          destination: state.selectedDestination,
          carDestination: state.selectedWorkshop,
          carDestinationType: state.carDestinationType,
          problem,
          passengerCount: state.passengerCount,
          passengerTransport,
          vehicle: activeVeh,
          tandem: MOCK_TANDEM,
          towingUnit: MOCK_TOWING,
          fare: DEFAULT_FARE,
          otpCode: "4821",
          handover: INITIAL_HANDOVER,
          userProgressPercent: 35,
          carProgressPercent: 20,
          userEtaMinutes: 12,
          carEtaMinutes: 25,
          createdAt: new Date().toISOString(),
        };

        let userProg = baseTrip.userProgressPercent;
        let carProg = baseTrip.carProgressPercent;
        let userEta = baseTrip.userEtaMinutes;
        let carEta = baseTrip.carEtaMinutes;

        if (targetStatus === "TRIP_STARTED") {
          userProg = 45;
          carProg = 25;
          userEta = 11;
          carEta = 24;
        } else if (targetStatus === "USER_ARRIVED") {
          userProg = 100;
          carProg = 65;
          userEta = 0;
          carEta = 12;
        } else if (targetStatus === "VEHICLE_ARRIVED" || targetStatus === "COMPLETED") {
          userProg = 100;
          carProg = 100;
          userEta = 0;
          carEta = 0;
        }

        set({
          currentTrip: {
            ...baseTrip,
            status: targetStatus,
            tandem: MOCK_TANDEM,
            towingUnit: MOCK_TOWING,
            userProgressPercent: userProg,
            carProgressPercent: carProg,
            userEtaMinutes: userEta,
            carEtaMinutes: carEta,
          },
        });
      },

      runAutoSimulation: () => {
        const store = get();
        store.stopAutoSimulation();

        set({ isDemoRunning: true });

        // Step 1: Start requested
        store.startBooking(MOCK_LOCATIONS.destinations[0]);

        setTimeout(() => {
          get().confirmBooking(); // SEARCHING_TANDEM
        }, 1500);

        setTimeout(() => {
          get().assignTandem(); // TANDEM_ASSIGNED
        }, 4000);

        setTimeout(() => {
          get().setApproaching(); // TANDEM_APPROACHING
        }, 6500);

        setTimeout(() => {
          get().setArrived(); // TANDEM_ARRIVED (OTP)
        }, 9500);

        setTimeout(() => {
          get().verifyOtp("4821"); // VEHICLE_HANDOVER
        }, 13000);

        setTimeout(() => {
          get().confirmVehicleHandover(); // TRIP_STARTED
        }, 16500);

        setTimeout(() => {
          get().userArrivedAtDest(); // USER_ARRIVED
        }, 22000);

        setTimeout(() => {
          get().carArrivedAtDest(); // VEHICLE_ARRIVED
        }, 26000);

        setTimeout(() => {
          get().completeTrip(5, ["Towing Sigap", "Penumpang Cepat Tiba"]);
          set({ isDemoRunning: false });
        }, 29000);
      },

      stopAutoSimulation: () => {
        set({ isDemoRunning: false });
      },

      toggleDriverOnline: () =>
        set((state) => ({ isDriverOnline: !state.isDriverOnline })),

      setDriverIncoming: (has) =>
        set({ hasDriverIncomingOrder: has }),

      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
    }),
    {
      name: "trobos_app_storage",
      partialize: (state) => ({
        user: state.user,
        vehicles: state.vehicles,
        activeVehicleId: state.activeVehicleId,
        selectedDestination: state.selectedDestination,
        selectedWorkshop: state.selectedWorkshop,
        carDestinationType: state.carDestinationType,
        selectedProblemId: state.selectedProblemId,
        passengerCount: state.passengerCount,
        tripHistory: state.tripHistory,
      }),
    }
  )
);
