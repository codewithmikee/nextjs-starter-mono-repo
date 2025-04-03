import React from 'react';
function LabelValueGrid({ label, value, gridConfig = { labelGrid: 1, valueGrid: 3 } }) {
    return (<div className='grid grid-cols-4 items-center gap-4'>
      <div className='text-right'>{label}</div>
      <div className={`col-span-3 flex items-start text-start text-sm font-semibold`}>
        {value}
      </div>
    </div>);
}
export default LabelValueGrid;
