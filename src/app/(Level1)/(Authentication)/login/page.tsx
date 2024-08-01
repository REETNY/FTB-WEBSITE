import React from 'react'
import SIGNIN from '../_components/SIGNIN/SIGNIN';

export default function page({searchParams}:{searchParams: {[key:string]: string}}) {

  const back_to = searchParams.back_to;

  return (
    <SIGNIN back={(back_to == null || back_to == undefined) ? "" : back_to} />
  )
}
