export type ShoutManageItem = {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar?: string;
  };
  stats: {
    postsType: {
      text: number;
      audio: number;
    };
    userType: {
      profile: number;
      anonymous: number;
    };
    tags: {
      Idea: number;
      Observation: number;
      Thought: number;
      Gratitude: number;
      Concern: number;
      Gossip: number;
    };
    reports: number;
  };
};
