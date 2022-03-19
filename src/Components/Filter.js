import {
  IconSun,
  IconMoon,
  IconChevronUp,
  IconChevronDown,
} from '@tabler/icons';

import { useState } from 'react';

const Filter = ({ onSort }) => {
  const [mode, setMode] = useState(false);
  const [sort, setSort] = useState(false);
  // light/dark mode, tggle class .light and state mode to change icon moon/sun
  const lightMode = () => {
    setMode(!mode);
    document.body.classList.toggle('light');
  };

  // toggle sort icon up/down
  const sortByName = () => {
    setSort(!sort);
    // lift up state sort
    onSort(sort);
  };

  return (
    <div className="filter-container">
      {/* depends on state true/false render icon up/down */}
      {sort ? (
        <IconChevronUp onClick={sortByName} />
      ) : (
        <IconChevronDown onClick={sortByName} />
      )}
      {/* depends on state true/false render icon moon/sun */}
      {!mode ? (
        <IconSun onClick={lightMode} />
      ) : (
        <IconMoon onClick={lightMode} />
      )}
    </div>
  );
};

export default Filter;
