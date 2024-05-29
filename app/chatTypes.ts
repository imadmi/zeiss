interface Choice {
    choiceId: string;
    choice: string;
    next_msg_id: string;
  }
  
  interface ChatMessage {
    id: string;
    message: string;
    avatar: string;
    choices: Choice[];
  }
  
export type ChatType = ChatMessage[];
  