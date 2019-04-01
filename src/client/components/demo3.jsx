import React, { Component } from "react";
import { Nav } from "./nav";
import { connect } from "react-redux";
import { deleteEmployee } from "../actions";
import EnhancedTableHead from './TableHead.jsx';
import InfiniteScroll from 'react-infinite-scroller';
import "../styles/demo3.css";
import custom from "../styles/custom.css";
import PropTypes from "prop-types";
import AddEmployee from './AddEmployee';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class Demo3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'desc',
            orderBy: 'name',
            employees: []
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (property !== 'delete' && property !== 'officePhone') {
            if (this.state.order === 'asc') {
                this.setState({ order: 'desc', orderBy: property });
            }
            else {
                this.setState({ order: 'asc', orderBy: property });
            }
        }
    };

    render() {
        const { dispatch } = this.props;
        const { order, orderBy } = this.state;
        let filteredList = [];
        let { employees } = this.props.employees;
        if (employees !== undefined && employees !== []) {

            for (let i = 0; i < employees.length; i++) {
                var obj = employees[i];
                if (obj.name !== '' && obj.name !== undefined) {
                    filteredList.push({
                        id: obj.id, name: obj.name, title: obj.title, sex: obj.sex, startDate: obj.startDate,
                        officePhone: obj.officePhone
                    });
                }
            }
        }
        var style = { width: '100%' };
        return (
            <div styleName={"custom.container"}>
                <Nav {...this.props} />
                <section styleName={"custom.header"}>
                    <h2>Employee List Demo</h2>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={true || false}
                        loader={<div className="loader" key={0}></div>}
                    >

                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={filteredList.length}
                        />
                        {stableSort(filteredList, getSorting(order, orderBy))
                            .map(item => {
                                return (
                                    <table style={style}>
                                        <td className="one" width='20%'>
                                            {item.name}
                                        </td>
                                        <td className="two" width='20%'>
                                            {item.title}
                                        </td>
                                        <td class="three" width='10%'>
                                            {item.sex}
                                        </td>
                                        <td className="four" width='20%'>
                                            {item.startDate}
                                        </td>
                                        <td className="five" width='20%'>
                                            {item.officePhone}
                                        </td>
                                        <td className="six" width='10%' onClick={() => {
                                            dispatch(deleteEmployee(item.id));
                                        }}>
                                            Delete
                                </td>
                                    </table>
                                );
                            })}
                        <AddEmployee />
                    </InfiniteScroll>
                </section>
            </div>
        );
    }
}

Demo3.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    employees: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
    return {
        employees: state.employees,
        order: state.order,
        orderBy: state.orderBy,
        page: PropTypes.number,
        rowsPerPage: PropTypes.number,
    };
};


export default connect(
    mapStateToProps,
    dispatch => ({ dispatch })
)(Demo3);