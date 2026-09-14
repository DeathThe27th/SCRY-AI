import { NextResponse } from "next/server";import { candles,SNAPSHOT_AT } from "@/fixtures/market";
export async function GET(_:Request,{params}:{params:Promise<{ticker:string}>}){const {ticker}=await params;const data=candles[ticker.toUpperCase()];return data?NextResponse.json({data,mode:"snapshot",capturedAt:SNAPSHOT_AT}):NextResponse.json({error:"No candle snapshot"},{status:404})}
