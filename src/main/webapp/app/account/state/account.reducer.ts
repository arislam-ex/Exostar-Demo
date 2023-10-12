// Homework
import { Account } from '../account';

/* NgRx */
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountPageActions } from './actions';

// State for this feature (Account)
export interface AccountState {
  maskAccountName: boolean;
  currentAccount: Account;
}

const initialState: AccountState = {
  maskAccountName: true,
  currentAccount: null,
};

// Selector functions
const getAccountFeatureState = createFeatureSelector<AccountState>('accounts');

export const getMaskAccountName = createSelector(getAccountFeatureState, state => state.maskAccountName);

export const getCurrentAccount = createSelector(getAccountFeatureState, state => state.currentAccount);

export const accountReducer = createReducer<AccountState>(
  initialState,
  on(
    AccountPageActions.maskAccountName,
    (state): AccountState => ({
      ...state,
      maskAccountName: !state.maskAccountName,
    })
  )
);
