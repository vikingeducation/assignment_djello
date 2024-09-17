import React from 'react'
import EditInPlace from './EditInPlace'
import CardContainer from '../containers/CardContainer'
import Confirmation from './Confirmation'
import { Button } from 'reactstrap'
import CardCreator from './CardCreator'
import { SortableContainer } from 'react-sortable-hoc'

const List = ({
  list,
  updateList,
  deleteList,
  createCard,
  board_cards,
  card_ids,
  id
}) => {


  const { title, description, board_id } = list

  const cards = card_ids.map((card_id, index) => {
    return (<CardContainer key={`CardContainer-${card_id}`} id={card_id} list_id={id} index={index}/>)
  })

  return (
    <div className="list-item">
  <Confirmation buttonLabel={<button type="button" className="close text-danger" aria-label="Close"><span aria-hidden="true" size="sm">&times;</span></button>} confirmationLabel="Delete" confirmationAction={deleteList} className="text-right">
    Delete list "{title}"?
    </Confirmation>

    <div className="clearfix"></div>
    <EditInPlace name="title" text={title} tag="h3" onSubmit={updateList} placeholder="Add a title..." id={id} />
    <EditInPlace name="description" text={description} tag="p" onSubmit={updateList} type="textarea" placeholder="Add a description..." id={id} />
    {cards}
    <CardCreator onSubmit={createCard}  />
    </div>
  )
}

export default SortableContainer(List)