/**
 * 1. 夜间模式逻辑核心
 */
const setTheme = (isDark) => {
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('docsify-dark-mode', isDark ? 'true' : 'false');
};

/**
 * 2. 进度条与回到顶部更新函数
 */
function updateScrollEffects() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  
  const progressBar = document.getElementById("custom-progress-bar");
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
  
  const btt = document.getElementById('custom-back-to-top');
  if (btt) {
    if (winScroll > 500) {
      btt.style.display = 'flex';
    } else {
      btt.style.display = 'none';
    }
  }
}

/**
 * 3. 智能提示块贴标逻辑 (精准匹配版)
 * 仅识别以特定英文关键词开头的引用块，例如 "> NOTE:"
 */
function applySmartAlerts() {
  const quotes = document.querySelectorAll('blockquote');
  quotes.forEach(quote => {
    // 获取纯文本，去除首尾空格并转为大写
    const fullText = quote.innerText.trim().toUpperCase();
    
    // 检查开头是否匹配 [关键词]: 
    // 这种格式能极大地减少误报
    if (fullText.startsWith('DANGER:') || fullText.startsWith('ERROR:') || fullText.startsWith('FATAL:')) {
      quote.classList.add('alert-danger');
    } 
    else if (fullText.startsWith('SUCCESS:') || fullText.startsWith('DONE:')) {
      quote.classList.add('alert-success');
    }
    else if (fullText.startsWith('WARNING:') || fullText.startsWith('CAUTION:')) {
      quote.classList.add('alert-warning');
    } 
    else if (fullText.startsWith('NOTE:') || fullText.startsWith('INFO:') || fullText.startsWith('TIP:')) {
      quote.classList.add('alert-info');
    }
  });
}

/**
 * 4. 初始化监听
 */
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('docsify-dark-mode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme === 'true' || (savedTheme === null && prefersDark));

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.onclick = () => setTheme(!document.body.classList.contains('dark'));

  const bttBtn = document.getElementById('custom-back-to-top');
  if (bttBtn) bttBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  window.onscroll = updateScrollEffects;
});
