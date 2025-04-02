export type IStoreSetupStates = {
  loading: boolean;
  hasError: boolean;
};

export type IStoreSetupAction = {
  setLoading: (loading: boolean) => void;
  setHasError: (hasError: boolean) => void;
};

export const storeSetupActions = (set: any) => ({
  setLoading: (loading: boolean) => set({ loading }),
  setHasError: (hasError: boolean) => set({ hasError })
});

export const storeInitialState: IStoreSetupStates = {
  loading: false,
  hasError: false
};
