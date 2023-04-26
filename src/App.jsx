import MainMint from './MainMint';
import Navbar from './Navbar';
import { Box } from '@chakra-ui/react'
import BgImage from './assets/background/parallax-bg.gif'
import { NFT_ADDRESS } from './const/contractAddress'
import { useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import { useEffect } from 'react'


export default function Home() {




  //取得contract實例
  const { contract } = useContract(NFT_ADDRESS)

  useEffect(() => {
    console.log('contract', contract)
  }, [contract])

  return (
    <Box className="overlay">
      <Box className="App">
        <Navbar />
        <MainMint 
          contract = {contract}
          NFT_ADDRESS = {NFT_ADDRESS}
        />
      </Box>

      <Box
        className="moving-background"
        backgroundImage={BgImage}
      >

      </Box>
    </Box>
  );
}
