import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText 
} from '@mui/material';

const InfoDialog = ({ open, onClose, theme }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          padding: 2,
          background: '#fafafa'
        }
      }}
    >
      <DialogTitle sx={{ 
        fontFamily: "'Space Grotesk', sans-serif",
        color: theme.secondary
      }}>
        About <em>Glossolalia</em>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ 
          fontFamily: "'Space Grotesk', sans-serif",
          color: theme.primary 
        }}>
          <em>Glossolalia</em> ('speaking in tongues') is a drill-based language learning app. While you certainly cannot learn a language by simply drilling verb conjugations, I found when I started learning Spanish back in 2012 that I was able to get a faster grip on verb forms by simply practicing over and over online. Unfortunately, the tools I used back then are now behind paywalls or cluttered with ads. <em>Glossolalia</em> was born as a result of my frustration with this state of affairs. It is my intention that <em>Glossolalia</em> will remain free and open-source forever.
          <br/><br/>
          The verbs in this app are taken from the <a href='https://en.wikipedia.org/wiki/Swadesh_list'>Swadesh 207 List</a>, a tool in linguistics used to identify core vocabulary across languages. This list consists of concepts that are, without exception, lexicalized in all the world's languages (including dead ones). These words also often resist borrowing into other languages. Note that this does <em>not</em> mean that these verbs are necessarily the most common. Rather, they are taken to be representative of the general grammatical patterns of the language.
          <br/><br/>
          As an example, all known languages have a verb for encoding the event of eating: in Finnish, it's <em>syödä</em>, while in Spanish it's <em>comer</em>. In Hopi, an indigenous language of the Americas spoken in Arizona, the verb is <em>nöösa</em>. 
          <br/><br/>
          On the other hand, some of these words are surprising to modern language users- for example, it has been found that every language has an explicit noun for "louse" (singular of lice). By contrast, not every language has a specific lexical verb for the act of reading! Consider <a href='https://en.wikipedia.org/wiki/Proto-Indo-European_language'>Proto-Indo-European</a>, which was spoken thousands of years ago, long before the advent of writing.
          <br/><br/>
          This app is maintained by <a href='https://branpap.com'>Brandon Papineau</a> and is under ongoing construction and optimization. Feedback can be directed to: branpap (at) my_institution (dot) edu.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;