import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authReducer from './authSlice';
interface FormData {
    name?: string;
    email?: string;
    phone?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
    singleFile?: File;
    multiFiles?: FileList | null;
    geolocation?: string;
}
const initialState: FormData = {};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormData(state, action: PayloadAction<{ field: string; value: string | File | FileList }>) {
            const { field, value } = action.payload;
            state[field] = value;
        },
        submitForm(state) {
            const formData = new FormData();

            // Append form fields to the FormData object
            for (const field in state) {
                if (state[field] instanceof FileList) {
                    // Handle multi-file upload
                    const files = state[field] as FileList;
                    for (let i = 0; i < files.length; i++) {
                        formData.append(field, files[i]);
                    }
                } else {
                    formData.append(field, state[field]);
                }
            }

            // Make the API call using the Fetch API
            fetch('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/form', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.FSLL-BUedFpecJOLvrkzyyBO8r5ALsk_zBLbgUWvomiLKhhlzssHf5fJmlKo8LWBwft1tsv6dt9PS7PuhgLvbS2Fh2ggAFb2.ND1LQXi2sb3MX5bub78fXw.S1AOgNDUqpTUnuIea3WdPxq1i1cUNnudo5LoRjJBPWTXZH9LVQVaDxxoHp5bFedtlnKrEwqXuGeuA6vHTvmqqi7HENFdVGyzfK6YCrA5NqxumFVYbsbrUKzNaLVVCl_VXf__HM6WULLm3RH12iy0tQOklnof34kmd6T8lSXVRxA.Q4rZ7eVwQQhhW3c2g2RHWujT2Rvkv5qf5QxZvohoTKg',
                },
                body: formData,
            })
                .then((response) => {
                    // Handle the response
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    // Handle errors
                    console.error(error);
                });
        },
    },
});


const store = configureStore({
    reducer: {
        auth: authReducer,
        form: formSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { setFormData, submitForm } = formSlice.actions;
export default store;
