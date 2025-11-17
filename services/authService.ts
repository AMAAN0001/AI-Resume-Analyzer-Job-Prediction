
export interface User {
  email: string;
  name: string;
  id: string;
}

const USERS_STORAGE_KEY = 'cvaro-users';
const CURRENT_USER_KEY = 'cvaro-current-user';

// Simple hash function for password (in production, use proper backend authentication)
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
};

interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

class AuthService {
  private getUsers(): StoredUser[] {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsers(users: StoredUser[]): void {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  async signup(email: string, password: string, name: string): Promise<User> {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = this.getUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      throw new Error('An account with this email already exists.');
    }

    // Create new user
    const newUser: StoredUser = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      name,
      passwordHash: simpleHash(password)
    };

    users.push(newUser);
    this.saveUsers(users);

    // Set as current user
    const user: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return user;
  }

  async login(email: string, password: string): Promise<User> {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = this.getUsers();
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.passwordHash === simpleHash(password)
    );

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    // Set as current user
    const currentUser: User = {
      id: user.id,
      email: user.email,
      name: user.name
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));

    return currentUser;
  }

  logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export const authService = new AuthService();
