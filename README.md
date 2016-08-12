# LASACTF-Web-Frontend
This repository contains the front end web code behind LASACTF, run March 2016.

## How it Works
LASACTF was built so that minimal server-side code was needed other than minor modifications to the PicoCTF Api.

All competition data is pulled dynamically by client-side Javascript with REST/Ajax queries (see `src/js` for some examples). Thus, the only server dependency is the LASACTF-Api repository.

## Building the Project
Simply git-clone, then run:
```
bower install
sudo npm install
gulp build
```

Static assets should be updated automatically by `gulp` on page refresh.
