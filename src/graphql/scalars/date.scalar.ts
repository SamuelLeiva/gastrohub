import { GraphQLScalarType, Kind } from "graphql";

/**
 * GraphQL custom scalar for DateTime
 * Returns formatted string: yyyy-MM-dd HH:mm:ss (UTC)
 */
export const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom scalar for DateTime in yyyy-MM-dd HH:mm:ss format",
  serialize(value: unknown): string {
    const date = value instanceof Date ? value : new Date(value as string);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  parseValue(value: unknown): Date {
    return new Date(value as string);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});
