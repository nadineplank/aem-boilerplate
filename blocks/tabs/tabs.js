export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > .tabs-row')];
  
  // Create tab list
  const tabList = document.createElement('div');
  tabList.classList.add('tabs-nav');
  tabList.setAttribute('role', 'tablist');
  
  // Create content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('tabs-content');
  
  rows.forEach((row, index) => {
    const label = row.querySelector('.tabs-label');
    const panel = row.querySelector('.tabs-panel');
    
    // Create tab button
    const tabBtn = document.createElement('button');
    tabBtn.textContent = label.textContent.trim();
    tabBtn.classList.add('tabs-tab');
    tabBtn.setAttribute('role', 'tab');
    tabBtn.setAttribute('aria-selected', index === 0);
    tabBtn.dataset.tabIndex = index;
    
    tabList.append(tabBtn);
    
    // Hide all panels except first
    panel.classList.add('tabs-panel-content');
    if (index !== 0) panel.hidden = true;
    
    contentWrapper.append(panel);
    label.remove(); // Clean up label
  });
  
  block.innerHTML = '';
  block.append(tabList, contentWrapper);
  
  // Add event listeners
  tabList.querySelectorAll('.tabs-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetIndex = parseInt(btn.dataset.tabIndex);
      
      // Update tabs
      tabList.querySelectorAll('.tabs-tab').forEach((b, i) => {
        b.setAttribute('aria-selected', i === targetIndex);
      });
      
      // Update panels
      contentWrapper.querySelectorAll('.tabs-panel-content').forEach((p, i) => {
        p.hidden = i !== targetIndex;
      });
    });
  });
}