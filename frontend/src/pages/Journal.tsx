import { Container, Typography} from '@mui/material';
import ChatWindow from '../components/ChatWindow';

function Journal() {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant='h5' gutterBottom>
                対話形式ジャーナリング
            </Typography>
            <ChatWindow />
        </Container>
    )
};

export default Journal;