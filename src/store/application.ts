import { format } from "date-fns";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Tenant = {
  landlordId: string;
  propertyId: string;
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
  bedroomPreference: string;
  rentPaymentFrequency: string;
  personResponsibleForRentPayment: string;
  numberOfOccupants: number;
  sourceOfIncome: string;
  nameAndAddressOfPresentLandlord: string;
  reasonForLeavingPresentResidence: string;
  listOfDependents: string[];
  religion: string;
  nameAndContactOfPastor: string;
  placeOfWorship: string;
  possessionTiming: {
    immediately: boolean;
    oneMonth: boolean;
    threeMonths: boolean;
  };
  guarantors: Array<{
    name: string;
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
  tenant: Tenant;
};

type Actions = {
  actions: {
    goToNextStep: () => void;
    goToPrevStep: () => void;
    resetStore: () => void;
    setTenant: (tenant: Partial<Tenant>) => void;
  };
};

const initState = {
  step: 1,
  tenant: {
    landlordId: "",
    propertyId: "",
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
    bedroomPreference: "",
    rentPaymentFrequency: "",
    personResponsibleForRentPayment: "",
    numberOfOccupants: 0,
    sourceOfIncome: "",
    nameAndAddressOfPresentLandlord: "",
    reasonForLeavingPresentResidence: "",
    listOfDependents: [],
    religion: "",
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
          }
        });
      },
      goToPrevStep: () => {
        set((state) => {
          if (state.step > 1) {
            state.step -= 1;
          }
        });
      },
      resetStore: () => {
        set((state) => {
          state.step = 1;
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
