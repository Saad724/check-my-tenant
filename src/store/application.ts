import { format } from "date-fns";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Tenant = {
  email: string | undefined;
  landlordId: string;
  propertyId: string;
  nin: string;
  surname: string;
  otherNames: string;
  contactAddress: string;
  nationality: string;
  passportNo: string;
  stateOfOrigin: string;
  localGovernment: string;
  townOfOrigin: string;
  maritalStatus: string;
  dateOfBirth: string;
  telephone: string;
  personalEmail: string;
  numberOfChildren: number;
  domicileEmail: string;
  profession: string;
  position: string;
  officeAddress: string;
  formOfIdentification: string;
  officePhone: string;
  spouse: {
    surname: string;
    otherNames: string;
    address: string;
    telephone: string;
    placeOfWork: string;
  };
  nextOfKin: {
    name: string;
    address: string;
    telephone: string;
    relationship: string;
    placeOfWork: string;
  };
  purpose: {
    residential: boolean;
    commercial: boolean;
  };
  desiredImprovement: string;
  factorsStimulatingInterest: string;
  initialRentAccepted: string;
  petsInfo: string;
  numberOfVehicles: string;
  presentResidenceAddress: string;
  bedroomPreference: string;
  rentPaymentFrequency: string;
  personResponsibleForRentPayment: string;
  numberOfOccupants: number;
  sourceOfIncome: string;
  nameAndAddressOfPresentLandlord: string;
  reasonForLeavingPresentResidence: string;
  listOfDependents: string[];
  religion: string;
  otherReligion: string;
  nameAndContactOfPastor: string;
  placeOfWorship: string;
  possessionTiming: {
    immediately: boolean;
    oneMonth: boolean;
    threeMonths: boolean;
  };
  guarantors: Array<{
    name: string;
    email: string;
    age: number;
    telephone: string;
    address: string;
    placeOfWorkAddress: string;
    occupation: string;
    positionInCompany: string;
    maritalStatus: string;
    signature: string;
    date: string;
  }>;
  applicantSignature: string;
  applicationDate: string;
};

export type State = {
  step: number;
  subStep: number; // 1 or 2 for each section
  tenant: Tenant;
};

type Actions = {
  actions: {
    goToNextStep: () => void;
    goToPrevStep: () => void;
    goToNextSubStep: () => void;
    goToPrevSubStep: () => void;
    resetStore: () => void;
    setTenant: (tenant: Partial<Tenant>) => void;
  };
};

const initState = {
  step: 1,
  subStep: 1,
  tenant: {
    landlordId: "",
    propertyId: "",
    nin: "",
    surname: "",
    otherNames: "",
    contactAddress: "",
    nationality: "",
    passportNo: "",
    stateOfOrigin: "",
    localGovernment: "",
    townOfOrigin: "",
    maritalStatus: "",
    dateOfBirth: "",
    telephone: "",
    personalEmail: "",
    numberOfChildren: 0,
    domicileEmail: "",
    profession: "",
    position: "",
    officeAddress: "",
    formOfIdentification: "",
    officePhone: "",
    spouse: {
      surname: "",
      otherNames: "",
      address: "",
      telephone: "",
      placeOfWork: "",
    },
    nextOfKin: {
      name: "",
      address: "",
      telephone: "",
      relationship: "",
      placeOfWork: "",
    },
    purpose: {
      residential: false,
      commercial: false,
    },
    desiredImprovement: "",
    factorsStimulatingInterest: "",
    initialRentAccepted: "",
    petsInfo: "",
    numberOfVehicles: "",
    presentResidenceAddress: "",
    bedroomPreference: "",
    rentPaymentFrequency: "",
    personResponsibleForRentPayment: "",
    numberOfOccupants: 0,
    sourceOfIncome: "",
    nameAndAddressOfPresentLandlord: "",
    reasonForLeavingPresentResidence: "",
    listOfDependents: [],
    religion: "",
    otherReligion: "",
    nameAndContactOfPastor: "",
    placeOfWorship: "",
    possessionTiming: {
      immediately: false,
      oneMonth: false,
      threeMonths: false,
    },
    guarantors: [
      {
        name: "",
        email: "",
        age: 0,
        telephone: "",
        address: "",
        placeOfWorkAddress: "",
        occupation: "",
        positionInCompany: "",
        maritalStatus: "",
        signature: "",
        date: "",
      },
    ],
    applicantSignature: "",
    applicationDate: format(new Date(), "yyyy-MM-dd"),
  },
};

export const useApplicationStore = create<State & Actions>()(
  immer((set) => ({
    ...initState,
    actions: {
      goToNextStep: () => {
        set((state) => {
          if (state.step < 5) {
            state.step += 1;
            state.subStep = 1; // Reset sub-step when moving to next section
          }
        });
      },
      goToPrevStep: () => {
        set((state) => {
          if (state.step > 1) {
            state.step -= 1;
            state.subStep = 2; // Set to last sub-step when going back
          }
        });
      },
      goToNextSubStep: () => {
        set((state) => {
          if (state.subStep < 2) {
            state.subStep += 1;
          } else {
            // If we're at sub-step 2, move to next section
            if (state.step < 5) {
              state.step += 1;
              state.subStep = 1;
            }
          }
        });
      },
      goToPrevSubStep: () => {
        set((state) => {
          if (state.subStep > 1) {
            state.subStep -= 1;
          } else {
            // If we're at sub-step 1, move to previous section
            if (state.step > 1) {
              state.step -= 1;
              state.subStep = 2;
            }
          }
        });
      },
      resetStore: () => {
        set((state) => {
          state.step = 1;
          state.subStep = 1;
          state.tenant = initState.tenant;
        });
      },
      setTenant: (tenant) => {
        set((state) => {
          state.tenant = { ...state.tenant, ...tenant };
        });
      },
    },
  })),
);
