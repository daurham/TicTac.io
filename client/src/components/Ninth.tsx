import React from 'react'

type Props = {
  ninthNum: string;
  value: string;
}

const Ninth = ({ ninthNum, value }:Props) => {
  return (
    <div>
      {ninthNum}
    </div>
  )
}

export default Ninth