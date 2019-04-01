import React, { Component } from 'react';
import './index.css';
import { connect } from "react-redux";
import { addEmployee } from "../../actions";
import PropTypes from "prop-types";


class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '', inputb: '', inputc: '', inputd: '',
      inpute: '', showComponent: false, employees: []
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
  }

  handleInputx = e => {
    this.setState({ input: e.target.value });
  };

  handleInputy = e => {
    this.setState({ inputb: e.target.value });
  };
  handleInputw = e => {
    this.setState({ inputc: e.target.value });
  };

  handleInputz = e => {
    this.setState({ inputd: e.target.value });
  };

  handleInputo = e => {
    this.setState({ inpute: e.target.value });
  };

  submit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    var p = {
      id: Math.random() * 100000000000, name: this.state.input, title: this.state.inputb,
      sex: this.state.inputc, startDate: this.state.inputd, officePhone: this.state.inpute
    };
    dispatch(addEmployee(p));
  };

  _onButtonClick() {
    this.setState({
      showComponent: true
    });
  }

  _onCloseClick() {
    this.setState({
      showComponent: false
    });
  }
  render() {
    return (
      <div>
        {this.state.showComponent ?
          <div>
            <form onSubmit={this.submit}>
              <input value={this.state.inputx} onChange={this.handleInputx} />
              <input value={this.state.inputy} onChange={this.handleInputy} />
              <label>
                Select:
                 <select name='gender' id='gender'
                  value={this.state.inputw}
                  onChange={this.handleInputw}
                >
                  <option value="">Please select:</option>
                  <option value="F">F</option>
                  <option value="M">M</option>
                </select>
              </label>
              <input value={this.state.inputz} onChange={this.handleInputz} />
              <input value={this.state.inputo} onChange={this.handleInputo} />
              <button type="button" onClick={this._onCloseClick}>Close Form</button>
              <button type="submit">Add Employee</button>
            </form>
          </div> : null
        }
        <button class="one" type="button" onClick={this._onButtonClick}>Create New Employee</button>
      </div>
    );
  }
}

AddEmployee.propTypes = {
  employees: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
  return {
    employees: state.employees
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(AddEmployee);
