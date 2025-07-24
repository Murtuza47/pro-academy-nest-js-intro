export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  isMarried: boolean;
}

export class UserService {
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example',
      gender: 'male',
      isMarried: false,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example',
      gender: 'female',
      isMarried: true,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example',
      gender: 'female',
      isMarried: false,
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob@example',
      gender: 'male',
      isMarried: true,
    },
    {
      id: 5,
      name: 'Charlie White',
      email: 'charlie@example',
      gender: 'male',
      isMarried: false,
    },
  ];

  getAllUsers(query?:{ [key: string]: string}): User[] {
    let users = this.users;

    if(query?.name) {
      users = users.filter(user => user.name.toLowerCase().includes(query.name.toLowerCase()));
    }

    if(query?.isMarried) {
      users = users.filter(user => user.isMarried === Boolean(query.isMarried === 'true'));
    }

    if(query?.gender) {
      users = users.filter(user => user.gender === query.gender);
    }

    return users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: User) {
    this.users.push(user);
  }
}
