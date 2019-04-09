cd $HOME/Library/Mobile\ Documents/com\~apple\~CloudDocs/macteo.it/
bundle exec jekyll build
rsync -az --delete-after $HOME/Library/Mobile\ Documents/com\~apple\~CloudDocs/macteo.it/* ovh.macteo.it:~/web/macteo.it/