import {
  ArrowUpRight,
  Bell,
  ChartColumn,
  ChartPie,
  CreditCard,
  Hexagon,
  LayoutDashboard,
  Search,
  Settings,
  UsersRound,
  Workflow,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "الرئيسية", active: true },
  { icon: ChartColumn, label: "التحليلات", active: false },
  { icon: UsersRound, label: "العملاء", active: false },
  { icon: Workflow, label: "الأتمتة", active: false },
  { icon: CreditCard, label: "الفوترة", active: false },
  { icon: Settings, label: "الإعدادات", active: false },
];

const kpis = [
  { label: "الإيرادات", value: "٤٨٢,٩٠٠", change: "12.4%" },
  { label: "عملاء جدد", value: "١,٢٤٦", change: "8.1%" },
  { label: "معدل التحويل", value: "%3.8", change: "2.3%" },
];

// ارتفاعات أعمدة الرسم البياني كنسبة مئوية
const chartBars = [38, 52, 44, 68, 57, 79, 63, 88, 72, 95, 84, 100];

const recentRows = [
  { name: "شركة الأفق", plan: "المنظومة كاملة", amount: "١٢,٤٠٠" },
  { name: "مجموعة نون", plan: "CRM + تحليلات", amount: "٨,٧٥٠" },
  { name: "استوديو ميم", plan: "الأتمتة", amount: "٣,٢٠٠" },
];

export function DashboardPreview() {
  return (
    <div className="absolute inset-0 flex bg-[#0d131f] text-right" dir="rtl">
      {/* الشريط الجانبي */}
      <aside className="hidden w-40 shrink-0 flex-col gap-1 border-l border-white/5 bg-[#0a0f1a] p-3 sm:flex">
        <div className="mb-3 flex items-center gap-1.5 px-1.5">
          <Hexagon
            className="size-4 fill-brand/20 text-brand-soft"
            strokeWidth={1.5}
          />
          <span className="text-[11px] font-bold text-white">روائس</span>
        </div>

        {sidebarItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] ${
              item.active
                ? "bg-brand/15 font-semibold text-brand-soft"
                : "text-slate-500"
            }`}
          >
            <item.icon className="size-3.5" strokeWidth={1.75} />
            {item.label}
          </div>
        ))}
      </aside>

      {/* المحتوى */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* شريط علوي */}
        <div className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-white">
              لوحة التحليلات
            </span>
            <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[8px] font-medium text-emerald-400">
              مباشر
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-[9px] text-slate-500 md:flex">
              <Search className="size-3" />
              بحث...
            </div>
            <Bell className="size-3.5 text-slate-500" />
            <span className="size-5 rounded-full bg-gradient-to-br from-brand to-violet-400" />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
          {/* بطاقات المؤشرات */}
          <div className="grid grid-cols-3 gap-2">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-lg border border-white/5 bg-white/[0.03] p-2.5"
              >
                <p className="text-[9px] text-slate-500">{kpi.label}</p>
                <p className="mt-1 text-[13px] font-bold text-white">
                  {kpi.value}
                </p>
                <p className="mt-0.5 flex items-center gap-0.5 text-[8px] font-medium text-emerald-400">
                  <ArrowUpRight className="size-2.5" />
                  {kpi.change}
                </p>
              </div>
            ))}
          </div>

          {/* الرسم البياني */}
          <div className="min-h-0 flex-1 rounded-lg border border-white/5 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-white">
                الإيرادات الشهرية
              </p>
              <ChartPie className="size-3 text-slate-600" />
            </div>
            <div className="mt-2.5 flex h-[calc(100%-1.75rem)] items-end gap-1">
              {chartBars.map((height, index) => (
                <div
                  key={index}
                  style={{ height: `${height}%` }}
                  className={`flex-1 rounded-sm ${
                    index === chartBars.length - 1
                      ? "bg-brand"
                      : "bg-brand/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* آخر الاشتراكات */}
          <div className="hidden rounded-lg border border-white/5 bg-white/[0.03] lg:block">
            {recentRows.map((row, index) => (
              <div
                key={row.name}
                className={`flex items-center justify-between px-3 py-1.5 text-[9px] ${
                  index > 0 ? "border-t border-white/5" : ""
                }`}
              >
                <span className="font-medium text-slate-300">{row.name}</span>
                <span className="text-slate-500">{row.plan}</span>
                <span className="font-semibold text-white">
                  {row.amount} ر.س
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
