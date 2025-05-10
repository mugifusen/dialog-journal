import React, { useEffect, useState } from "react";
import { getRecords, Record } from "../services/api";
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";

const Records: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);

  // 画面を表示したときに実行する関数
  useEffect(() => {
    getRecords().then(setRecords);
  }, []); // , []はコンポーネントが画面に表示される1度目だけ処理を実行

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>記録集</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>内容</TableCell>
            <TableCell>感情スコア</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((r, i) => ( // recordsの各要素rとi番目として、各行の1列目に日付r, 次に内容
            <TableRow key={i}>
              <TableCell>{new Date(r.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{r.content}</TableCell>
              <TableCell>{r.sentiment_score.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Records;
