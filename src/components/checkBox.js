import React from 'react'

const checkBox = (props) => {

    const {value, onChange} = props

  return (
    <>
       <input type="checkbox" onChange={onChange} checked={value} className="form-check-input ms-auto p-3" />
    </>
  )
}

export default checkBox
