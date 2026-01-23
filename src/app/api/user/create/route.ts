import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Kiểm tra user hiện tại
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
    }

    // Kiểm tra quyền admin
    if (currentUser.role !== "admin") {
      return NextResponse.json({ message: "Bạn không có quyền tạo tài khoản" }, { status: 403 });
    }

    const body = await request.json();
    const { username, email, password, name, role, phone } = body;

    // Validate dữ liệu
    if (!username || !email || !password) {
      return NextResponse.json({ message: "Vui lòng nhập đầy đủ username, email và mật khẩu" }, { status: 400 });
    }

    // Kiểm tra username đã tồn tại
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ user: username }, { email: email }],
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Username hoặc email đã tồn tại" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Tạo user mới
    const newUser = await prisma.user.create({
      data: {
        user: username,
        email: email,
        password: hashedPassword,
        name: name || username,
        role: role || "user",
        phone: phone || null,
        status: "active",
        created_by: currentUser.username,
        updated_by: currentUser.username,
      },
    });

    return NextResponse.json(
      {
        message: "Tạo tài khoản thành công",
        user: {
          id: newUser.id,
          username: newUser.user,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create user error:", error);
    return NextResponse.json({ message: "Có lỗi xảy ra khi tạo tài khoản", error: error.message }, { status: 500 });
  }
}
