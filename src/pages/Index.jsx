import React, { useState } from "react";
import { Box, Button, Container, Heading, Input, Text, VStack, useToast } from "@chakra-ui/react";

const Index = () => {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const toast = useToast();

  const handleGuess = () => {
    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess)) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid number",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (numGuess === targetNumber) {
      toast({
        title: "Congratulations!",
        description: "You guessed the number!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setGameOver(true);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      if (newAttempts <= 0) {
        toast({
          title: "Game Over",
          description: `You're out of attempts! The number was ${targetNumber}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setGameOver(true);
      } else {
        toast({
          title: "Try again",
          description: `Hint: Your guess is too ${numGuess < targetNumber ? "low" : "high"}`,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      }
    }
    setGuess("");
  };

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(3);
    setGameOver(false);
    setGuess("");
  };

  return (
    <Container centerContent p={4}>
      <VStack spacing={4}>
        <Heading>Guess the Number!</Heading>
        <Text>{gameOver ? "Game Over" : `Attempts left: ${attempts}`}</Text>
        <Input placeholder="Enter a number between 1 and 100" value={guess} onChange={(e) => setGuess(e.target.value)} isDisabled={gameOver} />
        <Button colorScheme="blue" onClick={handleGuess} isDisabled={gameOver}>
          Guess
        </Button>
        <Button colorScheme="teal" onClick={resetGame}>
          New Game
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
