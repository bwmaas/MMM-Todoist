import * as fs from "node:fs";
import * as path from "node:path";
import { TodoistApi } from "@doist/todoist-api-typescript";

export class TodoistApiFactory {
  readonly accessToken: string

  constructor(tokenFile: string = 'token.txt') {
    const tokenPath = path.resolve(__dirname, '..', tokenFile)
    this.accessToken = fs.readFileSync(tokenPath, { encoding: 'utf8' }).trim()
  }

  api = (): TodoistApi => new TodoistApi(this.accessToken);
}
