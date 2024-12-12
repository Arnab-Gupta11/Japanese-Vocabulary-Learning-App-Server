export type TVocabulary = {
  word: string;
  meaning: string;
  pronunciation: string;
  whenToSay: string;
  lessonNo: string;
  adminEmail: string;
};
export type TPaginatedResult = {
  vocabularies: TVocabulary[];
  totalVocabularies: number;
  totalPages: number;
};
