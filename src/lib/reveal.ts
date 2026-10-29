/**
 * Scroll reveal utility.
 * Mark elements with data-reveal="up | mask | scale | line | group" (optional data-delay="ms").
 * "group" staggers its direct children. Each element animates once.
 * Styles live in components.css and only apply when <html> has .reveal-ready,
 * so content stays visible without JavaScript or with reduced motion.
 */
export function setupReveal(root: HTMLElement | null): () => void {
  if (!root || !document.documentElement.classList.contains('reveal-ready')) return () => {};
  const timers: number[] = [];
  const reveal = (el: HTMLElement) => {
    const delay = Number(el.dataset.delay || 0);
    el.style.setProperty('--d', `${delay}ms`);
    if (el.dataset.reveal === 'group') {
      Array.from(el.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--d', `${delay + Math.min(i, 8) * 90}ms`));
    }
    el.classList.add('is-in');
    timers.push(window.setTimeout(() => el.classList.add('rv-done'), delay + 1600));
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      const targets = (entry.target as HTMLElement & { __rv?: HTMLElement[] }).__rv || [];
      targets.forEach(reveal);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });

  root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach(el => {
    // A clip-masked element has no visible area, so watch its parent instead.
    const watch = (el.dataset.reveal === 'mask' && el.parentElement ? el.parentElement : el) as HTMLElement & { __rv?: HTMLElement[] };
    watch.__rv = [...(watch.__rv || []), el];
    io.observe(watch);
  });
  return () => { io.disconnect(); timers.forEach(clearTimeout); };
}
