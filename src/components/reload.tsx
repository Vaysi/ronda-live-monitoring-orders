import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { Cached } from "@material-ui/icons";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },
  reload: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

interface Timer {
  seconds: number;
  minutes: number;
}

interface Props {
  timer: Timer;
  reload: any;
  loading: boolean;
}

export default function Reload(props: Props) {
  const classes = useStyles();
  const { minutes, seconds } = props.timer;
  
  return (
    <div className={classes.reload}>
      <Fab variant="extended" color="secondary" size="large" onClick={props.reload} disabled={props.loading}>
        <Cached className={classes.extendedIcon} />
        {minutes === 0 && seconds === 0 ? '' : (
          <Typography>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Typography>
        )}
      </Fab>
    </div>
  );
}
