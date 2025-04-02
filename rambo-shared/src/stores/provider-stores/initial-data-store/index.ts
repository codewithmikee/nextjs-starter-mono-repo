// src/stores/user-store.ts
import { createStore } from 'zustand/vanilla';

import {
  IStoreSetupAction,
  IStoreSetupStates,
  storeInitialState,
  storeSetupActions
} from '../../common-stores';
import { create } from 'zustand';
import { IProviderConfig } from '@/types';

export type ProviderState = {
  isInitialized: boolean;
  config: IProviderConfig | null;
} & IStoreSetupStates;

export type ProviderAction = {
  setInitialized: (value: boolean) => void;
  setConfig: (value: IProviderConfig) => void;
} & IStoreSetupAction;

export type ProviderStore = ProviderState & ProviderAction;

export const useProviderDataStore = create<ProviderStore>((set) => ({
  ...storeInitialState,
  isInitialized: false,
  config: null,
  ...storeSetupActions(set),
  setInitialized: (value: boolean) => set({ isInitialized: value }),
  setConfig: (config: IProviderConfig) => set({ config })
}));
