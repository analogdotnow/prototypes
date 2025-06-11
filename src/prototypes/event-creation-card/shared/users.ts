export interface User {
  id: string;
  email: string;
  name: string;
  initials?: string;
  avatarUrl?: string;
}

export const users: User[] = [
  {
    id: "1",
    email: "sergioxro@0.email",
    name: "Sergio",
    initials: "S",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1909661221273354240/f5SkpBIB_400x400.jpg",
  },
  {
    id: "2",
    email: "artem@gmail.com",
    name: "Artem Rebets",
    initials: "AR",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1736477129393549312/Mt7taj1g_400x400.jpg",
  },
  {
    id: "3",
    email: "jean.meijer@0.email",
    name: "Jean P.D. Meijer",
    initials: "JM",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1905230630557802496/Kmk93rXS_400x400.jpg",
  },
  {
    id: "4",
    email: "iboughtbed@gmail.com",
    name: "Sanzhar Zhangaliyev",
    avatarUrl:
      "https://pbs.twimg.com/media/GrZiMGMWgAANbEx?format=jpg&name=small",
  },
  {
    id: "5",
    email: "aaron.mahlke@gmail.com",
    name: "Aaron Mahlke",
    initials: "AM",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1900513355447603200/mDqwmkZT_400x400.jpg",
  },
  {
    id: "6",
    email: "leerob@icloud.com",
    name: "Lee Robinson",
    avatarUrl: "https://github.com/leerob.png",
    initials: "LR",
  },
];

export const searchUsers = async (query?: string): Promise<User[]> => {
  // artificial delay to simulate a real search
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!query) return users.slice(0, 4);
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email?.toLowerCase().includes(query.toLowerCase()),
  );
};
