import { NextResponse } from 'next/server'

export function middleware(request) {
    const url = request.nextUrl
    return NextResponse.rewrite(url)
}