import dotenv from 'dotenv';
import server from '.';
dotenv.config();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server running at localhost:${PORT}`));
