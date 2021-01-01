import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { Apps, Fastfood, Store } from "@material-ui/icons";
import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  listText: {
    textAlign: "right"
  },
  avatar_all:{
    color: "#fff",
    backgroundColor: theme.palette.info.dark,
  },
  avatar_market: {
    color: "#212121",
    backgroundColor: "#ffc400",
  },
  avatar_restaurants: {
    color: "#ffeb3b",
    backgroundColor: theme.palette.info.dark,
  }
}));

interface Props {
  vendorType: string;
  setVendorType: any;
  loading: boolean;
  reload: any;
}

export default function VendorType(props: Props) {
  const classes = useStyles();

  const [open,setOpen] = useState<boolean>(false);

  const realodList = (id:string) => {
    props.setVendorType(id);
  }

  useEffect(() => {
    props.reload();
    setOpen(false);
  },[props.vendorType]);

  return (
    <div className={classes.root}>
      <Fab
        variant="extended"
        color="primary"
        size="large"
        disabled={props.loading}
        onClick={() => setOpen(true)}
      >
        تغیر وندور
        <Store className={classes.extendedIcon} />
      </Fab>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">نمایش سفارشات بر اساس نوع وندور</DialogTitle>
        <List>
          <ListItem
            button
            onClick={() => realodList('all')}
            selected={props.vendorType == 'all'}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar_all}>
                <Apps />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.listText} primary="همه" />
          </ListItem>
          <ListItem
            button
            onClick={() => realodList('1')}
            selected={props.vendorType == '1'}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar_market}>
                <Store />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.listText} primary="مارکت" />
          </ListItem>
          <ListItem
            button
            onClick={() => realodList('0')}
            selected={props.vendorType == '0'}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar_restaurants}>
                <Fastfood />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.listText} primary="رستوران" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
