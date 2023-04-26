import React from 'react'
import { Flex, Box, Text, Button, Input, Spacer, Center, Skeleton } from '@chakra-ui/react'
import { useState } from 'react'
import { useContractRead, Web3Button } from "@thirdweb-dev/react";
import { ethers } from 'ethers'


const MainMint = ({contract, NFT_ADDRESS}) => {
  const [mintAmount, setMintAmount] = useState(1)
  const address = ''
  const { data: totalMintedNFT, isLoading: loadingTotalMintedNFT } = useContractRead( contract, 'totalSupply')
  const handleDecrement = () => {
    if (mintAmount <= 1) return

    setMintAmount(mintAmount - 1)
  }

  const handleIncrement = () => {
    if (mintAmount >= 3) return
    setMintAmount(mintAmount + 1)
  }

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div className="mint-container">
          <Text fontSize="48px" textShadow="0 5px #000">KryptoCamp</Text>
          <Text
            fontSize="30px"
            letterSpacing="0.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000"
            lineHeight={"26px"}
          >
            It's 2043.
            Can the KryptoCamp save humans from destructive rampant NFT speculation? Mint KryptoCamp to find out!
          </Text>
          <Spacer />


        </div>

        {contract ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                readOnly
                fontFamily="inherit"
                width="100px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                type="number"
                value={mintAmount}
              />
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>

            {/* TODO: Mint */}
            {/* <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0f0f0f"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
            >
              Mint Now
            </Button> */}

            <Center>
              <Web3Button
                      theme="light"
                      contractAddress={NFT_ADDRESS}
                        action={async () => {
                          await contract.call('mint', [mintAmount],{
                            value: ethers.utils.parseEther('0.001')
                          })
                        }}
                        onSuccess={() => {
                          setMintAmount(1)
                          alert('Mint NFT is successful!')
                        }}
                        onError={(error) => {
                          alert(error)
                        }}
                       >
                        Mint Now with 0.01ETH
                </Web3Button>
             </Center>


            {/* 目前已賣出 */}
            <Center>
            <Box
              fontSize="30px"
              letterSpacing="0.5%"
              fontFamily="VT323"
              textShadow="0 2px 2px #000"
              lineHeight={"26px"}
              marginTop="20px"
            >
              <Flex>
                    <Text>Total Minted NFT:</Text>
                      <Skeleton
                        isLoaded={!loadingTotalMintedNFT}
                        w={'24px'}
                      >
                        {totalMintedNFT?.toString()}
                      </Skeleton>
                      
                    
                  </Flex>

            </Box>
            </Center>
          </div>
        ) : (
          <Text
            marginTop="70px"
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000"
            color="#D6517D"
          >
            You must be connected to Mint
          </Text>
        )}
      </Box>
    </Flex >
  )
}

export default MainMint