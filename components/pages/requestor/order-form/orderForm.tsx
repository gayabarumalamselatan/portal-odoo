"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { Controller } from "react-hook-form";
import { useState } from "react";
import useOrderForm from "./useOrderForm";

export function OrderFormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { form, handleAddOrder, isPendingAddOrder } = useOrderForm();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const data = watch();

  const steps = [
    { number: 1, title: "Data Perusahaan" },
    { number: 2, title: "Data PIC" },
    { number: 3, title: "Info Lisensi" },
    { number: 4, title: "Review" },
  ];

  const onNext = () => setCurrentStep((s) => s + 1);
  const onBack = () => setCurrentStep((s) => s - 1);

  const onSubmit = (values: any) => {
    handleAddOrder(values);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        {/* Stepper */}
        <div className="flex items-center mb-10">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex-1 flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step.number
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="p-8">
          <p className="text-muted-foreground mb-8">
            Langkah {currentStep} dari {steps.length}
          </p>

          <form
            onSubmit={
              currentStep === 4
                ? handleSubmit(onSubmit)
                : (e) => {
                    e.preventDefault();
                    onNext();
                  }
            }
            className="space-y-6"
          >
            {/* STEP 1 */}
            {currentStep === 1 && (
              <>
                <Field
                  label="Nama Perusahaan"
                  name="company_name"
                  error={errors.company_name?.message}
                >
                  <Controller
                    name="company_name"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="PT Contoh Perusahaan" />
                    )}
                  />
                </Field>

                <Field
                  label="NPWP"
                  name="npwp_number"
                  error={errors.npwp_number?.message}
                >
                  <Controller
                    name="npwp_number"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="XX.XXX.XXX.X-XXX.XXX" />
                    )}
                  />
                </Field>

                <Field label="Jumlah Karyawan" name="employees_amount">
                  <Controller
                    name="employees_amount"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="50"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    )}
                  />
                </Field>
              </>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <>
                <Field
                  label="Nama PIC"
                  name="pic_name"
                  error={errors.pic_name?.message}
                >
                  <Controller
                    name="pic_name"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Field>

                <Field
                  label="Nomor Telepon"
                  name="pic_phone"
                  error={errors.pic_phone?.message}
                >
                  <Controller
                    name="pic_phone"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="+62..." />
                    )}
                  />
                </Field>

                <Field
                  label="Email PIC"
                  name="pic_email"
                  error={errors.pic_email?.message}
                >
                  <Controller
                    name="pic_email"
                    control={control}
                    render={({ field }) => <Input {...field} type="email" />}
                  />
                </Field>
              </>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <>
                <Field label="Jenis Lisensi" name="license_type">
                  <Controller
                    name="license_type"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full border rounded-md px-3 py-2"
                      >
                        <option value="professional">Professional</option>
                        <option value="enterprise">Enterprise</option>
                        <option value="custom">Custom</option>
                      </select>
                    )}
                  />
                </Field>

                <Field label="Jumlah User" name="user_amount">
                  <Controller
                    name="user_amount"
                    control={control}
                    render={({ field }) => <Input {...field} type="number" />}
                  />
                </Field>

                <Field label="Catatan Tambahan" name="notes">
                  <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className="w-full border rounded-md p-3"
                        rows={4}
                      />
                    )}
                  />
                </Field>
              </>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <div className="space-y-4 bg-muted/40 p-6 rounded-lg">
                <Review label="Perusahaan" value={data.company_name} />
                <Review label="NPWP" value={data.npwp_number} />
                <Review label="Karyawan" value={data.employees_amount} />
                <Review label="PIC" value={data.pic_name} />
                <Review label="Telepon" value={data.pic_phone} />
                <Review label="Email" value={data.pic_email} />
                <Review label="Lisensi" value={data.license_type} />
                <Review label="User" value={data.user_amount} />
                {data.notes && <Review label="Catatan" value={data.notes} />}
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex gap-3 pt-6">
              {currentStep > 1 && (
                <Button variant="outline" onClick={onBack} type="button">
                  Kembali
                </Button>
              )}
              <Button
                className="ml-auto"
                type="submit"
                disabled={isPendingAddOrder}
              >
                {currentStep === 4 ? "Submit Order" : "Lanjutkan"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  name?: string;
  error?: any;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {children}
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}

function Review({ label, value }: { label: string; value: any }) {
  return (
    <p>
      <span className="text-muted-foreground">{label}:</span>{" "}
      <span className="font-medium">{value || "-"}</span>
    </p>
  );
}
