import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
  user: User | null;
  isRegistered: boolean;
}

const initialState: UserState = {
  user: null,
  isRegistered: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isRegistered = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isRegistered = false;
    },
  },
});

export const { registerUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
