import { ChatType } from "./chatTypes";

const chatData: ChatType = [
    {
      id: "1",
      message: "Bonjour, je suis Amine, responsable de prise de commande, pour passer votre commande, commencer par choisir un indice",
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
          next_msg_id: "3",
        },
        {
          choiceId: "3",
          choice: "1.67 AS",
          next_msg_id: "1",
        }
      ],
    },
    {
      id: "2",
      message: "Vous avez choisi l’indice 1.5choisissez le traitement ou modifier l’indice ?",
      avatar: "https://play-lh.googleusercontent.com/jQme0II-P0joIy0VBanDAY7RyccZvP4c6A7us6t3oGzcnNOvc6KcfS05m7Gq8jUOR-s=w480-h960-rw",
      choices: [
        {
          choiceId: "1",
          choice: "Définir le traitement ",
          next_msg_id: "1",
        },
        {
          choiceId: "2",
          choice: "Modifier l’indice",
          next_msg_id: "2",
        }
      ],
    },
    {
      id: "3",
      message: "Great, let's figure out why your payment isn't showing up. Can you provide the transaction ID?",
      avatar: "https://play-lh.googleusercontent.com/jQme0II-P0joIy0VBanDAY7RyccZvP4c6A7us6t3oGzcnNOvc6KcfS05m7Gq8jUOR-s=w480-h960-rw",
      choices: [
        {
          choiceId: "1",
          choice: "Sure, here's my transaction ID: ABC123",
          next_msg_id: "1",
        },
        {
          choiceId: "2",
          choice: "I don't have a transaction ID, what do I do?",
          next_msg_id: "1",
        },
        {
          choiceId: "3",
          choice: "I think my bank might have blocked the transaction.",
          next_msg_id: "1",
        },
        {
          choiceId: "4",
          choice: "I received an error message during checkout.",
          next_msg_id: "1",
        },
        {
          choiceId: "5",
          choice: "Click to review our payment policy.",
          next_msg_id: "https://example.com/payment-policy",
        },
      ],
    },
  ];
  
export default chatData;