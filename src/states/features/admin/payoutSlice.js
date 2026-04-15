import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../axios/axios";

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const fetchPayoutSummary = createAsyncThunk(
   "admin/payouts/summary",
   async (period, { rejectWithValue }) => {
      try {
         const response = await api.get(`/admin/payouts/summary?period=${period}`);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data);
      }
   }
);

export const fetchPayouts = createAsyncThunk(
   "admin/payouts/list",
   async ({ period, status } = {}, { rejectWithValue }) => {
      try {
         const params = new URLSearchParams();
         if (period) params.append("period", period);
         if (status) params.append("status", status);
         const response = await api.get(`/admin/payouts?${params.toString()}`);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data);
      }
   }
);

export const calculateAndCreatePayouts = createAsyncThunk(
   "admin/earnings/calculate-and-create-payouts",
   async ({ month, ad_revenue }, { rejectWithValue }) => {
      try {
         const response = await api.post("/admin/earnings/calculate-and-create-payouts", {
            month,
            ad_revenue: parseFloat(ad_revenue),
         });
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data);
      }
   }
);

export const bulkCreatePayouts = createAsyncThunk(
   "admin/payouts/bulk-create",
   async (period, { rejectWithValue }) => {
      try {
         const response = await api.post("/admin/payouts/bulk-create", { period });
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data);
      }
   }
);

export const bulkMarkPaid = createAsyncThunk(
   "admin/payouts/bulk-mark-paid",
   async (payouts, { rejectWithValue }) => {
      try {
         const response = await api.post("/admin/payouts/bulk-mark-paid", { payouts });
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data);
      }
   }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
   summary: null,
   payouts: [],
   calculateResult: null,
   status: {
      summary: "idle",
      payouts: "idle",
      calculate: "idle",
      bulkCreate: "idle",
      bulkMarkPaid: "idle",
   },
   error: {
      summary: null,
      payouts: null,
      calculate: null,
      bulkCreate: null,
      bulkMarkPaid: null,
   },
};

export const payoutSlice = createSlice({
   name: "payout",
   initialState,
   reducers: {
      resetCalculateStatus: (state) => {
         state.status.calculate = "idle";
         state.error.calculate = null;
         state.calculateResult = null;
      },
      resetBulkMarkPaidStatus: (state) => {
         state.status.bulkMarkPaid = "idle";
         state.error.bulkMarkPaid = null;
      },
      resetBulkCreateStatus: (state) => {
         state.status.bulkCreate = "idle";
         state.error.bulkCreate = null;
      },
   },
   extraReducers: (builder) => {
      builder
         // ── Summary ──
         .addCase(fetchPayoutSummary.pending, (state) => {
            state.status.summary = "pending";
            state.error.summary = null;
         })
         .addCase(fetchPayoutSummary.fulfilled, (state, action) => {
            state.summary = action.payload?.data ?? null;
            state.status.summary = "success";
         })
         .addCase(fetchPayoutSummary.rejected, (state, action) => {
            state.status.summary = "failed";
            state.error.summary = action.payload?.message ?? "Failed to load summary.";
         })

         // ── Payouts list ──
         .addCase(fetchPayouts.pending, (state) => {
            state.status.payouts = "pending";
            state.error.payouts = null;
         })
         .addCase(fetchPayouts.fulfilled, (state, action) => {
            state.payouts = action.payload?.data?.data ?? [];
            state.status.payouts = "success";
         })
         .addCase(fetchPayouts.rejected, (state, action) => {
            state.status.payouts = "failed";
            state.error.payouts = action.payload?.message ?? "Failed to load payouts.";
         })

         // ── Calculate & create ──
         .addCase(calculateAndCreatePayouts.pending, (state) => {
            state.status.calculate = "pending";
            state.error.calculate = null;
            state.calculateResult = null;
         })
         .addCase(calculateAndCreatePayouts.fulfilled, (state, action) => {
            state.status.calculate = "success";
            state.calculateResult = action.payload?.data ?? null;
         })
         .addCase(calculateAndCreatePayouts.rejected, (state, action) => {
            state.status.calculate = "failed";
            state.error.calculate = action.payload?.message ?? "Calculation failed.";
         })

         // ── Bulk create ──
         .addCase(bulkCreatePayouts.pending, (state) => {
            state.status.bulkCreate = "pending";
            state.error.bulkCreate = null;
         })
         .addCase(bulkCreatePayouts.fulfilled, (state) => {
            state.status.bulkCreate = "success";
         })
         .addCase(bulkCreatePayouts.rejected, (state, action) => {
            state.status.bulkCreate = "failed";
            state.error.bulkCreate = action.payload?.message ?? "Bulk create failed.";
         })

         // ── Bulk mark paid ──
         .addCase(bulkMarkPaid.pending, (state) => {
            state.status.bulkMarkPaid = "pending";
            state.error.bulkMarkPaid = null;
         })
         .addCase(bulkMarkPaid.fulfilled, (state) => {
            state.status.bulkMarkPaid = "success";
         })
         .addCase(bulkMarkPaid.rejected, (state, action) => {
            state.status.bulkMarkPaid = "failed";
            state.error.bulkMarkPaid = action.payload?.message ?? "Failed to mark payouts as paid.";
         });
   },
});

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectPayoutSummary    = (state) => state.payout.summary;
export const selectPayoutList       = (state) => state.payout.payouts;
export const selectCalculateResult  = (state) => state.payout.calculateResult;
export const selectPayoutStatus     = (state) => state.payout.status;
export const selectPayoutError      = (state) => state.payout.error;

export const { resetCalculateStatus, resetBulkMarkPaidStatus, resetBulkCreateStatus } = payoutSlice.actions;

export default payoutSlice.reducer;
