import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { view } from './data';

(function (): void {
  const filePath = path.join(__dirname, './templates/main.ejs');

  const input = fs.readFileSync(filePath);
  const output = ejs.render(input.toString(), view);

  fs.writeFileSync('./README.md', output);
})();
