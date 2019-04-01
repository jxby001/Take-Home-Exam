import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import "../styles/TableHead.css";

const rows = [
    { id: 'name', numeric: false, label: 'Name', wid: "20%" },
    { id: 'title', numeric: false, label: 'Title', wid: "20%" },
    { id: 'sex', numeric: false, label: 'Sex', wid: "10%" },
    { id: 'startDate', numeric: false, label: 'Start Date', wid: "20%" },
    { id: 'officePhone', numeric: false, label: 'Office Phone', wid: "20%" },
    { id: 'delete', numeric: false, label: 'Delete', wid: "10%" },
];


class EnhancedTableHead extends Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;
        var style = { width: '100%' };
        return (
            <table style={style}>
                <tr>
                    {rows.map(row => {
                        return (
                            <td
                                key={row.id}
                                numeric={row.numeric}
                                sortDirection={orderBy === row.id ? order : false}
                                width={row.wid}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </td>
                        );
                    }, this)}
                </tr>
            </table>
        );
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
export default EnhancedTableHead;
