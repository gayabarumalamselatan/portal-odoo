"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { orderService } from "@/service/order.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const OrderSchema = yup.object().shape({
  company_name: yup.string().required("Masukkan nama perusahaan"),
  npwp_number: yup.string().required("Masukkan nomor NPWP"),
  employees_amount: yup.number(),
  pic_name: yup.string().required("Masukkan nama PIC"),
  pic_phone: yup.string().required("Masukkan nomor telepon"),
  pic_email: yup.string().required("Masukkan email"),
  license_type: yup.string(),
  user_amount: yup.string(),
  notes: yup.string(),
  status: yup.string(),
});

const AddOrder = async (payload: any) => {
  const result = await orderService.addOrder(payload);
  return result;
};

const useOrderForm = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      company_name: "",
      npwp_number: "",
      employees_amount: 0,
      pic_name: "",
      pic_phone: "",
      pic_email: "",
      license_type: "professional",
      user_amount: "",
      notes: "",
      status: "DITERIMA",
    },
    resolver: yupResolver(OrderSchema),
  });

  console.log(form.watch());

  const {
    mutate: mutateAddOrder,
    isPending: isPendingAddOrder,
    isSuccess: isSuccessAddOrder,
  } = useMutation({
    mutationFn: AddOrder,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (res) => {
      console.log("res", res.data.data);
      const orderId = Number(res.data.data.id);
      console.log("asdw", orderId);
      router.push(`/order-success/${orderId}`);
      form.reset();
    },
  });

  const handleAddOrder = (data: any) => mutateAddOrder(data);

  console.log(form.watch());
  return {
    form,
    isPendingAddOrder,
    isSuccessAddOrder,
    handleAddOrder,
  };
};

export default useOrderForm;
