sudo systemctl stop jekyll-drafts.service
sudo bundle exec jekyll build
git add .
MESSAGE="$1"
if [ $1 -eq 0 ]
  then
     MESSAGE="Automatic commit: new version"
fi
git commit -m "$MESSAGE"
git push origin master
cp -R _site ../macteo.it
sudo systemctl start jekyll-drafts.service
