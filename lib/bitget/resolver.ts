const fallback=process.env.BITGET_RWA_MARKETPLACE_URL||"https://web3.bitget.com/en/swap";
export function resolveBitgetLink(ticker:string){return {url:fallback,exact:false,searchTicker:`${ticker}X`};}
