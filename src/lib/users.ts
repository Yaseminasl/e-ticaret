import { db } from "@/lib/database";
import { hashPassword, verifyPassword } from "@/lib/password";
import type { User } from "@/types/user";

type UserRow = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: "user" | "admin";
  created_at: string;
};

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

function mapUser(row: UserRow): User {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    role: row.role,
    createdAt: row.created_at,
  };
}

export function getUserById(id: string) {
  const row = db
    .prepare(
      `
      SELECT id, name, email, password_hash, role, created_at
      FROM users
      WHERE id = ?
      `,
    )
    .get(Number(id)) as UserRow | undefined;

  return row ? mapUser(row) : null;
}

export function createUser(input: CreateUserInput) {
  const normalizedEmail = input.email.trim().toLocaleLowerCase("tr-TR");
  const passwordHash = hashPassword(input.password);

  const result = db
    .prepare(
      `
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, 'user')
      `,
    )
    .run(input.name.trim(), normalizedEmail, passwordHash);

  return getUserById(String(result.lastInsertRowid));
}

export function verifyUserLogin(email: string, password: string) {
  const normalizedEmail = email.trim().toLocaleLowerCase("tr-TR");

  const row = db
    .prepare(
      `
      SELECT id, name, email, password_hash, role, created_at
      FROM users
      WHERE email = ?
      `,
    )
    .get(normalizedEmail) as UserRow | undefined;

  if (!row || !verifyPassword(password, row.password_hash)) {
    return null;
  }

  return mapUser(row);
}
