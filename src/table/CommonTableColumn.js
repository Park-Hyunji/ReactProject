import React from 'react';

const CommonTableColumn = ({ children }) => {
  return (
    <td className="common-table-column" style={{ fontFamily :"bori", fontSize : '20px', color : 'black'}}>
      {
        children
      }
    </td>
  )
}

export default CommonTableColumn;