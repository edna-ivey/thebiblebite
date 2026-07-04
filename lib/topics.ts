import { topics } from "@/content/taxonomy/topics";

export function getTopics() {
  return topics;
}

export function getTopicBySlug(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function hasTopic(slug: string) {
  return Boolean(getTopicBySlug(slug));
}

export function getTopicName(slug: string) {
  return getTopicBySlug(slug)?.name ?? slug;
}
