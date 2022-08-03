import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import axios, { AxiosPromise, AxiosResponse } from 'axios';

interface DevJoke {
  question: string;
  punchline: string;
}

function fetchDevJoke(): AxiosPromise {
  const url = `https://backend-omega-seven.vercel.app/api/getjoke?${new Date().getTime()}`;
  return axios.get<DevJoke[]>(url);
}

(async function (): Promise<void> {
  // Fetching DevJoke
  const { data }: { data: DevJoke[] } = await fetchDevJoke();
  const devJoke = data[0];

  // Create new view
  const view = Object.assign({}, { devJoke });

  // Update README.md
  const filePath = path.join(__dirname, './templates/main.ejs');

  const input = fs.readFileSync(filePath);
  const output = ejs.render(input.toString(), view);

  fs.writeFileSync('./README.md', output);
})();
