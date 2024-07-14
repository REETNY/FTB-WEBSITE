export default async function delayTimer(val:number){
    return new Promise((resolve, reject) => setTimeout(resolve, val))
}