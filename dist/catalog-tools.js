// Metadata-only discovery helpers, shared by the browser and content checks.
export function searchFamilies(families, query = '', order = 'featured') {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const items = families.filter(family => {
    const text = [family.name, family.slug, family.description, ...family.variants.flatMap(v =>
      [v.name, v.slug, v.description, ...v.tags])].join(' ').toLocaleLowerCase();
    return words.every(word => text.includes(word));
  });
  if (order === 'name-asc' || order === 'name-desc') {
    const collator = new Intl.Collator(undefined, {sensitivity: 'base', numeric: true});
    items.sort((a, b) => collator.compare(a.name, b.name) * (order === 'name-desc' ? -1 : 1));
  }
  return items;
}

export function catalogIndex(families) {
  return families.map(family => ({...family, variants: family.variants.map(({markdown, ...variant}) => variant)}));
}
