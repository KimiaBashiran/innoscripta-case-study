import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FilterBar from 'src/components/filters/FilterBar';
import Views from 'src/components/Views';
import { preChosenSources } from 'src/store/features/articleSlice';
import { useGetAllArticlesQuery } from 'src/store/services/general-endpoints';

function News() {
  useGetAllArticlesQuery(preChosenSources);

  return (
    <main
      style={{
        backgroundColor: '#F2F2F2',
        minHeight: '100vh',
      }}
    >
      <Box
        id="back-to-top-anchor"
        flexDirection="column"
        alignItems="center"
        width="100%"
        gap={10}
        display="flex"
        sx={{
          background: 'white',
        }}
      >
        <Grid container justifyContent="center" maxWidth="lg" mx="auto" gap={3} py={3}>
          <Grid
            item
            display="flex"
            flexDirection="column"
            width="100%"
            gap={2}
            py={1}
            mx={2}
            sx={{ background: 'white' }}
          >
            <FilterBar />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ width: '100%' }} />

      <Grid
        container
        display="flex"
        flexDirection="column"
        alignItems="center"
        maxWidth="lg"
        mx="auto"
        height="100%"
        width="100%"
      >
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          paddingTop={3}
          paddingBottom={7}
          width="100%"
        >
          <Views />
        </Grid>
      </Grid>
    </main>
  );
}

export default News;
