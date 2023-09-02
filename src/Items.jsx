import SingleItem from "./SingleItem"

const Items = ({
  listItems,
  handleDelete,
  handleMarkDone,
  handleEditSubmit,
}) => {
  return (
    <div className='item-container'>
      {listItems.map((listItem) => {
        return (
          <SingleItem
            key={listItem.id}
            listItem={listItem}
            handleDelete={handleDelete}
            handleMarkDone={handleMarkDone}
            handleEditSubmit={handleEditSubmit}
          />
        )
      })}
    </div>
  )
}

export default Items
