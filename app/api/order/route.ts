import { PrismaClient } from "@/prisma/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;
    const isNumber = !isNaN(Number(search));

    const where: any = search
      ? {
          OR: [
            { company_name: { contains: search, mode: "insensitive" } },
            { npwp_number: { contains: search, mode: "insensitive" } },
            { pic_name: { contains: search, mode: "insensitive" } },
            { pic_phone: { contains: search, mode: "insensitive" } },
            { pic_email: { contains: search, mode: "insensitive" } },
            { license_type: { contains: search, mode: "insensitive" } },
            { notes: { contains: search, mode: "insensitive" } },
            { status: { contains: search, mode: "insensitive" } },
            isNumber ? { id: Number(search) } : undefined,
          ].filter(Boolean),
        }
      : {};

    const [data, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: "desc" },
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /orders error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await prisma.order.create({
      data: {
        company_name: body.company_name,
        npwp_number: body.npwp_number,
        employees_amount: body.employees_amount,
        pic_name: body.pic_name,
        pic_phone: body.pic_phone,
        pic_email: body.pic_email,
        license_type: body.license_type,
        user_amount: body.user_amount,
        notes: body.notes,
        status: body.status,
      },
    });

    return NextResponse.json({
      message: "Order has been added",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
