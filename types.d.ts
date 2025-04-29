export interface Question {
  question_id: number;
  category_id: number;
  question_text: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  correct_option: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: int;
  clerk_id: string;
  username: string;
  total_score: int;
  latest_score: int;
  correct_answers: int;
  wrong_answers: int;
  games_played: int;
  created_at: string;
  updated_at: string;
  last_login: string;
}

export interface Bookmark {
  id: int;
  clerk_id: string;
  question_id: int;
  created_at: string;
}
