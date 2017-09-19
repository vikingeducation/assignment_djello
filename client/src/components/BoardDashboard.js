import React, { Component } from "react";
import PaperWrapper from "./PaperWrapper";
import { List, ListItem } from "material-ui/List";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import { createList, getLists, createCard } from "../actions";
import BoardList from "./BoardList";

class BoardDashboard extends Component {
  state = {
    formOpen: false,
    formValue: ""
  };

  componentDidMount = async () => {
    const id = this.state._id || this.props.path;
    await this.props.getLists(id);
  };

  handleListName = (e, val) => this.setState({ formValue: val });

  handleAddList = () => this.setState({ formOpen: !this.state.formOpen });

  render() {
    console.log(this.props);
    const { createList } = this.props;
    return (
      <PaperWrapper>
        <div
          style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
        >
          <h1>
            {this.props.state.title}
          </h1>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <List>
              <ListItem onClick={this.handleAddList}>Add a list...</ListItem>
              {this.state.formOpen
                ? <div>
                    <TextField onChange={this.handleListName} />
                    <RaisedButton
                      label="Save"
                      primary={true}
                      onClick={() =>
                        createList({
                          title: this.state.formValue,
                          board_id: this.props.state._id
                        })}
                    />
                  </div>
                : null}
            </List>
            {this.props.state.lists
              ? this.props.state.lists.map(list =>
                  <BoardList title={list.title} key={list._id} />
                )
              : null}
          </div>
        </div>
      </PaperWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.board
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createList: listData => {
      dispatch(createList(listData));
    },
    getLists: board_id => {
      dispatch(getLists(board_id));
    },
    createCard: list_id => {
      dispatch(createCard(list_id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardDashboard);
