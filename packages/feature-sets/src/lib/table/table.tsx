import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MuiTable from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";

/* eslint-disable-next-line */
export interface TableProps { }

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

interface IColumnNames {
  name: string;
  title: string;
  component?: (arg: string) => React.ReactElement
}
interface IValue {
  name: string;
  value: string;
}
interface ITableProps {
  data: any;
  attributes: IColumnNames[];
};

export function Table(props: ITableProps) {
  const { data, attributes } = props;
  const classes = useStyles();
  const [rows, setRows] = useState<any>(data);
  const [searched, setSearched] = useState<string>("");


  return (
    <TableContainer>
      <MuiTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {attributes.map(({ title }) => <TableCell align="right">{title}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.name}>
              {
                attributes.map((attr) => (<TableCell align="right" component="th" scope="row">
                  {attr?.component ? attr.component(row[attr.name]) : row[attr.name]}
                </TableCell>))
              }
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
