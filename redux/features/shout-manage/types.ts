export type ShoutManageItem = {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar?: string;
  };
  // shouts?: {
  //   id: string;
  //   content: string;
  //   location: string;
  //   createdAt: string;
  //   type: string;
  //   userType: string;
  //   status: string;
  //   stats: {
  //     likes: number;
  //     comments: number;
  //     shares: number;
  //   };
  //   medias: Array<{
  //     id: string;
  //     created_at: string;
  //     type: string;
  //     url: string;
  //     duration: string;
  //     shout_id: string;
  //   }>;
  // }[];
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

export type ShoutContentManagementItem = {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar?: string;
  };
  shouts: Array<{
    id: string;
    content: string;
    location: string;
    createdAt: string;
    type: "TEXT" | "AUDIO";
    userType: string;
    status: string;
    stats: {
      likes: number;
      comments: number;
      shares: number;
    };
    medias: Array<{
      id: string;
      created_at: string;
      type: string;
      url: string;
      duration: string;
      shout_id: string;
    }>;
  }>;
  stats: {
    postsType: {
      text: number;
      audio: number;
    };
    userType: {
      profile: number;
      anonymous: number;
    };
    status: {
      published: number;
      flagged: number;
    };
  };
};
