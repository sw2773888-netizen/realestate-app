"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { courses } from "@/lib/data";

export default function RegisterForm({
  defaultCourse,
}: {
  defaultCourse?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: defaultCourse ?? "",
    note: "",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Demo: lưu tạm phía client. Thực tế sẽ gửi tới email/CRM.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-card">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-light text-brand">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h2 className="mt-5 text-2xl font-extrabold text-ink">
          Đăng ký thành công! 🎉
        </h2>
        <p className="mt-3 text-gray-600">
          Cảm ơn <strong>{form.name || "bạn"}</strong> đã đăng ký. Thanh Hương
          và đội ngũ sẽ liên hệ với bạn trong vòng 24 giờ để hướng dẫn thanh toán
          và kích hoạt khóa học.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              phone: "",
              email: "",
              course: defaultCourse ?? "",
              note: "",
            });
          }}
          className="mt-6 rounded-full border border-gray-200 px-6 py-2.5 font-bold text-ink transition hover:border-brand hover:text-brand"
        >
          Đăng ký khóa khác
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Họ và tên" required>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Nguyễn Văn A"
            className="input"
          />
        </Field>
        <Field label="Số điện thoại / Zalo" required>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="09xx xxx xxx"
            className="input"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Email">
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="email@example.com"
            className="input"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Khóa học quan tâm" required>
          <select
            required
            value={form.course}
            onChange={(e) => update("course", e.target.value)}
            className="input bg-white"
          >
            <option value="" disabled>
              -- Chọn khóa học --
            </option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
            <option value="tu-van">Chưa chắc — cần tư vấn lộ trình</option>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Lời nhắn (không bắt buộc)">
          <textarea
            value={form.note}
            onChange={(e) => update("note", e.target.value)}
            rows={3}
            placeholder="Bạn muốn đạt được điều gì sau khóa học?"
            className="input resize-none"
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient py-3.5 font-bold text-white shadow-lg transition hover:opacity-90"
      >
        <Send className="h-5 w-5" /> Gửi đăng ký
      </button>
      <p className="mt-4 text-center text-xs text-gray-400">
        Bằng việc đăng ký, bạn đồng ý để đội ngũ Thanh Hương Academy liên hệ tư
        vấn. Cam kết bảo mật thông tin.
      </p>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.input:focus) {
          border-color: #fe2c55;
          box-shadow: 0 0 0 3px rgba(254, 44, 85, 0.12);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-brand">*</span>}
      </span>
      {children}
    </label>
  );
}
