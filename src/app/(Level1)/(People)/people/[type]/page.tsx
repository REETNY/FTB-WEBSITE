import React from 'react'

export default function page({params, searchParams}:{params:{type:string}, searchParams: {[key:string]: string}}) {
    const type = params?.type;
  return (
    <div>{type} People is still in production</div>
  )
}
