const hits=new Map<string,{count:number;reset:number}>();
export function allowed(key:string,limit=20,windowMs=60_000){const now=Date.now();const value=hits.get(key);if(!value||value.reset<now){hits.set(key,{count:1,reset:now+windowMs});return true}if(value.count>=limit)return false;value.count++;return true}
