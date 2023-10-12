import { AccountState } from '../account/state/account.reducer';

// Representation of the entire app state
// Extended by lazy loaded modules
export interface State {
  account: AccountState;
}
