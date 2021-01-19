import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Avatar,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Snackbar,
  Typography,
} from "@material-ui/core";
import {
  Headset,
  Motorcycle,
  Person,
  Print,
  Search,
  Store,
} from "@material-ui/icons";
import { change_picker$$ } from "../utils/api";
import Alert from "@material-ui/lab/Alert";
import { toRial } from "../utils/helpers";
import "./print.css";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 400,
    width: "100%",
    marginTop: "72px",
  },
  table: {
    minWidth: 650,
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  search: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  searchIcon: {
    marginLeft: theme.spacing(1),
  },
  greenButton: {
    backgroundColor: theme.palette.success.main,
    borderColor: theme.palette.success.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      borderColor: theme.palette.success.dark,
    },
    "&:active": {
      backgroundColor: theme.palette.success.light,
      borderColor: theme.palette.success.light,
    },
  },
  listText: {
    textAlign: "right",
  },
  avatar_all: {
    color: "#fff",
    backgroundColor: theme.palette.info.dark,
  },
  btnGroup: {
    justifyContent: "space-between",
    display: "flex",
  },
  productsTable: {
    marginTop: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    left: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

interface Props {
  list: any[];
  setList: any;
  pickers: any[];
}

function OrdersList(props: Props) {
  const classes = useStyles();

  const [term, setTerm] = useState<string>("");
  const [searchList, setSearchList] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<string>("");
  const [selectedOrderObject, setSelectedOrderObject] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [detailsVisbility, setDetailsVisbility] = useState<boolean>(false);
  const [print, setPrint] = useState<boolean>(false);

  useEffect(() => {
    if (term == "") {
      setSearchList(props.list);
    }
  }, [props.list]);

  const searchTerm = (evt: any) => {
    if (evt.target.value.replace(" ", "") == "") {
      setTerm("");
      setSearchList(props.list);
    } else {
      setTerm(evt.target.value);
      setSearchList(
        props.list.filter((item) =>
          item.id.toString().includes(evt.target.value)
        )
      );
    }
  };

  const changePicker = (pickerId: string) => {
    change_picker$$(
      selectedOrder,
      pickerId,
      (response) => {
        setSuccess(true);
        setOpen(false);
      },
      () => {
        setFailed(true);
        setOpen(false);
      }
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.margin}>
        <Input
          startAdornment={
            <InputAdornment position="start">
              <Search className={classes.searchIcon} />
            </InputAdornment>
          }
          placeholder="جستجو"
          fullWidth={true}
          className={classes.search}
          value={term}
          onChange={searchTerm}
        />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">کد سفارش</TableCell>
              <TableCell align="center">وضعیت</TableCell>
              <TableCell align="center">زمان ثبت</TableCell>
              <TableCell align="center">زمان تحویل</TableCell>
              <TableCell align="center">ارجاع شده</TableCell>
              <TableCell align="center">علمیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchList.length &&
              searchList.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" align="center">
                    <Button
                      variant="outlined"
                      color={"primary"}
                      onClick={() => {
                        setDetailsVisbility(true);
                        setSelectedOrderObject(row);
                      }}
                    >
                      {row.id}
                    </Button>
                  </TableCell>
                  <TableCell align="center">{row.statusText}</TableCell>
                  <TableCell align="center">{row.storedAt}</TableCell>
                  <TableCell align="center">{row.createdAt}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup orientation="vertical" variant="outlined">
                      {row.supporter && (
                        <Button variant="contained" color="primary">
                          <Headset className={classes.icon} />
                          <Typography>
                            پشتیبان : ‌
                            {`${row.supporter.firstName} ${row.supporter.lastName}`}
                          </Typography>
                        </Button>
                      )}
                      {row.biker && (
                        <Button variant="contained" color="secondary">
                          <Motorcycle className={classes.icon} />
                          <Typography>
                            پیک : ‌
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
                  <TableCell align="center">
                    {row.status != 5 && row.status != 7 && (
                      <Button
                        variant="contained"
                        color="default"
                        onClick={() => {
                          setSelectedOrder(row.id);
                          setOpen(true);
                        }}
                        className={classes.greenButton}
                      >
                        <Store className={classes.icon} />
                        <Typography>تغیر سبد چین</Typography>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Assign Picker To Order */}

      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          انتخاب سبدچین برای سفارش #{selectedOrder}
        </DialogTitle>
        <List>
          {props.pickers.map((picker) => (
            <ListItem button onClick={() => changePicker(picker.id)}>
              <ListItemAvatar>
                <Avatar className={classes.avatar_all}>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                className={classes.listText}
                primary={`${picker.firstName} ${picker.lastName}`}
              />
            </ListItem>
          ))}
        </List>
      </Dialog>

      {/* Success Message */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          تغیر سبد چین با موفقیت انجام شد !
        </Alert>
      </Snackbar>
      <Snackbar
        open={failed}
        autoHideDuration={6000}
        onClose={() => setFailed(false)}
      >
        <Alert onClose={() => setFailed(false)} severity="error">
          خطایی در تغیر سبد چین اتفاق افتاده !
        </Alert>
      </Snackbar>

      {/* Details Dialog */}

      <Dialog
        open={detailsVisbility}
        onClose={() => setDetailsVisbility(false)}
        maxWidth={"xl"}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6">جزئیات سفارش</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setPrint(true)}
            className={classes.closeButton}
          >
            <Print />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className={classes.btnGroup}>
            <Button variant="outlined" color="primary">
              کد سفارش : #{selectedOrderObject?.id}
            </Button>
            <Button variant="outlined" color="primary">
              نام مشتری‌ : {selectedOrderObject?.member.fullName}
            </Button>
            <Button variant="outlined" color="primary">
              ساعت تحویل :‌ {selectedOrderObject?.createdAt}
            </Button>
            <Button variant="outlined" color="primary">
              هزینه سفارش :‌ {toRial(selectedOrderObject?.totalPrice)}
            </Button>
          </div>
          <TableContainer component={Paper} className={classes.productsTable}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">نام کالا</TableCell>
                  <TableCell align="center">بارکد</TableCell>
                  <TableCell align="center">تعداد</TableCell>
                  <TableCell align="center">قیمت مصرف کننده</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrderObject?.products_orders.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell align="center">
                      {product?.products_endpoint.tag}
                    </TableCell>
                    <TableCell align="center">
                      {product?.products_endpoint.tag.barcode}
                    </TableCell>
                    <TableCell align="center">{product?.qty}</TableCell>
                    <TableCell align="center">
                      {toRial(product?.products_endpoint.consumerPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsVisbility(false)} color="primary">
            بستن
          </Button>
        </DialogActions>
      </Dialog>

      {/* Print Components */}

      <Dialog open={print} onClose={() => setPrint(false)} fullScreen>
        <DialogTitle id="alert-dialog-title">
          چاپ سفارش #{selectedOrderObject?.id}
        </DialogTitle>
        <DialogContent>hi bitch</DialogContent>
        <DialogActions>
          <Button onClick={() => setPrint(false)} color="primary">
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OrdersList;
