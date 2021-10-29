# 2109-wns-remote3-stack-back

Backend repository for the Stack projet. This project works with Docker.

## Setup the local env
Create a `.env` file at the root of the project, with the following structure :
```bash
DATABASE_URL="postgresql://<database-username>:<database-password>@database:5432/<database-name>?schema=public"
PORT=<port>

POSTGRES_PASSWORD="<database-password>"
POSTGRES_USER="<database-username>"
POSTGRES_DB="<database-name>"
```

## Start container

To start the Docker container, run the following command: `docker compose up --build`

## Best practices

### General best practices
- **Do not leave commented code in the codebase**, unless you have a specific reason for it. If you do, add a comment to explain why you left that commented code.

### Commit naming
We base our convetion on [conventionnal commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/).
``` 
type(Scope): add an imperative message
```
- Type is limited to :
`feat, fix, chore, docs, style, refactor, perf, test, build`
- Scope defines what is affected by your commit. It can be a component, a general feature, a technical aspect ... E.g: `chore(CI): improve pull request checks`, `docs(best practices): xxx`, `fix(authentication): properly redirect on logout`, `style(linter): apply linter recommendations` ...
- The message must be imperative. Generally it starts with a verb. It should give a good description of what your commit does. Bad examples: `repairing stuff`, `foo`, `try something`, `qsdlkj`. Good examples : `remove unused functions`, `improve responsiveness`, ...

If you struggle remembering how to format your commits, you can use [this extension](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits).
