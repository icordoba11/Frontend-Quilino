import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Divider, Typography } from '@mui/material';
import muni from '../../../assets/logo/monteCristo.webp';

interface TabItem {
  value: string;
  label: string;
  children: React.ReactNode;
}

interface TabLayoutProps {
  tabs: TabItem[];
}

const TabLayout: React.FC<TabLayoutProps> = ({ tabs }) => {
  const [value, setValue] = React.useState(tabs[0]?.value || '');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0px 10px rgba(0, 0, 0, 0.3)', backgroundColor: '#F5F5F5' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="secondary"
        aria-label="Reusable tabs layout"
        centered
        sx={{ mt: 2 }}

      >
        {tabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>
      <Divider />
      <CardContent sx={{ flex: 1, alignContent: 'center' }}>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

          }}
        >
          <img
            src={muni}
            alt="Logo"
            style={{
              maxWidth: '100px',
              maxHeight: '100px',
              objectFit: 'contain',
            }}
          />
        </Box>
        <Typography variant='h6' textAlign={'center'} sx={{
          fontWeight: 'bold',

        }}>
          Ingresar
        </Typography>
        <Typography variant='subtitle2' textAlign={'center'} sx={{ maxWidth: '70%', margin: 'auto', color: 'grey' }}>
          Ingresar a su cuenta de servicios de gestion

        </Typography>
        <Box
          sx={{
            mt: 2,
            mx: 5,
            mr: 5,
            flex: 1,
            overflowY: 'auto',
          }}
        >
          {tabs.map(
            (tab) => tab.value === value && <React.Fragment key={tab.value}>{tab.children}</React.Fragment>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TabLayout;
