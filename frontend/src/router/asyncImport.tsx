import React, { Suspense } from 'react'
import Skeleton from 'components/Skeleton'

const AsyncImport = (filepath: string) => {
  const LazyComp = React.lazy(() => import(`pages/${filepath}`))
  return (props: any) => (
    <Suspense fallback={<Skeleton />}>
      <LazyComp {...props} />
    </Suspense>
  )
}

export default AsyncImport
