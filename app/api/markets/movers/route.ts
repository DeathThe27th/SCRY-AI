import { NextResponse } from "next/server";import { movers,SNAPSHOT_AT } from "@/fixtures/market";
export async function GET(){return NextResponse.json({data:movers,mode:"snapshot",capturedAt:SNAPSHOT_AT},{headers:{"Cache-Control":"public, max-age=300"}})}
