import { NextRequest,NextResponse } from "next/server";import { movers } from "@/fixtures/market";
export async function GET(req:NextRequest){const q=(req.nextUrl.searchParams.get("q")||"").toLowerCase().slice(0,50);return NextResponse.json({data:q?movers.filter(x=>x.ticker.toLowerCase().includes(q)||x.company.toLowerCase().includes(q)):movers})}
