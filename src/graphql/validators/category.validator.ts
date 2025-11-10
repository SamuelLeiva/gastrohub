export function validateCreateCategoryInput(
  name: string,
  description: string
): void {
  if (!name.trim()) throw new Error("Name is required");
  if (!description.trim()) throw new Error("Description is required");
}
