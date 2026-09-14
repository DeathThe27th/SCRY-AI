import { Shell } from "@/components/shell";import { Desk } from "@/components/desk/desk";
export default async function Stock({params}:{params:Promise<{ticker:string}>}){const {ticker}=await params;return <Shell><Desk initialTicker={ticker.toUpperCase()}/></Shell>}
