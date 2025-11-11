export function validateRegisterInput(
  name: string,
  email: string,
  password: string
): void {
  if (!name.trim()) throw new Error("Name is required");
  if (!email.includes("@")) throw new Error("Invalid email format");
  if (password.length < 6)
    throw new Error("Password must be at least 6 characters");
}
