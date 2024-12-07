import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Select from 'react-select';
import Header from './Navbar';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '800px', // Increase width for a more professional look
  },
}));

const TranslatorContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
}));

const Column = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    width: '100%', // Adjust width to be full for mobile
  },
}));

export default function Translator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [sourceLanguage, setSourceLanguage] = useState(null); // State for source language

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
    { value: 'hi', label: 'Hindi' },
  ];

  const handleTranslate = async () => {
    if (!sourceLanguage || !inputText || !selectedLanguage) {
      setTranslatedText('Please provide text and select source and destination languages.');
      return;
    }

    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLanguage.value}|${selectedLanguage.value}`;
      console.log(`API URL: ${url}`); // Debugging URL

      const response = await fetch(url);
      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Debugging response

      if (data && data.responseData && data.responseData.translatedText) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        console.error('Unexpected API response structure:', data);
        setTranslatedText('Translation failed: unexpected response.');
      }
    } catch (error) {
      console.error('Error during translation:', error);
      setTranslatedText('Translation error. Please try again.');
    }
  };

  return (
    <>
    <Header/>
    <ThemeProvider theme={lightTheme}>
      <TranslatorContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Translator
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: 'row', // Align the columns horizontally
            }}
          >
            {/* Source Language and Input Text */}
            <Column>
              <Select
                options={languages}
                value={sourceLanguage}
                onChange={setSourceLanguage}
                placeholder="Select source language"
              />
              <TextField
                multiline
                rows={6}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate"
                variant="outlined"
              />
            </Column>

            {/* Destination Language and Output Text */}
            <Column>
              <Select
                options={languages}
                value={selectedLanguage}
                onChange={setSelectedLanguage}
                placeholder="Select destination language"
              />
              <TextField
                multiline
                rows={6}
                value={translatedText}
                placeholder="Translation will appear here"
                variant="outlined"
                readOnly
              />
            </Column>
          </Box>

          {/* Translate Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 2,
            }}
          >
            <Button
              onClick={handleTranslate}
              variant="contained"
              disabled={!selectedLanguage || !sourceLanguage || !inputText}
              fullWidth
              sx={{ width: '50%' }} // Adjust button width
            >
              Translate
            </Button>
          </Box>
        </Card>
      </TranslatorContainer>
    </ThemeProvider>
    </>
  );
}
