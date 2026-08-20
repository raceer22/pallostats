import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import { useLeagueStore } from '../stores/useLeagueStore';

const LeagueView = () => {
  const { code } = useParams();
  const { currentLeague, status, fetchLeagueDetails } = useLeagueStore();

  useEffect(() => {
    if (code) {
      fetchLeagueDetails(code);
    }
  }, [code, fetchLeagueDetails]);

  if (status === 'loading') {
    return (
      <Box sx={{ p: 8, textAlign: 'center' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {currentLeague?.competition?.name || code}
      </Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Joukkueet ({currentLeague?.teams?.length || 0})
      </Typography>

      <Grid container spacing={2}>
        {currentLeague?.teams?.map((team) => (
          <Grid item xs={12} sm={6} md={3} key={team.id}>
            <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={team.badge} alt={team.name} variant="rounded" sx={{ width: 36, height: 36, bgcolor: 'transparent' }} />
              <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Typography variant="body2" fontWeight={600}>
                  {team.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LeagueView;