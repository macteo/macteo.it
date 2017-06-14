bundle exec jekyll build
git add .
git commit -m "Automatic commit: new version published"
git push origin master
cp -R _site ../macteo.it
