import { toaster } from "@/components/ui/toaster";
import { createAsyncThunk } from "@reduxjs/toolkit";

// This a wrapper for making thunk , so we dont need to write try catch and same response logic every time.
// apiCall = is a function of api calls
// onSuccess = if want to trigger any event on success response
// onError = if want to trigger any event on error response

interface CreateThunkOptions<TPayload, TResult> {
  onSuccess?: (result: TResult, payload: TPayload) => void;
  onError?: (error: any, payload: TPayload) => void;
  successMessage?: string;
  errorMessage?: string;
}

export const createThunk = <TPayload = void, TResult = any>(
  typePrefix: string,
  apiCall: (payload?: TPayload) => Promise<{ status: number; data: TResult; message?: string }>,
  {
    onSuccess,
    onError,
    successMessage,
    errorMessage,
  } : CreateThunkOptions<TPayload, TResult> = {}
) => {
  return createAsyncThunk<TResult, TPayload>(
    typePrefix,
    async (payload: TPayload, { rejectWithValue }) => {
      try {
        
        const response = await apiCall(payload);
        console.log("thunk", response)
        const result = response?.data;
        if (response?.status) {
            toaster.create({
                title : successMessage || response?.message || "Siccess",
                type: "success"
            })
          if (onSuccess) onSuccess(result, payload);
          return result;
        }

        toaster.create({
            title : response?.message || errorMessage || "Something went wrong",
            type: "error"
        })
        if (onError) onError(response, payload);
        return rejectWithValue(response?.data || []);
      } catch (error: any) {
        console.error("Error:", error);
         toaster.create({
            title : errorMessage || "Request failed",
            type: "error"
        })
        if (onError) onError(error, payload);
        return rejectWithValue([]);
      }
    }
  );
};
