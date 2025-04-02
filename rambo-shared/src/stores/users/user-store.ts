// import { IUserResponse, IUserWithFullName } from '@/types';
import {
  IStoreSetupAction,
  IStoreSetupStates,
  storeInitialState,
  storeSetupActions
} from '../common-stores';
import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { IUserResponse, IUserWithFullName, ProviderUserType } from '@/types';
// import { ProviderUserType } from '@shared/types';
// import { ProviderUserType } from '@/types';

export type IUsersState = {
  users: IUserResponse[];
  type: ProviderUserType;
} & IStoreSetupStates;

const userWithFullName = (user: IUserResponse): IUserWithFullName => ({
  ...user,
  fullName: `${user.firstName} ${user.lastName}`
});

export type IUsersAction = {
  setUsers: (users: IUserResponse[]) => void;
  addUser: (data: IUserResponse) => void;
  removeUser: (userId: string) => void;
  updateUser: (userId: string, data: IUserResponse) => void;
  getFormattedUsers: () => IUserWithFullName[];
} & IStoreSetupAction;

export type IUsersStore = IUsersState & IUsersAction;

export const usersStoreInitialState: IUsersState = {
  ...storeInitialState,
  type: 'admins',
  users: []
};

// Factory function to create a Zustand store for any user type
export const createUserStore = (userType: ProviderUserType) => {
  // const api = getApi(userType);

  return create<IUsersStore>()(
    devtools((set, get) => ({
      ...usersStoreInitialState,
      ...storeSetupActions(set),
      type: userType,
      setUsers: (users: IUserResponse[]) => set({ users }),
      addUser: (user: IUserResponse) =>
        set((state: any) => ({ users: [user, ...state.users] })),
      removeUser: (userId: string) =>
        set((state: any) => ({
          users: state.users.filter((u: IUserResponse) => u.id !== userId)
        })),
      updateUser: (userId: string, user: IUserResponse) =>
        set((state: any) => ({
          users: state.users.map((u: IUserResponse) =>
            u.id == userId ? user : u
          )
        })),
      getFormattedUsers: () => get().users.map(userWithFullName)
    }))
  );
};
