import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        
        <span className="ml-1">HCMUT</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Inventory</span>
      </div>
    </CFooter>
  )
}     

export default React.memo(TheFooter)
