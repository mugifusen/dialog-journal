import React, { useEffect, useState } from "react";
import { getScores, Score } from "../services/api";
import { Container, Typography } from "@mui/material";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from 'recharts';

const Graph: React.FC = () => {
  const [data, setData] = useState<Score[]>([]);

  useEffect(() => {
    getScores().then(setData);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>1週間の感情スコア</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#1976d2" strokeWidth={3} />
          
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Graph;
