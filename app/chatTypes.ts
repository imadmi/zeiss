export interface Choice {
  choiceId: string;
  choice: string;
  next_msg_id: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: boolean;
  avatar: string;
  choices: Choice[];
}

export type ChatType = ChatMessage[];

export interface ChoiceHistory {
  choiceId: string;
  choice: string;
  clicked: boolean;
  next_msg_id: string;
}

export interface ChatMessageHistory {
  id: string;
  message: string;
  sender: boolean;
  avatar: string;
  choices: ChoiceHistory[];
}

export type ChatHistoryType = ChatMessageHistory[];
