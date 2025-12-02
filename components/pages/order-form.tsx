"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";

interface OrderFormData {
  // Step 1: Company Data
  companyName: string;
  npwp: string;
  employees: string;

  // Step 2: PIC Data
  picName: string;
  picPhone: string;
  picEmail: string;

  // Step 3: License Info
  licenseType: "professional" | "enterprise" | "custom";
  userCount: string;
  notes: string;
}

export function OrderFormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OrderFormData>({
    companyName: "",
    npwp: "",
    employees: "",
    picName: "",
    picPhone: "",
    picEmail: "",
    licenseType: "professional",
    userCount: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<OrderFormData>>({});

  useEffect(() => {
    // Load data from sessionStorage
    const startData = sessionStorage.getItem("orderStart");
    if (startData) {
      const parsed = JSON.parse(startData);
      setFormData((prev) => ({
        ...prev,
        companyName: parsed.companyName,
        picEmail: parsed.email,
      }));
    }
  }, []);

  const validateStep = (step: number) => {
    const newErrors: Partial<OrderFormData> = {};

    if (step === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = "Wajib diisi";
      if (!formData.npwp.trim()) newErrors.npwp = "Wajib diisi";
      if (!formData.employees.trim()) newErrors.employees = "Wajib diisi";
    } else if (step === 2) {
      if (!formData.picName.trim()) newErrors.picName = "Wajib diisi";
      if (!formData.picPhone.trim()) newErrors.picPhone = "Wajib diisi";
    } else if (step === 3) {
      if (!formData.userCount.trim()) newErrors.userCount = "Wajib diisi";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      // Store complete form data
      sessionStorage.setItem("completeOrder", JSON.stringify(formData));
      window.location.href = "/order-tracking";
    }
  };

  const steps = [
    { number: 1, title: "Data Perusahaan" },
    { number: 2, title: "Data PIC" },
    { number: 3, title: "Info Lisensi" },
    { number: 4, title: "Review" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/start-order"
          className="flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        {/* Progress Stepper */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step) => (
            <div key={step.number} className="flex-1 flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
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
              {step.number < steps.length && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {steps[currentStep - 1].title}
          </h1>
          <p className="text-muted-foreground mb-8">
            Langkah {currentStep} dari {steps.length}
          </p>

          <form
            onSubmit={
              currentStep === 4
                ? handleSubmit
                : (e) => {
                    e.preventDefault();
                    handleNext();
                  }
            }
            className="space-y-6"
          >
            {/* Step 1 */}
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nama Perusahaan
                  </label>
                  <Input
                    type="text"
                    placeholder="PT. Contoh Perusahaan"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className={errors.companyName ? "border-destructive" : ""}
                  />
                  {errors.companyName && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    NPWP
                  </label>
                  <Input
                    type="text"
                    placeholder="XX.XXX.XXX.X-XXX.XXX"
                    value={formData.npwp}
                    onChange={(e) =>
                      setFormData({ ...formData, npwp: e.target.value })
                    }
                    className={errors.npwp ? "border-destructive" : ""}
                  />
                  {errors.npwp && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.npwp}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Jumlah Karyawan
                  </label>
                  <Input
                    type="number"
                    placeholder="Contoh: 50"
                    value={formData.employees}
                    onChange={(e) =>
                      setFormData({ ...formData, employees: e.target.value })
                    }
                    className={errors.employees ? "border-destructive" : ""}
                  />
                  {errors.employees && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.employees}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nama PIC
                  </label>
                  <Input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={formData.picName}
                    onChange={(e) =>
                      setFormData({ ...formData, picName: e.target.value })
                    }
                    className={errors.picName ? "border-destructive" : ""}
                  />
                  {errors.picName && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.picName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nomor Telepon
                  </label>
                  <Input
                    type="tel"
                    placeholder="+62 xxx xxxx xxxx"
                    value={formData.picPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, picPhone: e.target.value })
                    }
                    className={errors.picPhone ? "border-destructive" : ""}
                  />
                  {errors.picPhone && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.picPhone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email PIC (Read-Only)
                  </label>
                  <Input
                    type="email"
                    value={formData.picEmail}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Jenis Lisensi
                  </label>
                  <select
                    value={formData.licenseType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        licenseType: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  >
                    <option value="professional">Professional</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Perkiraan Jumlah User
                  </label>
                  <Input
                    type="number"
                    placeholder="Contoh: 10"
                    value={formData.userCount}
                    onChange={(e) =>
                      setFormData({ ...formData, userCount: e.target.value })
                    }
                    className={errors.userCount ? "border-destructive" : ""}
                  />
                  {errors.userCount && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.userCount}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Catatan Tambahan (Opsional)
                  </label>
                  <textarea
                    placeholder="Informasi tambahan atau kebutuhan khusus"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    rows={4}
                  />
                </div>
              </>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-secondary/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">
                    Data Perusahaan
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-muted-foreground">Nama:</span>{" "}
                      <span className="text-foreground font-medium">
                        {formData.companyName}
                      </span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">NPWP:</span>{" "}
                      <span className="text-foreground font-medium">
                        {formData.npwp}
                      </span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Karyawan:</span>{" "}
                      <span className="text-foreground font-medium">
                        {formData.employees}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-secondary/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">
                    Data PIC
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-muted-foreground">Nama:</span>{" "}
                      <span className="text-foreground font-medium">
                        {formData.picName}
                      </span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Telepon:</span>{" "}
                      <span className="text-foreground font-medium">
                        {formData.picPhone}
                      </span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Email:</span>{" "}
                      <span className="text-foreground font-medium">
                        {formData.picEmail}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-secondary/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">
                    Informasi Lisensi
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-muted-foreground">
                        Jenis Lisensi:
                      </span>{" "}
                      <span className="text-foreground font-medium capitalize">
                        {formData.licenseType}
                      </span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">
                        Jumlah User:
                      </span>{" "}
                      <span className="text-foreground font-medium">
                        {formData.userCount}
                      </span>
                    </p>
                    {formData.notes && (
                      <p>
                        <span className="text-muted-foreground">Catatan:</span>{" "}
                        <span className="text-foreground font-medium">
                          {formData.notes}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <input
                    type="checkbox"
                    id="confirm"
                    className="mt-1"
                    defaultChecked
                  />
                  <label htmlFor="confirm" className="text-sm text-foreground">
                    Saya telah memeriksa semua data di atas dan semuanya benar.
                    Saya siap untuk mengirimkan order ini.
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack} type="button">
                  Kembali
                </Button>
              )}
              <Button type="submit" className="ml-auto">
                {currentStep === 4 ? "Submit Order" : "Lanjutkan"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
