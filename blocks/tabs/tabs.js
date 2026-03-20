export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > .tabs-row')];
  console.log('Tabs decorate: found rows:', rows.length); // DEBUG
  
  const tabList = document.createElement('div');
  tabList.classList.add('tabs-nav');
  tabList.setAttribute('role', 'tablist');
  
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('tabs-content');
  
  rows.forEach((row, index) => {
    const label = row.querySelector('.tabs-label');
    const panel = row.querySelector('.tabs-panel');
    
    // Tab button
    const tabBtn = document.createElement('button');
    tabBtn.textContent = label.textContent.trim();
    tabBtn.classList.add('tabs-tab');
    tabBtn.setAttribute('role', 'tab');
    tabBtn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    
    tabList.append(tabBtn);
    
    // Panel
    panel.classList.add('tabs-panel-content');
    if (index !== 0) panel.hidden = true;
    
    contentWrapper.append(panel);
    label.remove();
  });
  
  block.innerHTML = '';
  block.append(tabList, contentWrapper);
  
  // Event listeners
  tabList.querySelectorAll('.tabs-tab').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // Hide all panels
      contentWrapper.querySelectorAll('.tabs-panel-content').forEach(p => p.hidden = true);
      // Show clicked
      contentWrapper.children[index].hidden = false;
      // Update ARIA
      tabList.querySelectorAll('.tabs-tab').forEach(b => b.setAttribute('aria-selected', 'false'));
      btn.setAttribute('aria-selected', 'true');
    });
  });
}
