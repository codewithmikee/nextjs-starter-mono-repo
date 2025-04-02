// src/stores/Shop-store.ts
import { IShopResponse } from '@/types';
import { createStore } from 'zustand/vanilla';
import {
  IStoreSetupStates,
  IStoreSetupAction,
  storeSetupActions,
  storeInitialState
} from '../common-stores';

export type ShopState = {
  shops: IShopResponse[];
} & IStoreSetupStates;

export type ShopActions = {
  setShops: (shops: IShopResponse[]) => void;
  add: (data: IShopResponse) => void;
  update: (shopId: string, data: IShopResponse) => void;
  remove: (shopId: string) => void;
} & IStoreSetupAction;

export type ShopStore = ShopState & ShopActions;

export const initShopStore = (): ShopState => {
  return {
    ...storeInitialState,
    shops: []
  };
};

export const defaultInitState: ShopState = {
  ...storeInitialState,
  shops: []
};

export const createShopStore = (initState: ShopState = defaultInitState) => {
  return createStore<ShopStore>()((set) => ({
    ...initState,
    ...storeSetupActions(set),
    setShops: (shops: IShopResponse[]) => set({ shops }),
    add: (shop: IShopResponse) =>
      set((state: any) => ({ shops: [shop, ...state.shops] })),
    remove: (shopId: string) =>
      set((state: any) => ({
        shops: state.shops.filter((u: IShopResponse) => u.id !== shopId)
      })),
    update: (shopId: string, shop: IShopResponse) =>
      set((state: any) => ({
        shops: state.shops.map((u: IShopResponse) =>
          u.id == shopId ? shop : u
        )
      }))
  }));
};
