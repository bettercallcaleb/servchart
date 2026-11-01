export function nextSearchMatch(nodes, previousId, query) {
  if (!query.trim()) return null;
  const matches = nodes.filter((node) => node.type === "container" && !node.data?.dimmed);
  if (!matches.length) return null;
  const previousIndex = matches.findIndex((node) => node.id === previousId);
  return matches[(previousIndex + 1) % matches.length].id;
}
