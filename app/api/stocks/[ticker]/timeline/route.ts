import { NextResponse } from "next/server";import { tickerEvidence,SNAPSHOT_AT } from "@/fixtures/market";
export async function GET(_:Request,{params}:{params:Promise<{ticker:string}>}){const {ticker}=await params;return NextResponse.json({data:tickerEvidence(ticker.toUpperCase()),mode:"snapshot",capturedAt:SNAPSHOT_AT})}
