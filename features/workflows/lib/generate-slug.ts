import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from "unique-names-generator"

/**
 * Returns a random hyphenated name built from an adjective and an animal,
 * e.g. "brave-otter".
 */
export function generateSlug() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
    length: 2,
    style: "lowerCase",
  })
}
