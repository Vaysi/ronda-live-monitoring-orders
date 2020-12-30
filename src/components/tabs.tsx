import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import MTabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  Block,
  DirectionsBike,
  LowPriority,
  NewReleases,
  PlaylistAddCheck,
  ViewComfy,
} from "@material-ui/icons";
import { Badge } from "@material-ui/core";

interface TabItem {
  id: string;
  label: string;
  badge: number;
  icon: any;
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    backgroundColor: "#3f51b5",
  },
  tabColor: {
    color: "#fff",
  },
}));

interface Props {
  list: any[];
  clickOnTab: any;
}

export default function Tabs(props: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [tabs, setTabs] = React.useState<any>([]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    props.clickOnTab(tabs[newValue].id);
  };

  useEffect(
    function () {
      if (props.list.length) {
        const all = props.list.length;
        const newOrders = props.list.filter((item) => item.status === 2).length;
        const editConfirmed = props.list.filter((item) => item.status === 6)
          .length;
        const editRequest = props.list.filter((item) => item.status === 12)
          .length;
        const sent = props.list.filter((item) => item.status === 7).length;
        const canceled = props.list.filter((item) => item.status === 5).length;
        setTabs([
          {
            id: "all",
            label: "همه",
            icon: <ViewComfy />,
            badge: all,
          },
          {
            id: "new",
            label: "سفارش جدید",
            icon: <NewReleases />,
            badge: newOrders,
          },
          {
            id: "edit_confirmed",
            label: "تایید ویرایش",
            icon: <PlaylistAddCheck />,
            badge: editConfirmed,
          },
          {
            id: "edit_request",
            label: "درخواست ویرایش",
            icon: <LowPriority />,
            badge: editRequest,
          },
          {
            id: "sent",
            label: "ارسال شده",
            icon: <DirectionsBike />,
            badge: sent,
          },
          {
            id: "canceled",
            label: "لغو شده",
            icon: <Block />,
            badge: canceled,
          },
        ]);
      }
    },
    [props.list]
  );

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appbar}>
        <MTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="secondary"
          textColor="secondary"
        >
          {tabs.map((tab: TabItem, index: number) => (
            <Tab
              label={tab.label}
              icon={
                tab.badge ? (
                  <Badge badgeContent={tab.badge} color="error">
                    {tab.icon}
                  </Badge>
                ) : (
                  tab.icon
                )
              }
              disabled={!tab.badge}
              className={classes.tabColor}
              {...a11yProps(index)}
            />
          ))}
        </MTabs>
      </AppBar>
    </div>
  );
}
