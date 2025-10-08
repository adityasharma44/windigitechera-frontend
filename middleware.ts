import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from 'jose'

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET),
}

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("adminToken")?.value;
    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login-admin", req.url));
        }
        try {
            const decoded = await jose.jwtVerify(token, jwtConfig.secret)
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL("/login-admin", req.url));
        }
    }
    return NextResponse.next();
}
