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
 * 3. 智能提示块贴标逻辑
 * 识别 blockquote 中的关键词并添加对应的样式类
 */
function applySmartAlerts() {
  const quotes = document.querySelectorAll('blockquote');
  quotes.forEach(quote => {
    const text = quote.innerText.toUpperCase(); // 统一转大写进行匹配
    
    // 危险/红色
    if (text.includes('禁止') || text.includes('危险') || text.includes('错误') || text.includes('严禁') || text.includes('DANGER') || text.includes('ERROR') || text.includes('FATAL')) {
      quote.classList.add('alert-danger');
    } 
    // 成功/绿色
    else if (text.includes('成功') || text.includes('完成') || text.includes('已解决') || text.includes('SUCCESS') || text.includes('DONE')) {
      quote.classList.add('alert-success');
    }
    // 警告/黄色
    else if (text.includes('警告') || text.includes('小心') || text.includes('WARNING') || text.includes('CAUTION')) {
      quote.classList.add('alert-warning');
    } 
    // 提示/蓝色 (由于提示最常见，放在最后匹配)
    else if (text.includes('提示') || text.includes('注意') || text.includes('建议') || text.includes('说明') || text.includes('INFO') || text.includes('TIP') || text.includes('NOTE')) {
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
