import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Box, Avatar, Skeleton } from '@mui/material';
import { useLeagueStore } from '../stores/useLeagueStore';

const HomeView = () => {
  const navigate = useNavigate();
  const { competitions, fetchCompetitions } = useLeagueStore();

  useEffect(() => {
    if (!competitions || competitions.length === 0) {
      fetchCompetitions();
    }
  }, [competitions, fetchCompetitions]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Sarjat & Kilpailut
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Valitse sarja tarkastellaksesi sarjataulukoita, joukkueita ja kokoonpanoja.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {competitions && competitions.length > 0
          ? competitions.map((comp) => (
              <Grid item xs={12} sm={6} md={4} key={comp.id || comp.code}>
                <Card
                  onClick={() => navigate(`/competitions/${comp.code}`)}
                  sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', p: 2 }}
                >
                  <Avatar
                    src={comp.emblem}
                    alt={comp.name}
                    variant="rounded"
                    sx={{ width: 48, height: 48, mr: 2, bgcolor: 'transparent' }}
                  />
                  <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    <Typography variant="h6" fontWeight={600}>
                      {comp.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Koodi: {comp.code}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : Array.from(new Array(6)).map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Skeleton variant="rounded" height={80} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default HomeView;