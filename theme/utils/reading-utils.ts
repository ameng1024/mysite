export function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const totalWords = words + cjk;
  return {
    words: totalWords,
    minutes: Math.max(1, Math.ceil(totalWords / 200)),
  };
}
