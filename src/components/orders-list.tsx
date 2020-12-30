import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { DataGrid, ColDef, ValueGetterParams } from "@material-ui/data-grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import { Headset, Motorcycle, Store } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 400,
    width: "100%",
  },
  table: {
    minWidth: 650,
  },
  icon: {
    marginLeft: theme.spacing(1)
  },
  date: {
    direction: "ltr"
  }
}));

interface Props {
  list: any[];
  setList: any;
}

export default function OrdersList(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">کد سفارش</TableCell>
              <TableCell align="center">وضعیت</TableCell>
              <TableCell align="center">زمان ثبت</TableCell>
              <TableCell align="center">زمان تحویل</TableCell>
              <TableCell align="center">ارجاع شده</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.list.length &&
              props.list.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.statusText}</TableCell>
                  <TableCell align="center" className={classes.date}>{row.storedAt}</TableCell>
                  <TableCell align="center" className={classes.date}>{row.createdAt}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup orientation="vertical" variant="outlined">
                      {row.supporter && (
                        <Button variant="contained" color="primary">
                          <Headset className={classes.icon} />
                          <Typography>
                            پشتیبان  : ‌
                            {`${row.supporter.firstName} ${row.supporter.lastName}`}
                          </Typography>
                        </Button>
                      )}
                      {row.biker && (
                        <Button variant="contained" color="secondary">
                          <Motorcycle className={classes.icon} />
                          <Typography>
                            پیک  : ‌
                            {`${row.biker.firstName} ${row.biker.lastName}`}
                          </Typography>
                        </Button>
                      )}
                      {row.picker && (
                        <Button variant="contained" color="default">
                          <Store className={classes.icon} />
                          <Typography>
                            سبدچین :   
                            {` ${row.picker.firstName} ${row.picker.lastName}`}
                          </Typography>
                        </Button>
                      )}
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
