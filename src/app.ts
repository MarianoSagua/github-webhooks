import express from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/github.controller";
import { GitHubSha256Middleware } from "./presentation/middlewares/github-sha256.middleware";

(() => {
  main();
})();

function main() {
  const app = express();
  const controller = new GithubController();

  app.use(express.json());
  app.use(GitHubSha256Middleware.verifySignature);

  app.post("/api/github", controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`App running on port ${envs.PORT}`);
  });
}
