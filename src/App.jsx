import MainMint from './MainMint';
import Navbar from './Navbar';
import { Box } from '@chakra-ui/react'


export default function Home() {

  return (
    <Box className="overlay">
      <Box className="App">
        <Navbar />
        <MainMint />
      </Box>

      <Box className="moving-background"></Box>
    </Box>
  );
}
