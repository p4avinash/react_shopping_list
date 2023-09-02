import React, { useEffect, useState } from "react"

const Undo = ({
  undoDetails,
  setListItems,
  listItems,
  setShow,
  setLocalStorage,
}) => {
  const handleUndo = () => {
    console.log(undoDetails)
    const newItem = [...listItems, undoDetails]
    setListItems(newItem)
    setLocalStorage(newItem)
    setShow(false)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(false)
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className='undo-container'>
      <button onClick={handleUndo} className='btn btn-undo'>
        Undo Delete Action
      </button>
    </div>
  )
}

export default Undo
