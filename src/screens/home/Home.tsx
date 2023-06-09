import { useState } from "react";
import { AppBar, Box, Container, Tab, Tabs, useTheme } from "@mui/material";
import { Expenses } from "../expenses";
import { Balance } from "../balance";
import { Settings } from "../settings";
import TabPanel from "@/components/TabPanel";
import {
  BalanceOutlined,
  SettingsOutlined,
  ReceiptOutlined,
} from "@mui/icons-material";
import { TabBar } from "@/components/TabBar";
import { useData } from "@/api/fetcher";
import { Expense } from "@/types/expense";
import Header from "@/components/Header";

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

// Main component whenever user is logged in
const Home = () => {
  const theme = useTheme();
  const {
    data,
    error,
    isLoading,
  }: { data: Expense[]; error: any; isLoading: boolean } = useData("expenses");

  useData("categories");
  useData("users");

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const hasTabBar =
    value === 0 ? <TabBar expenses={data} loadingExpenses={isLoading} /> : null;

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <AppBar position="static" elevation={0}>
        <Header />
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.palette.primary.contrastText,
              height: "2px",
            },
          }}
        >
          <Tab label="Dépenses" icon={<ReceiptOutlined />} {...a11yProps(0)} />
          <Tab label="Balance" icon={<BalanceOutlined />} {...a11yProps(1)} />
          <Tab
            label="Paramètres"
            icon={<SettingsOutlined />}
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>

      <Container
        maxWidth={false}
        sx={{
          flexGrow: 1,
          overflow: "scroll",
          paddingY: "1rem",
        }}
      >
        <TabPanel value={value} index={0}>
          <Expenses
            expenses={data}
            errorExpenses={error}
            loadingExpenses={isLoading}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Balance expenses={data} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Settings />
        </TabPanel>
      </Container>

      {hasTabBar}
    </Box>
  );
};
export default Home;
