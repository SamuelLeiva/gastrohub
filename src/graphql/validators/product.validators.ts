export function validateCreateProductInput(
  name: string,
  description: string,
  price: number,
  imageUrl: string
): void {
  if (!name.trim()) throw new Error("Name is required");
  if (!description.trim()) throw new Error("Description is required");
  if (price <= 0) throw new Error("Price must be greater than 0");
  if (!imageUrl.trim()) throw new Error("Description is required");
}
