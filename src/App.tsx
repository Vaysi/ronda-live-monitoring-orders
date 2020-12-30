import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import theme from "./themes/light";
import { ThemeProvider as MaterialUiProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import Tabs from "./components/tabs";
import Reload from "./components/reload";
import { get_orders_list$$ } from "./utils/api";
import OrdersList from "./components/orders-list";
import { CircularProgress } from "@material-ui/core";
import 'vazir-font/dist/Farsi-Digits/font-face-FD.css';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  loading: {
    margin: "auto",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));

export default function MyApp() {
  const classes = useStyles();

  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [visibleList, setVisibleList] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  // Timer
  const initialMinute = 0,
    initialSeconds = 15;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  // Timer Process & Logic
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    get_orders_list$$((response) => {
      setOrdersList(Object.values(response.data));
      setVisibleList(Object.values(response.data));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if(seconds === 0 && minutes === 0){
      reloadList();
    }
  }, [seconds]);

  const clickOnTab = (id: string) => {
    setSelectedTab(id);
    switch (id) {
      case "new":
        setVisibleList(ordersList.filter((item) => item.status == 2));
        break;
      case "edit_confirmed":
        setVisibleList(ordersList.filter((item) => item.status == 6));
        break;
      case "edit_request":
        setVisibleList(ordersList.filter((item) => item.status == 12));
        break;
      case "sent":
        setVisibleList(ordersList.filter((item) => item.status == 7));
        break;
      case "canceled":
        setVisibleList(ordersList.filter((item) => item.status == 5));
        break;
      default:
        setVisibleList(ordersList);
        break;
    }
  };

  const reloadList = () => {
    setLoading(true);
    get_orders_list$$((response) => {
      setOrdersList(Object.values(response.data));
      clickOnTab(selectedTab);
      setSeconds(15);
      setLoading(false);
    });
  };

  return (
    <MaterialUiProvider theme={theme}>
      <StylesProvider injectFirst>
        <div className={classes.root}>
          {loading && (
            <CircularProgress size={80} className={classes.loading} />
          )}
          <Tabs list={ordersList} clickOnTab={clickOnTab} />
          <OrdersList list={visibleList} setList={setVisibleList} />
          <Reload loading={loading} reload={reloadList} timer={{ minutes, seconds }} />
        </div>
      </StylesProvider>
    </MaterialUiProvider>
  );
}
