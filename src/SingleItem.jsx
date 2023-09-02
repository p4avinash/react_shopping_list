import React, { useState } from "react"
import { BiSolidEdit, BiSolidSave } from "react-icons/bi"
import { RiDeleteBin6Line, RiArrowGoBackFill } from "react-icons/ri"
import { units } from "./data"

const SingleItem = ({
  listItem,
  handleDelete,
  handleMarkDone,
  handleEditSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [modifiedItemName, setModifiedItemName] = useState("")
  const [modifiedQuantity, setModifiedQuantity] = useState(1)
  const [modifiedUnit, setModifiedUnit] = useState("none")
  const { id, item, quantity, unit, completed } = listItem

  return (
    <div className='single-item-container'>
      {!isEditing ? (
        <>
          <div className='display-element'>
            <input
              type='checkbox'
              checked={completed}
              name='checkbox'
              className='checkbox'
              onChange={() => handleMarkDone(id)}
            />
            <p
              className={`${completed ? "completed" : ""}`}
            >{`${item} - ${quantity} ${unit}`}</p>
          </div>
        </>
      ) : (
        <div className='edit-from-container'>
          <form action='' className='edit-form' onSubmit={handleEditSubmit}>
            <input
              type='text'
              placeholder='modify item'
              className='edit-form'
              onChange={(e) => setModifiedItemName(e.target.value)}
            />
            <input
              type='number'
              name='quantity'
              className='edit-quantity'
              placeholder='1'
              defaultValue='1'
              min={0}
              onChange={(e) => setModifiedQuantity(e.target.value)}
            />

            <select
              name='unit'
              id='unit'
              defaultValue='none'
              onChange={(e) => setModifiedUnit(e.target.value)}
            >
              <option value='none'>(unit)</option>
              {units.map((item) => {
                const { id, unit } = item
                return (
                  <option key={id} value={unit}>
                    {unit}
                  </option>
                )
              })}
            </select>

            <BiSolidSave
              className='icons save'
              type='submit'
              onClick={(e) =>
                handleEditSubmit(
                  e,
                  id,
                  modifiedItemName,
                  modifiedQuantity,
                  modifiedUnit
                )
              }
            />
          </form>
        </div>
      )}
      <div className='interact-element'>
        {isEditing ? (
          <RiArrowGoBackFill
            className='icons back'
            onClick={() => setIsEditing(!isEditing)}
          />
        ) : (
          <BiSolidEdit
            className='icons edit'
            onClick={() => setIsEditing(!isEditing)}
          />
        )}
        <RiDeleteBin6Line
          className='icons delete'
          onClick={() => handleDelete(id)}
        />
      </div>
    </div>
  )
}

export default SingleItem
