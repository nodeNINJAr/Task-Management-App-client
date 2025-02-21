import React from 'react'
import { Skeleton } from 'antd';

const SceletonLoader = () => {
  return (
    <div><Skeleton paragraph={{ rows: 6 }} /></div>
  )
}

export default SceletonLoader