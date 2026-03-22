// import './style.css'
/* Wavy CSS: lightweight utility-first CSS engine */
(function (global) {
  const tokenToSize = {
    'xs': '0.75rem',
    'sm': '0.875rem',
    'base': '1rem',
    'lg': '1.125rem',
    'xl': '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  };

  const alias = {
    p: 'padding',
    m: 'margin',
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
    x: ['left', 'right'],
    y: ['top', 'bottom'],
    bg: 'background-color',
    text: 'color',
    border: 'border',
    rounded: 'border-radius',
    w: 'width',
    h: 'height'
  };

  const colorAlias = {
    red: 'red',
    blue: 'blue',
    green: 'green',
    yellow: 'yellow',
    black: 'black',
    white: 'white',
    gray: 'gray',
    slate: 'slate',
    teal: 'teal',
    orange: 'orange'
  };

  function parseSpacing(value) {
    if (value === '0') return '0px';
    if (/^\d+(\.\d+)?$/.test(value)) return `${value}px`;
    if (/^\d+\/(\d+)$/.test(value)) {
      const parts = value.split('/').map(Number);
      if (parts[1] && parts[0]) return `${(parts[0] / parts[1]) * 100}%`;
    }
    return value;
  }

  function parseClass(cls) {
    const result = {};
    const after = cls.slice(5);
    if (!after) return result;

    const parts = after.split('-');
    const name = parts[0];
    const remainder = parts.slice(1).join('-');

    // spacing
    if (['p', 'm', 'pt', 'pr', 'pb', 'pl', 'px', 'py'].includes(name)) {
      let sides = [];
      const property = name.charAt(0) === 'p' ? 'padding' : 'margin';
      switch (name) {
        case 'pt': sides = ['top']; break;
        case 'pr': sides = ['right']; break;
        case 'pb': sides = ['bottom']; break;
        case 'pl': sides = ['left']; break;
        case 'px': sides = ['left', 'right']; break;
        case 'py': sides = ['top', 'bottom']; break;
        default: sides = ['top', 'right', 'bottom', 'left'];
      }
      if (remainder) {
        const parsed = parseSpacing(remainder);
        sides.forEach(side => {
          const key = `${property}-${side}`;
          result[key] = parsed;
        });
      }
      return result;
    }

    // clickable styles
    if (name === 'bg') {
      const v = remainder || 'transparent';
      result['background-color'] = colorAlias[v] || v;
      return result;
    }
    if (name === 'text') {
      const v = remainder;
      if (!v) return result;

      if (['left', 'right', 'center', 'justify'].includes(v)) {
        result['text-align'] = v;
      } else if (tokenToSize[v]) {
        result['font-size'] = tokenToSize[v];
      } else {
        result['color'] = colorAlias[v] || v;
      }
      return result;
    }

    // typography
    if (name === 'font') {
      if (remainder in tokenToSize) {
        result['font-size'] = tokenToSize[remainder];
      }
      return result;
    }

    if (['left', 'right', 'center', 'justify'].includes(name)) {
      result['text-align'] = name;
      return result;
    }

    // border
    if (name === 'border') {
      if (!remainder) {
        result['border'] = '1px solid black';
      } else if (/^\d+$/.test(remainder)) {
        result['border-width'] = `${remainder}px`;
        result['border-style'] = 'solid';
      } else {
        result['border'] = `1px solid ${colorAlias[remainder] || remainder}`;
      }
      return result;
    }

    if (name === 'rounded') {
      if (!remainder) result['border-radius'] = '0.25rem';
      else if (remainder in tokenToSize) result['border-radius'] = tokenToSize[remainder];
      else if ( parseSpacing(remainder)) result['border-radius'] = parseSpacing(remainder);
      return result;
    }

    // layout
    if (['block', 'inline-block', 'inline', 'flex', 'grid'].includes(name)) {
      result['display'] = name;
      return result;
    }
    if (name === 'justify') {
      result['justify-content'] = remainder;
      return result;
    }
    if (name === 'items') {
      result['align-items'] = remainder;
      return result;
    }

    // width/height
    if (name === 'w' || name === 'h') {
      const axis = name === 'w' ? 'width' : 'height';
      if (remainder === 'full') result[axis] = '100%';
      else if (remainder) result[axis] = parseSpacing(remainder);
      return result;
    }

    return result;
  }

  function applyStyles(element, styles) {
    Object.keys(styles).forEach(k => {
      element.style.setProperty(k, styles[k]);
    });
  }

  function processElement(el) {
    const classes = Array.from(el.classList);
    const utilities = classes.filter(c => c.startsWith('chai-'));
    if (!utilities.length) return;

    const styleMap = {};

    utilities.forEach(cls => {
      const parsed = parseClass(cls);
      Object.assign(styleMap, parsed);
      el.classList.remove(cls);
    });

    applyStyles(el, styleMap);
  }

  function processDOM(root = document) {
    const all = Array.from(root.querySelectorAll('[class*="chai-"]'));
    all.forEach(processElement);
    if (root.matches && root.matches('[class*="chai-"]')) processElement(root);
  }

  function initWavyCSS() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => processDOM(document));
    } else {
      processDOM(document);
    }
  }

  global.WavyCSS = {
    parseClass,
    processElement,
    processDOM,
    init: initWavyCSS
  };

  if (typeof window !== 'undefined') {
    initWavyCSS();
  }
})(typeof window !== 'undefined' ? window : global);


