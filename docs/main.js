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
 * 3. 初始化监听
 */
document.addEventListener('DOMContentLoaded', () => {
  // 夜间模式初始化
  const savedTheme = localStorage.getItem('docsify-dark-mode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme === 'true' || (savedTheme === null && prefersDark));

  // 绑定按钮事件
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.onclick = () => setTheme(!document.body.classList.contains('dark'));
  }

  const bttBtn = document.getElementById('custom-back-to-top');
  if (bttBtn) {
    bttBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 滚动监听
  window.onscroll = updateScrollEffects;
});
