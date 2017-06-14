bundle exec jekyll build
git add .
MESSAGE="$0"
if [ $# -eq 0 ]
  then
     MESSAGE="Automatic commit: new version"
fi
git commit -m "$MESSAGE"
git push origin master
cp -R _site ../macteo.it
