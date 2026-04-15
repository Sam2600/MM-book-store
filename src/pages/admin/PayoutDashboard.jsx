import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
   fetchPayoutSummary,
   fetchPayouts,
   calculateAndCreatePayouts,
   bulkCreatePayouts,
   bulkMarkPaid,
   selectPayoutSummary,
   selectPayoutList,
   selectCalculateResult,
   selectPayoutStatus,
   selectPayoutError,
   resetCalculateStatus,
   resetBulkMarkPaidStatus,
   resetBulkCreateStatus,
   resetPayouts,
} from "../../states/features/admin/payoutSlice";
import { api } from "../../axios/axios";
import { getLoginUserId, scrollToTop } from "../../functions/helpers";
import { ROUTES } from "../../consts/Consts";
import { MonthYearPicker } from "../../components/MonthYearPicker";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const currentMonth = () => {
   const now = new Date();
   return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

const formatMMK = (amount) =>
   Number(amount).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " MMK";

const methodLabel = (code) => {
   const map = { kbzpay: "KBZ Pay", wave: "Wave Pay", aya_pay: "AYA Pay", bank_transfer: "Bank" };
   return map[code] ?? code?.toUpperCase() ?? "—";
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const SummaryCard = ({ label, value, sub, color = "slate" }) => {
   const colors = {
      slate:  "bg-white border-slate-100 text-slate-900",
      blue:   "bg-blue-600 border-blue-600 text-white",
      yellow: "bg-white border-yellow-200 text-slate-900",
      green:  "bg-white border-green-200 text-slate-900",
   };
   return (
      <div className={`rounded-[2rem] border-2 p-6 ${colors[color]}`}>
         <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${color === "blue" ? "text-blue-200" : "text-slate-400"}`}>
            {label}
         </p>
         <p className="text-3xl font-black leading-tight">{value}</p>
         {sub && <p className={`text-sm font-bold mt-1 ${color === "blue" ? "text-blue-200" : "text-slate-400"}`}>{sub}</p>}
      </div>
   );
};

const StatusBadge = ({ status }) => {
   if (status === "paid") {
      return (
         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Paid
         </span>
      );
   }
   return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-yellow-100 text-yellow-700">
         <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
         Pending
      </span>
   );
};

const Alert = ({ type = "error", message, onClose }) => {
   if (!message) return null;
   const styles = {
      error:   "bg-red-50 border-red-200 text-red-700",
      success: "bg-green-50 border-green-200 text-green-700",
      info:    "bg-blue-50 border-blue-200 text-blue-700",
   };
   return (
      <div className={`flex items-start justify-between gap-4 border rounded-2xl p-4 text-sm font-bold animate-in fade-in slide-in-from-top-2 duration-200 ${styles[type]}`}>
         <p className="leading-relaxed whitespace-pre-line">{message}</p>
         {onClose && (
            <button onClick={onClose} className="shrink-0 text-lg leading-none opacity-50 hover:opacity-100">×</button>
         )}
      </div>
   );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export const PayoutDashboard = () => {
   const dispatch     = useDispatch();
   const navigate     = useNavigate();
   const summary      = useSelector(selectPayoutSummary);
   const payouts      = useSelector(selectPayoutList);
   const calcResult   = useSelector(selectCalculateResult);
   const statuses     = useSelector(selectPayoutStatus);
   const errors       = useSelector(selectPayoutError);

   // Computed once per render — synchronous localStorage read, safe to use before effects.
   const isAdmin = Number(getLoginUserId()) === 1;

   // ── Local state ──
   const [period, setPeriod]                 = useState(currentMonth());
   const [showCalcPanel, setShowCalcPanel]   = useState(false);
   const [adRevenue, setAdRevenue]           = useState("");
   const [selectedIds, setSelectedIds]       = useState([]);
   const [refNumbers, setRefNumbers]         = useState({});  // { [id]: "refString" }
   const [notification, setNotification]     = useState(null); // { type, message }

   // ── Auth guard ──
   useEffect(() => {
      const userId = getLoginUserId();
      if (!userId) {
         navigate(ROUTES.SIGN_IN);
         return;
      }
      if (Number(userId) !== 1) {
         navigate(ROUTES.HOME);
      }
   }, [navigate]);

   // ── Load data when period changes ──
   const refresh = useCallback(() => {
      dispatch(fetchPayoutSummary(period));
      dispatch(fetchPayouts({ period }));
      setSelectedIds([]);
      setRefNumbers({});
   }, [dispatch, period]);

   useEffect(() => {
      if (!isAdmin) return;
      scrollToTop();
      refresh();
      return () => {
         dispatch(resetPayouts());
      };
   }, [period, dispatch, refresh, isAdmin]);

   // ── Notify on action results ──
   useEffect(() => {
      if (statuses.calculate === "success" && calcResult) {
         const { payouts: p } = calcResult;
         setNotification({
            type: "success",
            message: `Earnings calculated. ${p?.created ?? 0} payout record(s) created, ${p?.skipped ?? 0} skipped.${
               p?.errors?.length ? "\nSkipped (no payment info): " + p.errors.join(", ") : ""
            }`,
         });
         refresh();
         setShowCalcPanel(false);
         setAdRevenue("");
      }
      if (statuses.calculate === "failed" && errors.calculate) {
         setNotification({ type: "error", message: errors.calculate });
      }
   }, [statuses.calculate, calcResult, errors.calculate, refresh]);

   useEffect(() => {
      if (statuses.bulkCreate === "success") {
         setNotification({ type: "success", message: "Payout records created for all eligible authors." });
         refresh();
      }
      if (statuses.bulkCreate === "failed" && errors.bulkCreate) {
         setNotification({ type: "error", message: errors.bulkCreate });
      }
   }, [statuses.bulkCreate, errors.bulkCreate, refresh]);

   useEffect(() => {
      if (statuses.bulkMarkPaid === "success") {
         setNotification({ type: "success", message: "Selected payouts marked as paid. Confirmation emails sent." });
         refresh();
      }
      if (statuses.bulkMarkPaid === "failed" && errors.bulkMarkPaid) {
         setNotification({ type: "error", message: errors.bulkMarkPaid });
      }
   }, [statuses.bulkMarkPaid, errors.bulkMarkPaid, refresh]);

   // ── Handlers ──
   const handleCalculate = async () => {
      if (!adRevenue || isNaN(Number(adRevenue)) || Number(adRevenue) <= 0) {
         setNotification({ type: "error", message: "Please enter a valid ad revenue amount." });
         return;
      }
      dispatch(calculateAndCreatePayouts({ month: period, ad_revenue: adRevenue }));
   };

   const handleBulkCreate = () => {
      if (!window.confirm(`Create pending payout records for all eligible authors in ${period}?`)) return;
      dispatch(bulkCreatePayouts(period));
   };

   const handleExport = async () => {
      try {
         const response = await api.get(`/admin/payouts/export?period=${period}`, { responseType: "blob" });
         const url = URL.createObjectURL(new Blob([response.data]));
         const a = document.createElement("a");
         a.href = url;
         a.download = `payouts-${period}.csv`;
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
         URL.revokeObjectURL(url);
      } catch {
         setNotification({ type: "error", message: "Failed to export CSV." });
      }
   };

   const handleSelectAll = (e) => {
      const pendingIds = payouts.filter((p) => p.status === "pending").map((p) => p.id);
      setSelectedIds(e.target.checked ? pendingIds : []);
   };

   const handleSelectOne = (id) => {
      setSelectedIds((prev) =>
         prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
   };

   const handleConfirmPayments = () => {
      if (selectedIds.length === 0) return;
      const missing = selectedIds.filter((id) => !refNumbers[id]);
      if (missing.length > 0) {
         setNotification({ type: "error", message: `Please enter a reference number for ${missing.length} selected payout(s).` });
         return;
      }
      const payload = selectedIds.map((id) => ({ id, reference_number: refNumbers[id] }));
      dispatch(bulkMarkPaid(payload));
   };

   // ── Derived ──
   const pendingPayouts = payouts.filter((p) => p.status === "pending");
   const allPendingSelected = pendingPayouts.length > 0 && selectedIds.length === pendingPayouts.length;
   const isCalculating   = statuses.calculate === "pending";
   const isBulkCreating  = statuses.bulkCreate === "pending";
   const isMarkingPaid   = statuses.bulkMarkPaid === "pending";
   const isLoadingList   = statuses.payouts === "pending";

   // Synchronous render guard — prevents content flash before useEffect redirect fires.
   if (!isAdmin) return null;

   return (
      <div className="min-h-screen bg-[#EEEEEE]">
         <main className="container mx-auto px-4 lg:px-8 py-10 space-y-6">

            {/* ── Page Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payment Dashboard</h1>
                  <p className="text-sm text-slate-400 font-bold mt-1">Manage author payouts and earnings</p>
               </div>
               <div className="flex items-center gap-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Period</label>
                  <MonthYearPicker value={period} onChange={setPeriod} />
                  <button
                     onClick={refresh}
                     className="p-2.5 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all"
                     title="Refresh"
                  >
                     ↻
                  </button>
               </div>
            </div>

            {/* ── Notification ── */}
            {notification && (
               <Alert
                  type={notification.type}
                  message={notification.message}
                  onClose={() => setNotification(null)}
               />
            )}

            {/* ── Summary Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               <SummaryCard
                  label="Total Authors"
                  value={summary?.total_authors ?? "—"}
                  color="blue"
               />
               <SummaryCard
                  label="Total Amount"
                  value={summary ? formatMMK(summary.total_amount) : "—"}
                  sub={period}
                  color="slate"
               />
               <SummaryCard
                  label="Pending"
                  value={summary?.pending?.count ?? "—"}
                  sub={summary ? formatMMK(summary.pending?.amount) : null}
                  color="yellow"
               />
               <SummaryCard
                  label="Paid"
                  value={summary?.paid?.count ?? "—"}
                  sub={summary ? formatMMK(summary.paid?.amount) : null}
                  color="green"
               />
            </div>

            {/* ── Action Buttons ── */}
            <div className="bg-white rounded-[2rem] border-2 border-slate-100 p-6">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Actions</p>
               <div className="flex flex-wrap gap-3">
                  <button
                     onClick={() => { setShowCalcPanel((v) => !v); setNotification(null); dispatch(resetCalculateStatus()); }}
                     className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                        showCalcPanel
                           ? "bg-slate-900 text-white shadow-lg"
                           : "bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700"
                     }`}
                  >
                     {showCalcPanel ? "✕ Cancel" : "Calculate & Create Payouts"}
                  </button>

                  {/* <button
                     onClick={handleBulkCreate}
                     disabled={isBulkCreating}
                     className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-400 transition-all disabled:opacity-50"
                  >
                     {isBulkCreating ? "Creating…" : "Bulk Create Payouts"}
                  </button> */}

                  <button
                     onClick={handleExport}
                     className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-400 transition-all"
                  >
                     Export CSV ↓
                  </button>
               </div>

               {/* ── Calculate Panel ── */}
               {showCalcPanel && (
                  <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                     <p className="text-sm font-black text-slate-800 mb-1">Calculate Earnings for <span className="text-blue-600">{period}</span></p>
                     <p className="text-xs text-slate-400 font-bold mb-4">
                        Enter the total ad revenue for the month. The system will split it among authors (70%) proportional to chapter reads, then create pending payout records.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                        <div className="relative flex-1">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 uppercase">MMK</span>
                           <input
                              type="number"
                              min="0"
                              step="any"
                              value={adRevenue}
                              onChange={(e) => setAdRevenue(e.target.value)}
                              placeholder="e.g. 1500000"
                              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-14 pr-4 py-3.5 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all"
                           />
                        </div>
                        <button
                           onClick={handleCalculate}
                           disabled={isCalculating || !adRevenue}
                           className="px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 shrink-0"
                        >
                           {isCalculating ? "Calculating…" : "Run"}
                        </button>
                     </div>
                     {errors.calculate && statuses.calculate === "failed" && (
                        <p className="mt-3 text-xs font-bold text-red-600">{errors.calculate}</p>
                     )}
                  </div>
               )}
            </div>

            {/* ── Payouts Table ── */}
            <div className="bg-white rounded-[2rem] border-2 border-slate-100 overflow-hidden">
               <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <p className="font-black text-slate-900">
                     Payouts
                     {!isLoadingList && (
                        <span className="ml-2 text-xs font-bold text-slate-400">({payouts.length})</span>
                     )}
                  </p>
                  {selectedIds.length > 0 && (
                     <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">
                        {selectedIds.length} selected
                     </span>
                  )}
               </div>

               {isLoadingList ? (
                  <div className="py-16 flex items-center justify-center">
                     <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
               ) : payouts.length === 0 ? (
                  <div className="py-16 text-center">
                     <p className="text-sm font-bold text-slate-400">No payouts found for {period}.</p>
                     <p className="text-xs text-slate-300 font-bold mt-1">
                        Run "Calculate & Create Payouts" to generate records.
                     </p>
                  </div>
               ) : (
                  <div className="overflow-x-auto">
                     <table className="w-full">
                        <thead>
                           <tr className="border-b border-slate-100">
                              <th className="px-4 py-3 text-left">
                                 <input
                                    type="checkbox"
                                    checked={allPendingSelected}
                                    onChange={handleSelectAll}
                                    disabled={pendingPayouts.length === 0}
                                    className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                                 />
                              </th>
                              {["Author", "Method", "Account", "Amount", "Status", "Reference"].map((h) => (
                                 <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    {h}
                                 </th>
                              ))}
                           </tr>
                        </thead>
                        <tbody>
                           {payouts.map((payout) => {
                              const isPending  = payout.status === "pending";
                              const isSelected = selectedIds.includes(payout.id);
                              return (
                                 <tr
                                    key={payout.id}
                                    className={`border-b border-slate-50 transition-colors ${
                                       isSelected ? "bg-blue-50/50" : "hover:bg-slate-50/50"
                                    }`}
                                 >
                                    <td className="px-4 py-4">
                                       {isPending ? (
                                          <input
                                             type="checkbox"
                                             checked={isSelected}
                                             onChange={() => handleSelectOne(payout.id)}
                                             className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                                          />
                                       ) : (
                                          <span className="text-green-500 text-base">✓</span>
                                       )}
                                    </td>
                                    <td className="px-4 py-4">
                                       <p className="text-sm font-black text-slate-900">{payout.author?.name ?? "—"}</p>
                                       <p className="text-xs text-slate-400 font-bold">{payout.author?.email ?? ""}</p>
                                    </td>
                                    <td className="px-4 py-4">
                                       <span className="text-xs font-black text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                                          {methodLabel(payout.payment_method)}
                                       </span>
                                    </td>
                                    <td className="px-4 py-4 font-mono text-sm text-slate-600 font-bold">
                                       {payout.payment_account}
                                    </td>
                                    <td className="px-4 py-4">
                                       <p className="text-sm font-black text-slate-900">{formatMMK(payout.total_amount)}</p>
                                    </td>
                                    <td className="px-4 py-4">
                                       <StatusBadge status={payout.status} />
                                    </td>
                                    <td className="px-4 py-4">
                                       {payout.reference_number ? (
                                          <span className="text-xs font-mono text-slate-500">{payout.reference_number}</span>
                                       ) : (
                                          <span className="text-xs text-slate-300">—</span>
                                       )}
                                    </td>
                                 </tr>
                              );
                           })}
                        </tbody>
                     </table>
                  </div>
               )}
            </div>

            {/* ── Bulk Mark Paid Panel ── */}
            {selectedIds.length > 0 && (
               <div className="bg-white rounded-[2rem] border-2 border-blue-200 p-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                     <div className="flex-1">
                        <p className="text-sm font-black text-slate-900 mb-1">
                           Confirm Payment for {selectedIds.length} Author{selectedIds.length > 1 ? "s" : ""}
                        </p>
                        <p className="text-xs text-slate-400 font-bold mb-5">
                           Enter the transaction reference number from KBZ Pay / Wave / AYA for each author. An email notification will be sent automatically.
                        </p>
                        <div className="space-y-3">
                           {selectedIds.map((id) => {
                              const payout = payouts.find((p) => p.id === id);
                              return (
                                 <div key={id} className="flex flex-col sm:flex-row sm:items-center gap-3">
                                    <div className="sm:w-48 shrink-0">
                                       <p className="text-xs font-black text-slate-700 truncate">{payout?.author?.name}</p>
                                       <p className="text-[10px] text-slate-400 font-bold">{formatMMK(payout?.total_amount)} · {methodLabel(payout?.payment_method)}</p>
                                    </div>
                                    <input
                                       type="text"
                                       placeholder="Transaction reference number *"
                                       value={refNumbers[id] ?? ""}
                                       onChange={(e) =>
                                          setRefNumbers((prev) => ({ ...prev, [id]: e.target.value }))
                                       }
                                       className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-2.5 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all"
                                    />
                                 </div>
                              );
                           })}
                        </div>
                     </div>

                     <div className="flex flex-col gap-3 shrink-0">
                        <button
                           onClick={handleConfirmPayments}
                           disabled={isMarkingPaid}
                           className="px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest bg-green-600 text-white shadow-xl shadow-green-500/20 hover:bg-green-700 transition-all active:scale-95 disabled:opacity-50"
                        >
                           {isMarkingPaid ? "Confirming…" : `Mark ${selectedIds.length} as Paid`}
                        </button>
                        <button
                           onClick={() => { setSelectedIds([]); setRefNumbers({}); }}
                           className="px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
                        >
                           Cancel
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </main>
      </div>
   );
};
