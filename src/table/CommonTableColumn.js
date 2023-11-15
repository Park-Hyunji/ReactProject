import React from 'react';

const CommonTableColumn = ({ children }) => {
  return (
    <td className="common-table-column" style={{ fontFamily :"Uiyeun", fontSize : '30px', color : 'black'}}>
      {
        children
      }
    </td>
  )
}

export default CommonTableColumn;