"use client";

import { useMemo, useState } from "react";
import { formatFullPrice } from "@/lib/format";

export default function MortgageCalculator({ price }: { price: number }) {
  const [downPct, setDownPct] = useState(30);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(9);

  const { monthly, loan } = useMemo(() => {
    const loan = price * (1 - downPct / 100);
    const r = rate / 100 / 12;
    const n = years * 12;
    const monthly =
      r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { monthly, loan };
  }, [price, downPct, years, rate]);

  return (
    <div className="rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-ink">Ước tính khoản vay</h3>
      <p className="mt-1 text-sm text-gray-500">
        Tính khoản trả góp hàng tháng theo giá nhà.
      </p>

      <div className="mt-5 space-y-5">
        <Slider
          label="Trả trước"
          value={downPct}
          suffix="%"
          min={0}
          max={90}
          step={5}
          onChange={setDownPct}
          hint={formatFullPrice(price * (downPct / 100))}
        />
        <Slider
          label="Thời hạn vay"
          value={years}
          suffix=" năm"
          min={5}
          max={30}
          step={1}
          onChange={setYears}
        />
        <Slider
          label="Lãi suất"
          value={rate}
          suffix="%/năm"
          min={5}
          max={15}
          step={0.5}
          onChange={setRate}
        />
      </div>

      <div className="mt-6 rounded-xl bg-brand-light p-4 text-center">
        <div className="text-sm font-semibold text-brand-dark">
          Trả góp hàng tháng
        </div>
        <div className="mt-1 text-2xl font-extrabold text-brand-dark">
          {formatFullPrice(Math.round(monthly))}
        </div>
        <div className="mt-1 text-xs text-brand-dark/70">
          Số tiền vay: {formatFullPrice(Math.round(loan))}
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  suffix,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-ink">{label}</label>
        <span className="text-sm font-bold text-brand">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-brand"
      />
      {hint && <div className="mt-1 text-xs text-gray-400">{hint}</div>}
    </div>
  );
}
