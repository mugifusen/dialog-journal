import {Button, Stack} from '@mui/material'
import { useNavigate } from "react-router-dom";

function Home() {
    const nav = useNavigate();
    return (
        <Stack spacing={2} alignItems='center' mt={4}>
            <Button onClick={() => nav('/journal')}>ジャーナリング Start</Button>
            <Button onClick={() => nav('records')}>記録集</Button>
            <Button onClick={() => nav('graph')}>1習慣の感情推移</Button>
        </Stack>
    );
}

export default Home