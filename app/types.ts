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

export type User = {
  tel: string | null;
  fname: string;
  lname: string;
  email: string;
  magasin: string;
  city_id: number;
  city_name: string;
  user_uuid: string;
  address: string | null;
  valide: boolean;
  blocked: boolean;
  latitude: number | null;
  longitude: number | null;
};
