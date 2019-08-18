const { cd, exec, echo, touch } = require("shelljs");

echo("Deploying docs!!!");
cd("docs");
touch(".nojekyll");
exec("git init");
exec("git add .");
exec('git config user.name "Ian"');
exec('git config user.email "iwburns8@gmail.com"');
exec('git commit -m "docs(docs): update gh-pages"');
exec(
  `git push --force --quiet git@github.com:iwburns/tupperware.git master:gh-pages`
);
echo("Docs deployed!!");
