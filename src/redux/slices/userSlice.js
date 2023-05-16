import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: ''
    },
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetch_user_login_success: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.account.access_token = action?.payload?.DT?.access_token
            state.account.refresh_token = action?.payload?.DT?.refresh_token
            state.account.username = action?.payload?.DT?.username
            state.account.image = action?.payload?.DT?.image
            state.account.role = action?.payload?.DT?.role
            state.isAuthenticated = true

            //console.log('okla', action.payload);
        },
        user_logout_success: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.account.access_token = ''
            state.account.refresh_token = ''
            state.account.username = ''
            state.account.image = ''
            state.account.role = ''
            state.isAuthenticated = false

            //console.log('okla', action.payload);
        },

        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { fetch_user_login_success, user_logout_success } = userSlice.actions

export default userSlice.reducer