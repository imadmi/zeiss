import { ChatType } from "./chatTypes";

const chatData: ChatType = [
    {
      id: "1",
      message: "Bonjour, je suis Amine, responsable de prise de commande, pour passer votre commande, commencer par choisir un indice",
      sender: false,
      avatar: "https://play-lh.googleusercontent.com/jQme0II-P0joIy0VBanDAY7RyccZvP4c6A7us6t3oGzcnNOvc6KcfS05m7Gq8jUOR-s=w480-h960-rw",
      choices: [
        {
          choiceId: "1",
          choice: "1.5",
          next_msg_id: "2",
        },
        {
          choiceId: "2",
          choice: "1.6",
          next_msg_id: "2",
        },
        {
          choiceId: "3",
          choice: "1.67 AS",
          next_msg_id: "2",
        }
      ],
    },
    {
      id: "2",
      message: "Vous avez choisi l’indice 1.5choisissez le traitement ou modifier l’indice ?",
      sender: false,
      avatar: "https://play-lh.googleusercontent.com/jQme0II-P0joIy0VBanDAY7RyccZvP4c6A7us6t3oGzcnNOvc6KcfS05m7Gq8jUOR-s=w480-h960-rw",
      choices: [
        {
          choiceId: "1",
          choice: "Définir le traitement ",
          next_msg_id: "3",
        },
        {
          choiceId: "2",
          choice: "Modifier l’indice",
          next_msg_id: "1",
        }
      ],
    },
    {
      id: "3",
      message: "",
      sender: false,
      avatar: "https://play-lh.googleusercontent.com/jQme0II-P0joIy0VBanDAY7RyccZvP4c6A7us6t3oGzcnNOvc6KcfS05m7Gq8jUOR-s=w480-h960-rw",
      choices: [
        {
          choiceId: "1",
          choice: "UV PROTECT DURAVISION \nSilver",
          next_msg_id: "4",
        },
        {
          choiceId: "2",
          choice: "UV PROTECT DURAVISION \nPlatinium",
          next_msg_id: "4",
        },
        {
          choiceId: "3",
          choice: "UV PROTECT DURAVISION \nBlueProtect",
          next_msg_id: "4",
        },
      ],
    },
    {
      id: "4",
      message: "Vous avez choisi :\nIndice : 1.5\nTraitement : UV Silver\n Veuillez saisir le nom complet du proteur",
      sender: false,
      avatar: "https://play-lh.googleusercontent.com/jQme0II-P0joIy0VBanDAY7RyccZvP4c6A7us6t3oGzcnNOvc6KcfS05m7Gq8jUOR-s=w480-h960-rw",
      choices: [
      ],
    },
  ];
  
export default chatData;