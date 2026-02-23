import { Transform } from 'node:stream';

/**
 * Reorder CKEditor theme selectors so body theme classes work in admin:
 * `.ck-content .cs--foo ...` -> `.cs--foo .ck-content ...`
 * `.ck.ck-content .cs--foo ...` -> `.cs--foo .ck.ck-content ...`
 */
function rewriteCkeditorThemeSelectors(css) {
  return css
    .replace(/\.ck\.ck-content\s+(\.cs--[A-Za-z0-9_-]+)/g, '$1 .ck.ck-content')
    .replace(/\.ck-content\s+(\.cs--[A-Za-z0-9_-]+)/g, '$1 .ck-content');
}

/**
 * Scale rem values in CKEditor CSS from a 16px-root context to styleguide's
 * expected 20px-root sizing.
 */
function scaleCkeditorRemUnits(css) {
  return css.replace(/(-?\d*\.?\d+)rem\b/g, 'calc($1rem * 1.25)');
}

/**
 * Create a transform stream that applies CKEditor-specific CSS normalizations
 * to the compiled `ckeditor5.css` file.
 */
export function normalizeCkeditorCss() {
  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      if (file.isBuffer() && file.path && file.path.includes('ckeditor5.css')) {
        const css = file.contents.toString('utf8');
        const rewrittenSelectors = rewriteCkeditorThemeSelectors(css);
        file.contents = Buffer.from(scaleCkeditorRemUnits(rewrittenSelectors));
      }
      callback(null, file);
    },
  });
}
