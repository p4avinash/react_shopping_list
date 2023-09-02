import React, { useState, useRef, useEffect } from "react"
import { units } from "./data"
import Items from "./Items"
import { nanoid } from "nanoid"
import { toast } from "react-toastify"

// GET ITEM DATA FROM LOCAL STORAGE
const getLocalStorage = () => {
  let localList = localStorage.getItem("list")
  if (localList) {
    localList = JSON.parse(localList)
  } else {
    localList = []
  }
  return localList
}

// SET ITEM DATA TO LOCAL STORAGE
const setLocalStorage = (newListItems) => {
  localStorage.setItem("list", JSON.stringify(newListItems))
}

const Form = () => {
  const [listItems, setListItems] = useState(getLocalStorage)
  const inputItemRef = useRef(null)
  const quantityRef = useRef(null)
  const unitRef = useRef(null)
  const formContainer = useRef(null)

  // FUNCTION TO ADD NEW ITEMS TO THE LIST
  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputItemRef.current.value) {
      const newItem = {
        id: nanoid(),
        item: inputItemRef.current.value,
        quantity: quantityRef.current.value,
        unit: unitRef.current.value === "none" ? "" : unitRef.current.value,
        completed: false,
      }

      const newListItems = [...listItems, newItem]

      setListItems(newListItems)
      setLocalStorage(newListItems)
      toast.success("Item successfully added to list")
      formContainer.current.reset()
    } else {
      toast.error("Can't submit empty items")
    }
  }

  // FUNCTION TO DELETE ITEMS FROM THE LIST
  const handleDelete = (id) => {
    const newListsItem = listItems.filter((item) => id !== item.id)
    setListItems(newListsItem)
    setLocalStorage(newListsItem)
    toast.success("Item successfully deleted")
  }

  // FUNCTION TO MARK ITEMS DONE / COMPLETED
  const handleMarkDone = (id) => {
    let newListItem = listItems.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item
    })

    setListItems(newListItem)
    setLocalStorage(newListItem)
  }

  // FUNCTION TO EDIT ITEMS
  const handleEditSubmit = (
    e,
    id,
    modifiedItemName,
    modifiedQuantity,
    modifiedUnit
  ) => {
    e.preventDefault()

    if (modifiedItemName) {
      const modifiedItem = listItems.map((listItem) => {
        if (listItem.id == id) {
          console.log(listItem)
          listItem.item = modifiedItemName
          listItem.quantity = modifiedQuantity
          listItem.unit = modifiedUnit
        }
        return listItem
      })
      setListItems(modifiedItem)
      setLocalStorage(modifiedItem)
      toast.success("Changes applied successfully")
    } else {
      toast.error("Please make changes to save")
    }
  }

  // RENDER THE LIST EVERY TIME, WHEN STATE LIST ITEM STATE CHANGES
  useEffect(() => {
    getLocalStorage()
  }, [listItems])

  return (
    <main>
      <h2>Shopping List</h2>
      <div className='container'>
        <div className='form-container'>
          <form ref={formContainer} onSubmit={handleSubmit}>
            <input
              type='text'
              name='item'
              placeholder='item'
              className='name'
              ref={inputItemRef}
            />
            <input
              type='number'
              name='quantity'
              className='quantity'
              placeholder='1'
              defaultValue='1'
              min={1}
              ref={quantityRef}
            />
            <select name='unit' id='unit' defaultValue='none' ref={unitRef}>
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
            <button type='submit' className='btn submit-btn'>
              Submit
            </button>
          </form>
        </div>
        <div className={`${listItems.length == 0 ? "" : "list-container"}`}>
          <Items
            listItems={listItems}
            handleDelete={handleDelete}
            handleMarkDone={handleMarkDone}
            handleEditSubmit={handleEditSubmit}
          />
        </div>
      </div>
    </main>
  )
}

export default Form
