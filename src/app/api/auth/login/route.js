import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import * as jose from "jose";

const SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log('[Auth] Login attempt failed - user not found');
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      console.log('[Auth] Login attempt failed - invalid password');
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await new jose.SignJWT({ id: user.id, email: user.email, name: user.name })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(SECRET));

    console.log(`[Auth] Login successful for user: ${user.id}`);
    
    const response = NextResponse.json(
      { message: "User logged in", user: { id: user.id, email: user.email, name: user.name, role: user.role } },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.error('[Auth] Login error:', error.message, error.stack);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
