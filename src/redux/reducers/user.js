import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userList: [],
  user: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    signUp: (state, action) => {
      return {
        ...state,
        userList: [...state.userList, action.payload],
        user: action.payload,
      };
    },
    updateUser: (state, action) => ({
      ...state,
      userList: [...action.payload.updatedUsers],
      user: action.payload.user,
    }),
    logoutUser: (state) => ({
      ...state,
      user: null,
    }),
  },
});

// Actions
export const { login, signUp, updateUser, logoutUser } = userSlice.actions;

// Reducer
export default userSlice.reducer;

export const loginAction = (payload) => (dispatch, getState) => {
  try {
    const allUsers = getState().users.userList;
    const user = allUsers.find((el) => el.email === payload.email);
    if (user) {
      dispatch(login(user));
    } else {
      return 'No user exist';
    }
  } catch (error) {
    console.log(error);
  }
};

export const signupAction = (payload) => (dispatch, getState) => {
  try {
    const allUsers = getState().users.userList;
    const user = allUsers.find((el) => el.email === payload.email);
    if (user) {
      return 'User already exist';
    } else {
      dispatch(signUp(payload));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUserAction = (payload) => (dispatch, getState) => {
  try {
    const allUsers = getState().users.userList;
    const updatedUsers = allUsers.map((el) =>
      el.email === payload.email ? { ...el, ...payload } : el
    );
    dispatch(updateUser({ updatedUsers, user: payload }));
  } catch (error) {
    console.log(error);
  }
};
