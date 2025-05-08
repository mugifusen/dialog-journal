import { Typography, Container } from '@mui/material';

const Records = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        記録集
      </Typography>
      <Typography>
        ここに記録の一覧を表示します（今はまだデータがありません）。
      </Typography>
    </Container>
  );
};

export default Records;
