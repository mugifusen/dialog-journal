import {useEffect} from 'react'
import {ping} from '../services/api'

import {Button, Stack, Typography} from '@mui/material'
import { useNavigate } from "react-router-dom";

function Home() {
    const nav = useNavigate();
    // ページが表示されれたときに、api.tsのping()を実行。FastAPIが動いているかconsole.logで確認
    useEffect(() => {
        ping().then(console.log).catch(console.error);
    }, [])
    return (
        <Stack spacing={2} alignItems='center' mt={4}>
            <Typography variant="h4">日記アプリへようこそ</Typography>
            <Button variant="contained" onClick={() => nav("/journal")}>
                ジャーナリング Start
            </Button>
            <Button variant="contained" onClick={() => nav("/records")}>
                記録集
            </Button>
            <Button variant="contained" onClick={() => nav("/graph")}>
                1週間の感情推移
            </Button>
        </Stack>
    );
}

export default Home