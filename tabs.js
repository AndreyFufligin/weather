const initTabs = () => {
  const tabsItem = document.querySelectorAll('.tabs-item');
  const tabsBlock = document.querySelectorAll('.tabs__block');

  for (let item of tabsItem) {
    item.addEventListener('click', () => {
      for (let elem of tabsBlock) {
        elem.classList.add('hidden');
      }

      const content = document.querySelector('#' + item.dataset.tab);
      content.classList.remove('hidden');
    });
  }
};

export { initTabs };
