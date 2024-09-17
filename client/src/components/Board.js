import React from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import EditInPlace from './EditInPlace'
import Confirmation from './Confirmation'
import BoardCreator from './BoardCreator'
import ListContainer from '../containers/ListContainer'
import ListCreator from './ListCreator'
import Loader from './Loader'

const Board = ({
  board,
  updateBoard,
  deleteBoard,
  createBoard,
  selectBoard,
  list_ids,
  createList
}) => {

  if (board.isFetching) {
    return (
      <Loader isFetching={board.isFetching} />
    )
  }

  const board_options = board.board_list.map(board_option => {
    return (
      <option key={`board-option-${board_option.id}`} id={board_option.id} value={board_option.id}>{board_option.title || 'Untitled Board'}</option>
    )
  })


  let lists = list_ids.map(id => {
    return (<div key={`BoardListCol-${id}`} className="list-container">
    	<ListContainer key={`ListContainer-${id}`} id={id} />
    </div>)
  })


  function confirmDeletion() {
    deleteBoard(board.id)
  }

  function boardCreation(data) {
    createBoard(data)
  }

  function onBoardSelect(e) {
    e.preventDefault()
    selectBoard(e.target.value)
  }

  function listCreation() {
    createList(board.id)
  }



  if (!board.id) {

    return (
      <Container>
       <Row className="justify-content-center text-center align-items-center">
         <Col>
           <h1>Oops! You don't have any boards...</h1>
           <BoardCreator 
          actionLabel="Save" 
          create={boardCreation} 
          button={true}
          />
         </Col>
       </Row>
     </Container>
    )
  }

  return (

    <Container fluid={true}>
	<Row className="justify-content-between align-items-top">
  		<Col md={9} lg={7} xs={12}>
  		 <EditInPlace text={board.title} onSubmit={updateBoard} id={board.id} name="title" tag="h1" />
  		</Col>
  		<Col lg={5}>
  			<Form inline className="float-lg-right" onSubmit={selectBoard}>
  			<FormGroup>
  				<Label for="board_id">Select Board:</Label>
  				<Input type="select" name="board_id" className="ml-sm-2" onChange={onBoardSelect} defaultValue={board.id}>
  				{board_options}
  				</Input>
  			</FormGroup>
  			</Form>
        <div className="clearfix"></div>
        <div className="float-lg-right ">
        <Confirmation 
	        buttonLabel="Delete Board" 
	        confirmationAction={confirmDeletion} 
	        confirmationLabel="Delete" 
	        className="d-inline-block">
        Delete board? 
        </Confirmation> 
         {' '}/{' '}
        <BoardCreator 
	        actionLabel="Save" 
	        className="d-inline-block" 
	        create={boardCreation} 
	        />
        </div>
  		</Col>
  	</Row>
  	<div className="list-wrapper mt-5 justify-content-start">
  		{lists}
  		<div>
      <ListCreator create={createList} board_id={board.id} />
  		</div>
  	</div>
  
  
  	</Container>


  )
}

export default Board