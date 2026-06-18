export function BackToTop() {
  return (
    <button
      id="back-to-top-btn"
      type="button"
      className="hide btn-regular rounded-2xl w-11 h-11 fixed bottom-8 right-8 z-50 active:scale-90"
      aria-label="Back to Top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
        <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
      </svg>
    </button>
  );
}
